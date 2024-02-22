// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

class FramkeWorkItem implements vscode.QuickPickItem {
	label: string;
	description?: string | undefined;
	picked?: boolean | undefined;
	alwaysShow?: boolean | undefined;
	detail?: string | undefined;
	kind?: vscode.QuickPickItemKind | undefined;

	constructor(label: string, description?: string | undefined, picked?: boolean | undefined, alwaysShow?: boolean | undefined, detail?: string | undefined, kind?: vscode.QuickPickItemKind | undefined) {
		this.label = label;
		this.description = description;
		this.picked = picked;
		this.alwaysShow = alwaysShow;
		this.detail = detail;
		this.kind = kind;
	}
}

const availableFrameworks:  FramkeWorkItem[] = [
	new FramkeWorkItem('Vue', 'Vue.js'),
	new FramkeWorkItem('React', 'React.js'),
	new FramkeWorkItem('Angular', 'Angular.js'),
];


export  function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "make-js-component-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('make-js-component-vscode.make-js-component', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		
		const framework = await vscode.window.showQuickPick(["Vue", "React", "Astro"]);
		const componentName = await vscode.window.showInputBox({ placeHolder: 'Enter component name' });
		let filename = '';
		let ext = '.js';
		switch (framework) {
			case 'Vue':
				filename = 'component-options.vue.stub';
				ext = '.vue';
				break;
			case 'React':
				filename = 'function-component.tsx.stub';
				ext = '.tsx';
				break;
			case 'Astro':
				filename = 'component.astro.stub';
				ext = '.astro';
				break;
			default:
				break;
		}

		fs.copyFileSync(__dirname + '/stubs/' + framework?.toLowerCase() + '/' + filename, vscode.workspace.rootPath + '/components/' + componentName + ext);
		vscode.window.showInformationMessage(`Make a ${framework} component named: ${componentName}!`);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
