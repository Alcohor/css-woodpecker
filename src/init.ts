
import { workspace } from 'vscode';
import { PLUGIN_CONFIG_PATH } from './config'; 
import { PluginConfig, CssConfigList } from './interface';
import { readFileSyncByRelativePath, jsonParse } from './util';
import { initColorConfig, colorConfigList } from '../src/function/color';

export let pluginConfig: PluginConfig;

function loadCssConfig(): CssConfigList {
  if (workspace?.workspaceFolders?.length === 0) {
    return [];
  }
  pluginConfig = jsonParse(readFileSyncByRelativePath(PLUGIN_CONFIG_PATH));
  console.log(pluginConfig);
  initColorConfig();

  return [
    ...colorConfigList
  ];
}

export function init(): CssConfigList {
  return loadCssConfig();
}
