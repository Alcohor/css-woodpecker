import { CssConfigList, CssConfig } from './interface';
import { colorReg } from './config';
export class CssValueToNameProcess {
  cssConfigList;
  constructor(cssConfigList: CssConfigList) {
    this.cssConfigList = cssConfigList;
  }
  convert(text: string): CssConfigList {
    let result: CssConfigList = [];
    const colorMatch = text.match(colorReg);
    if (!colorMatch) {return [];}
    const colorText = colorMatch[0];
    const matchedNameList = this.cssConfigList
    .filter((config: CssConfig) => config.value.toString().toLowerCase().includes(colorText.toLowerCase()));
    if (matchedNameList.length) {
      result = matchedNameList;
    }
    return result;
  }
}
