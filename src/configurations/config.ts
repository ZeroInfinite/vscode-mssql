/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';
const fs = require('fs');
import * as path from 'path';
import * as Constants from '../constants/constants';
import {IConfig} from '../languageservice/interfaces';

/*
* Config class handles getting values from config.json.
*/
export default class Config implements IConfig {
     private static _configJsonContent = undefined;

     public static get configJsonContent(): any {
        if (this._configJsonContent === undefined) {
            this._configJsonContent = this.loadConfig();
        }
        return this._configJsonContent;
    }

    public getSqlToolsServiceDownloadUrl(): string {
        return this.getSqlToolsConfigValue(Constants.sqlToolsServiceDownloadUrlConfigKey);
    }

    public getSqlToolsInstallDirectory(): string {
        return this.getSqlToolsConfigValue(Constants.sqlToolsServiceInstallDirConfigKey);
    }

    public getSqlToolsExecutableFiles(): string[] {
        return this.getSqlToolsConfigValue(Constants.sqlToolsServiceExecutableFilesConfigKey);
    }

    public getSqlToolsPackageVersion(): string {
        return this.getSqlToolsConfigValue(Constants.sqlToolsServiceVersionConfigKey);
    }

    public getSqlToolsConfigValue(configKey: string): any {
        let json = Config.configJsonContent;
        let toolsConfig = json[Constants.sqlToolsServiceConfigKey];
        let configValue: string = undefined;
        if (toolsConfig !== undefined) {
            configValue = toolsConfig[configKey];
        }
        return configValue;
    }

    public getExtensionConfig(key: string, defaultValue?: any): any {
       let json = Config.configJsonContent;
       let extensionConfig = json[Constants.extensionConfigSectionName];
       let configValue = extensionConfig[key];
       if (!configValue) {
           configValue = defaultValue;
       }
       return configValue;
    }

    public getWorkspaceConfig(key: string, defaultValue?: any): any {
       let json = Config.configJsonContent;
       let configValue = json[key];
       if (!configValue) {
           configValue = defaultValue;
       }
       return configValue;
    }

    static loadConfig(): any {
        let configContent = fs.readFileSync(path.join(__dirname, '../config.json'));
        return JSON.parse(configContent);
    }
}






