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

function getValueToNameLabel(from: string, to: string): string {
  return `${from?.toUpperCase()} to ${to}`;
};

/**解析从项目中读取到的cssColorConfig文件的字符串，输出键值对 */ 
function analyzeColorConfigFormColorConfigString(colorConfigString: string):ColorCssConfig[]  {
  const colorConfigs = colorConfigString.match(colorConfigReg) || [];
  const originColorConfigList = colorConfigs.map((item: string ) => {
    item.match(colorConfigReg);
    return {
      type: 'color',
      value: RegExp.$2,
      configName: RegExp.$1,
      valueToNameLabel: getValueToNameLabel(RegExp.$2, RegExp.$1),
      nameToValueLabel: `${RegExp.$1} -> ${(RegExp.$2).toUpperCase()}`,
      completionItemKindType: CompletionItemKind.Color,
    };
  });
  originColorConfigList.forEach(config => {
    const colorNumberVal = config.value.slice(1);
    // 色彩值是否被缩写
    const isColorValueAbbreviated = colorNumberVal.length === 3;
    if (isColorValueAbbreviated) {
      const fullColorValue = colorNumberVal.replace(/\w/g, val => val + val);
      const value = `#${fullColorValue}`;
      originColorConfigList.push({
        ...config, 
        value,
        valueToNameLabel: getValueToNameLabel(value, config.configName),
      });
    };
  });
  return originColorConfigList;
};

export function initColorConfig(): void {
  const { enable, configPath } = pluginConfig?.color || {};
  if (!enable) {
    colorConfigList = [];
  } else {
    const colorConfigString = getCssColorConfigString(configPath);
    colorConfigList = analyzeColorConfigFormColorConfigString(colorConfigString);    
  }
};