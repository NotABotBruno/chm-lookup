// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
import { exec } from 'child_process'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const searchCHM = vscode.commands.registerCommand('chm.searchText', () => {
		const editor = vscode.window.activeTextEditor;

		if(editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);

			if(selectedText){
				const config = vscode.workspace.getConfiguration('chmFunctionFinder');
				const chmFilePath = config.get('chmFilePath');
				
				if(chmFilePath){
					const subcomand = `Start-Process "hh.exe" -ArgumentList "mk:@MSITStore:'${chmFilePath}'::/'${selectedText}'.html"`
					const command = `powershell -Command "'${subcomand}'"`;
	
					exec(command, (error, stdout, stderr) => {
						if (error) {
							vscode.window.showErrorMessage(`Error: ${error.message}`);
							return;
						}
						if (stderr) {
							vscode.window.showErrorMessage(`Error: ${stderr}`);
							return;
						}
						vscode.window.showInformationMessage(`Search Results:\n${stdout}`);
					});
				} else {
					vscode.window.showInformationMessage('CHM file path is not set. Please configure it in the settings.');
				}
			}			
		}
	})

	context.subscriptions.push(searchCHM);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
