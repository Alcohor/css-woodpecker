import { ColorCssConfig } from './function/color/interface';

export type CssConfig = ColorCssConfig | any;

export type CssConfigList = CssConfig[];

export type ConfigPath = string[] | string;

export type Enable = boolean;

export interface PluginConfig {
  color: {
    enable: Enable
    configPath: ConfigPath
  }
}
