import { Hover, HoverProvider, MarkdownString, Position, ProviderResult, TextDocument } from 'vscode';

export default class implements HoverProvider {
  private getText(line: string, pos: Position): string {
    return `test: line-${line}, pos-${JSON.stringify(pos)}`;
  }

  provideHover(doc: TextDocument, pos: Position): ProviderResult<Hover> {
    const line = doc.lineAt(pos.line).text.trim();
    
    const text = this.getText(line, pos);
    return new Hover(new MarkdownString(text));
  }
}
