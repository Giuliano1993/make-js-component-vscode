// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed


const detectFramework = ()=>{
		const packageJsonPath = vscode.workspace.rootPath + '/package.json';
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
		const dependencies = Object.keys(packageJson.dependencies);
		if(dependencies.includes('vue')){
			return 'Vue';
		}else if(dependencies.includes('react')){
			return 'React';
		}else if(dependencies.includes('astro')){
			return 'Astro';
		}else if(dependencies.includes('svelte')){
			return 'Svelte';
		}else{
			return '';
		
		}
}


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
		
		const framework = await vscode.window.showQuickPick(["Vue", "React", "Angular","Qwik","Astro","Svelte"], { placeHolder: 'Select framework' });
		const componentName = await vscode.window.showInputBox({ placeHolder: 'Enter component name' });
		let useTs = false;
		if(["React", "Angular","Svelte"].includes(framework||'')){
			useTs = await vscode.window.showQuickPick(["Yes", "No"],{placeHolder: "Use Typescript?"}) === "Yes";
		}
		let filename = '';
		let ext = '.js';
		switch (framework) {
			case 'Vue':
				let type = await vscode.window.showQuickPick(["Options API", "Composition API"], { placeHolder: 'Select type' });
				type = type?.split(' ')[0].toLocaleLowerCase();
				filename = `component-${type}.vue.stub`;
				ext = '.vue';
				break;
			case 'React':
				ext = useTs ? '.tsx' : '.jsx';
				filename = `function-component${ext}.stub`;
				break;
			case 'Astro':
				filename = 'component.astro.stub';
				ext = '.astro';
				break;
			case 'Svelte':
				const ts = useTs ? 'ts' : 'js';
				filename = `component-${ts}.svelte.stub`;
				ext = '.svelte';
				break;
			case 'Qwik':
				filename = 'hello-world-component.tsx.stub';
				ext = '.qwik.ts';
				break;
			case 'Angular':
				ext = useTs ? '.ts' : '.js';
				filename = `component.component${ext}.stub`;
				break;
			default:
				break;
		}
		const newComponentPath = vscode.workspace.rootPath + '/src/components/' + componentName + ext;
		fs.copyFileSync(__dirname + '/stubs/' + framework?.toLowerCase() + '/' + filename, newComponentPath);
		if(componentName){
			fs.writeFileSync(newComponentPath, fs.readFileSync(newComponentPath, 'utf8').replace(/ComponentName/g, componentName), 'utf8')
		}
		vscode.workspace.openTextDocument(newComponentPath).then(doc => vscode.window.showTextDocument(doc));
		vscode.window.showInformationMessage(`Component ${componentName} created!`);
	});



	let quickCommand = vscode.commands.registerCommand('make-js-component-vscode.make-js-component-quick', async () => {	
		let filename = '';
		let ext = '.js';
		let framework = detectFramework();
		let useTs = false;
		if(["React", "Angular","Svelte"].includes(framework||'')){
			useTs = await vscode.window.showQuickPick(["Yes", "No"],{placeHolder: "Use Typescript?"}) === "Yes";
		}
		switch (framework) {
			case 'Vue':
				let type = await vscode.window.showQuickPick(["Options API", "Composition API"], { placeHolder: 'Select type' });
				type = type?.split(' ')[0].toLocaleLowerCase();
				filename = `component-${type}.vue.stub`;
				ext = '.vue';
				break;
			case 'React':
				ext = useTs ? '.tsx' : '.jsx';
				filename = `function-component${ext}.stub`;
				break;
			case 'Astro':
				filename = 'component.astro.stub';
				ext = '.astro';
				break;
			case 'Svelte':
				const ts = useTs ? 'ts' : 'js';
				filename = `component-${ts}.svelte.stub`;
				ext = '.svelte';
				break;
			case 'Qwik':
				filename = 'hello-world-component.tsx.stub';
				ext = '.qwik.ts';
				break;
			case 'Angular':
				ext = useTs ? '.ts' : '.js';
				filename = `component.component${ext}.stub`;
				break;
			default:
				break;
		}
		const componentName = await vscode.window.showInputBox({ placeHolder: 'Enter component name' });
		const newComponentPath = vscode.workspace.rootPath + '/src/components/' + componentName + ext;
		fs.copyFileSync(__dirname + '/stubs/' + framework?.toLowerCase() + '/' + filename, newComponentPath);
		
		if(componentName){
			fs.writeFileSync(newComponentPath, fs.readFileSync(newComponentPath, 'utf8').replace(/ComponentName/g, componentName), 'utf8')
		}
		vscode.workspace.openTextDocument(newComponentPath).then(doc => vscode.window.showTextDocument(doc));
		vscode.window.showInformationMessage(`Component ${componentName} created!`);

			
	})



	let componentFromSelectionCommand = vscode.commands.registerCommand('make-js-component-vscode.make-js-component-from-selection', async () => {	
		let filename = '';
		let ext = '.js';
		let framework = detectFramework();
		let useTs = false;
		if(["React", "Angular","Svelte"].includes(framework||'')){
			useTs = await vscode.window.showQuickPick(["Yes", "No"],{placeHolder: "Use Typescript?"}) === "Yes";
		}
		switch (framework) {
			case 'Vue':
				let type = await vscode.window.showQuickPick(["Options API", "Composition API"], { placeHolder: 'Select type' });
				type = type?.split(' ')[0].toLocaleLowerCase();
				filename = `component-${type}.vue.stub`;
				ext = '.vue';
				break;
			case 'React':
				ext = useTs ? '.tsx' : '.jsx';
				filename = `function-component${ext}.stub`;
				break;
			case 'Astro':
				filename = 'component.astro.stub';
				ext = '.astro';
				break;
			case 'Svelte':
				const ts = useTs ? 'ts' : 'js';
				filename = `component-${ts}.svelte.stub`;
				ext = '.svelte';
				break;
			case 'Qwik':
				filename = 'hello-world-component.tsx.stub';
				ext = '.qwik.ts';
				break;
			case 'Angular':
				ext = useTs ? '.ts' : '.js';
				filename = `component.component${ext}.stub`;
				break;
			default:
				break;
		}
		const componentName = await vscode.window.showInputBox({ placeHolder: 'Enter component name' });
		const newComponentPath = vscode.workspace.rootPath + '/src/components/' + componentName + ext;
		fs.copyFileSync(__dirname + '/stubs/' + framework?.toLowerCase() + '/' + filename, newComponentPath);
		const editor = vscode.window.activeTextEditor;
		const selection = editor?.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
			const highlighted = editor.document.getText(selectionRange);
			if(componentName){
				fs.writeFileSync(newComponentPath, fs.readFileSync(newComponentPath, 'utf8').replace(/Hello ComponentName/g, highlighted), 'utf8')
			}
		}
		vscode.workspace.openTextDocument(newComponentPath).then(doc => vscode.window.showTextDocument(doc));
		vscode.window.showInformationMessage(`Component ${componentName} created!`);

			
	})

	context.subscriptions.push(disposable, quickCommand,componentFromSelectionCommand);
}




// This method is called when your extension is deactivated
export function deactivate() {}
