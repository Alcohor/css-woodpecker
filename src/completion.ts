import { CompletionItem, CompletionItemKind, CompletionItemProvider, MarkdownString, Position, Range, TextDocument } from 'vscode';
import { CssValueToNameProcess } from './process';

export default class implements CompletionItemProvider {
  constructor(private lan: string, private process: CssValueToNameProcess) {}
  provideCompletionItems(document: TextDocument, position: Position): Thenable<CompletionItem[]> {
    return new Promise(resolve => {
      const lineText = document.getText(new Range(position.with(undefined, 0), position));
      const cssConfigList = this.process.convert(lineText);
      if (cssConfigList.length === 0) {
        return resolve([]);
      }
      return resolve(
        cssConfigList.map(config => {
          const item = new CompletionItem(config.valueToNameLabel, CompletionItemKind.Field);
          item.documentation = new MarkdownString(config.configName);
          item.insertText = config.configName;
          return item;
        }),
      );
    });
  }
}