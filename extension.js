// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "chm-lookup" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('chm-lookup.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from CHM lookup!');
	});

	const searchCHM = vscode.commands.registerCommand('chm.searchText', () => {
		const editor = vscode.window.activeTextEditor;

		if(editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);

			const config = vscode.workspace.getConfiguration('chmFunctionFinder');
			const chmFilePath = config.get('chmFilePath');

			if (selectedText) {
                vscode.window.showInformationMessage(`Searching CHM for: ${selectedText} in ${chmFilePath}`);
                // Implement your logic to search the selected text in the CHM file
            } else {
                vscode.window.showInformationMessage('No text selected.');
            }
		}
	})
	context.subscriptions.push(disposable);
	context.subscriptions.push(searchCHM);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
