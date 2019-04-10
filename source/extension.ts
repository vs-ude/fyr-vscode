'use strict'

import { window, workspace, ExtensionContext, Uri } from 'vscode'
import { LanguageClient, LanguageClientOptions, StreamInfo } from 'vscode-languageclient'
import { spawn, ChildProcess } from 'child_process'
import * as net from 'net'
import * as url from 'url'
import { checkPath, cleanPath } from './configValidation'
import { FyrClientConfiguration } from './config'
import { sep } from 'path'


export async function activate(context: ExtensionContext): Promise<void> {

    const conf: FyrClientConfiguration = new FyrClientConfiguration(workspace.getConfiguration('fyr'))

    if (!conf.enableIDE || !checkPath(conf.langserverPath)) {
        return
    }

    function runargs(port: number): string[] {
        if (conf.developmentMode) {
            return [
                'inspect',
                cleanPath(conf.langserverPath) + 'lib' + sep + 'server.js',
                '--socket=' + port,
                '--nolazy'
            ]
        } else {
            return [
                cleanPath(conf.langserverPath) + 'bin' + sep + 'fyr-language-server',
                '--socket=' + port,
            ]
        }
    }

    const serverOptions = () => new Promise<ChildProcess | StreamInfo>((resolve, reject) => {
        // Use a TCP socket because of problems with blocking STDIO
        const server: net.Server = net.createServer(socket => {
            console.log('Fyr langserver process connected')
            socket.on('end', () => {
                console.log('Fyr langserver process disconnected')
            })
            server.close()
            resolve({ reader: socket, writer: socket })
        })
        // Listen on random port
        server.listen(0, '127.0.0.1', () => {
            const address: any = server.address()
            if (!('port' in address)) {
                throw Error("Unable to resolve the port of the language server.")
            }
            const childProcess = spawn("node", runargs(address.port))
            childProcess.stderr.on('data', (chunk: Buffer) => {
                console.error(chunk + '')
            })
            childProcess.stdout.on('data', (chunk: Buffer) => {
                console.log(chunk + '')
            })
            return childProcess
        })
    })

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        // Register the server for fyr documents
        documentSelector: [
            { scheme: 'file', language: 'fyr' },
            { scheme: 'untitled', language: 'fyr' }
        ],
        uriConverters: {
            // VS Code by default %-encodes even the colon after the drive letter
            // NodeJS handles it much better
            code2Protocol: uri => url.format(url.parse(uri.toString(true))),
            protocol2Code: str => Uri.parse(str)
        },
        synchronize: {
            // Synchronize the setting section 'fyr-linter' to the server
            configurationSection: 'fyr',
            // Notify the server about changes to Fyr files in the workspace
            fileEvents: workspace.createFileSystemWatcher('**/*.fyr')
        }
    }

    // Create the language client and start the client.
    const disposable = new LanguageClient(
        'fyrLanguageServerClient',
        'Fyr Language Server Client',
        serverOptions,
        clientOptions
        )
        .start()

        // Push the disposable to the context's subscriptions so that the
        // client can be deactivated on extension deactivation
        context.subscriptions.push(disposable)
    }
