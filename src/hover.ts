import { colorConfigList } from './function/color';
import { colorValueReg } from './function/color/const';
import { ColorCssConfig } from './function/color/interface';
import { Hover, HoverProvider, MarkdownString, Position, ProviderResult, TextDocument } from 'vscode';
export default class implements HoverProvider {
  private getText(line: string): string {
    const colorValueList: string[] = line.match(colorValueReg) || [];
    if (!colorValueList.length) { return ''; };
    const hoverList = [...new Set(colorValueList)].map(colorValue => {
      const cssConfigList = colorConfigList
        .filter((config:ColorCssConfig) => config.value.toLowerCase() === colorValue.toLowerCase());
      const matchNames = cssConfigList.map((config:ColorCssConfig) => config.configName);
      return {colorValue, matchNames};
    });
      const str = hoverList
      .map(info => `${info.colorValue}: ${info.matchNames.length ? info.matchNames.join(' | ') : '暂没有找到匹配的颜色配置，请添加'}`)
      .join(`
* `);
      return str ? '* ' + str : str;
  }

  provideHover(doc: TextDocument, pos: Position): ProviderResult<Hover> {
    const line = doc.lineAt(pos.line).text.trim();
    
    const text = this.getText(line);
    return new Hover(new MarkdownString(text));
  }
}
