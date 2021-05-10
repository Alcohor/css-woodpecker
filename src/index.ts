import * as vscode from 'vscode';
import { SUPPORT_LANGUAGES } from './const';
import HoverProvider from './hover';

export function activate(context: vscode.ExtensionContext) {
	const hoverProvider = new HoverProvider();
	context.subscriptions.push(vscode.languages.registerHoverProvider(SUPPORT_LANGUAGES, hoverProvider));
}

export function deactivate() {}
