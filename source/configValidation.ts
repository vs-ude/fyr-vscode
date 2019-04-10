'use strict'

import { window, commands } from 'vscode'
import { accessSync, constants } from 'fs'
import { sep } from 'path'

export function checkPath(path: string): string | boolean {
    if (path === "") {
        window.showErrorMessage("'fyr.path' must be set in your configuration to use the language server.")
        return false
    }
    path = cleanPath(path)
    try {
        accessSync(path + "bin" + sep +"fyr-language-server", constants.F_OK | constants.X_OK)
    } catch (err) {
        window.showErrorMessage(
            "Please make sure that 'fyr.langserverPath' in your configuration points to the directory of the language server.",
            "Open settings"
            ).then((selected: string) => {
                if (selected === 'Open settings') {
                    commands.executeCommand('workbench.action.openGlobalSettings')
                }
            })
            return false
        }
        return true
    }

    export function cleanPath(path: string): string {
        if (path.slice(-1) != sep) {
            path = path + sep
        }
        return path
    }
