import { colorConfigReg } from './const';
import { pluginConfig } from '../../init';
import { ColorCssConfig } from './interface';
import { ConfigPath } from '../../interface';
import { readFileSyncByRelativePath } from '../../util';
import { CompletionItemKind } from 'vscode';

export let colorConfigList: ColorCssConfig[];

/**读取CSS文件的变量配置 */ 
function getCssColorConfigString(configPath: ConfigPath ): string {
  const isArrayPath = Array.isArray(configPath);
  let configString: string = '';
  if (isArrayPath) {
    (configPath as []).forEach((path: string) => {
      configString = configString + readFileSyncByRelativePath(path);
    });
  } else {
    configString = readFileSyncByRelativePath(configPath as string);
  }
  return configString;
};

/**解析从项目中读取到的cssColorConfig文件的字符串，输出键值对 */ 
function analyzeColorConfigFormColorConfigString(colorConfigString: string):ColorCssConfig[]  {
  const colorConfigs = colorConfigString.match(colorConfigReg) || [];
  return colorConfigs.map((item: string ) => {
    item.match(colorConfigReg);
    return {
        type: 'color',
        value: RegExp.$2,
        configName: RegExp.$1,
        valueToNameLabel: (`${(RegExp.$2).toUpperCase()} -> ${RegExp.$1}`),
        nameToValueLabel: `${RegExp.$1} -> ${(RegExp.$2).toUpperCase()}`,
        completionItemKindType: CompletionItemKind.Color,
    };
  });
};

export function initColorConfig(): void {
  const { enable, configPath } = pluginConfig?.color || {};
  console.log(pluginConfig?.color, 8);
  if (!enable) {
    colorConfigList = [];
  } else {
    const colorConfigString = getCssColorConfigString(configPath);
    console.log(colorConfigString, 9);
    colorConfigList = analyzeColorConfigFormColorConfigString(colorConfigString);    
  }
};