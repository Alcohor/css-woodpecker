import * as vscode from 'vscode';
import { SUPPORT_LANGUAGES_DEFAULT } from './config';
import HoverProvider from './hover';
import CssWoodPeckerProvider from './completion';
import { init } from './init';
import { CssValueToNameProcess } from './process';

export function activate(context: vscode.ExtensionContext) {
	const hoverProvider = new HoverProvider();
	context.subscriptions.push(vscode.languages.registerHoverProvider(SUPPORT_LANGUAGES_DEFAULT, hoverProvider));

	const cssConfigList = init();

	const cssValueToNameProcess = new CssValueToNameProcess(cssConfigList);

	for (const lan of SUPPORT_LANGUAGES_DEFAULT) {
    const providerDisposable = vscode.languages.registerCompletionItemProvider(lan, new CssWoodPeckerProvider(lan, cssValueToNameProcess));
    context.subscriptions.push(providerDisposable);
  }
}

export function deactivate() {}
