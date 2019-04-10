'use strict'

import { WorkspaceConfiguration } from 'vscode'

export class FyrClientConfiguration {
    public enableIDE: boolean = null
    public langserverPath: string = null
    public keepClosedFileErrors: boolean = null
    public developmentMode: boolean = null

    constructor(conf: WorkspaceConfiguration) {
        this.enableIDE = conf.get<boolean>('enableIDE')
        this.langserverPath = conf.get<string>('langserverPath')
        this.keepClosedFileErrors = conf.get<boolean>('keepClosedFileErrors')
        this.developmentMode = process.env['DEBUG'] === 'TRUE' ? true : false
    }
}
