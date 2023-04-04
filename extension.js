const vscode = require('vscode');

const { exec } = require('child_process');

function activate(context) {
	let shouldContinue;
	let channel = vscode.window.createOutputChannel("WPILib Build+Deploy")
	let command = vscode.commands.registerCommand('wpilib-build-deploy-command.Build+Deploy', async function () {
		channel.show()
		channel.clear()
		channel.appendLine(" ____      ____  _______  _____  _____      _   __         ______             _   __        __        ______                   __                   \r\n|_  _|    |_  _||_   __ \\|_   _||_   _|    (_) [  |       |_   _ \\           (_) [  |      |  ]  .-. |_   _ `.                [  |                  \r\n  \\ \\  \/\\  \/ \/    | |__) | | |    | |      __   | |.--.     | |_) | __   _   __   | |  .--.| | __| |__ | | `. \\ .---.  _ .--.  | |  .--.   _   __   \r\n   \\ \\\/  \\\/ \/     |  ___\/  | |    | |   _ [  |  | \'\/\'`\\ \\   |  __\'.[  | | | [  |  | |\/ \/\'`\\\' ||__   __|| |  | |\/ \/__\\\\[ \'\/\'`\\ \\| |\/ .\'`\\ \\[ \\ [  ]  \r\n    \\  \/\\  \/     _| |_    _| |_  _| |__\/ | | |  |  \\__\/ |  _| |__) || \\_\/ |, | |  | || \\__\/  |   | |  _| |_.\' \/| \\__., | \\__\/ || || \\__. | \\ \'\/ \/   \r\n     \\\/  \\\/     |_____|  |_____||________|[___][__;.__.\'  |_______\/ \'.__.\'_\/[___][___]\'.__.;__]  \'-\' |______.\'  \'.__.\' | ;.__\/[___]\'.__.\'[\\_:  \/    \r\n                                                                                                                      [__|                \\__.\'     ")
		channel.appendLine("Made by Team 2554")
		shouldContinue = true;
		await build()
	});
	context.subscriptions.push(command);

	async function build() {
		exec('cd ' + vscode.workspace.workspaceFolders[0].uri.fsPath + '&& gradlew build', (err, stdout, stderr) => {
			vscode.window.showInformationMessage("WPILib Build+Deploy: Building...")
			channel.appendLine("||   BUILDING   ||")
			if (err) {
				vscode.window.showErrorMessage("WPILib Build+Deploy: Error while building. Check output for detailed logs")
				channel.appendLine("||   ERROR   ||")
				channel.show()
				channel.appendLine(`${stderr}`)
				shouldContinue = false
			}
			channel.show()
			channel.appendLine(`${stdout}`)
			channel.appendLine(`${stderr}`)
			if (shouldContinue) {
				vscode.window.showInformationMessage("WPILib Build+Deploy: Deploying...")
				channel.appendLine("||   DEPLOYING   ||")
				exec('cd ' + vscode.workspace.workspaceFolders[0].uri.fsPath + '&& gradlew deploy', (err, stdout, stderr) => {
					if (err) {
						vscode.window.showErrorMessage("WPILib Build+Deploy: Error while deploying. Check output for detailed logs")
						channel.appendLine("||   ERROR   ||")
						channel.show()
						channel.appendLine(`${stderr}`)
						shouldContinue = false
					}
					channel.show()
					channel.appendLine(`${stdout}`)
					channel.appendLine(`${stderr}`)
				})
			}
		})
	}

}

function deactivate() {
	vscode.window.showInformationMessage('WPILib Build+Deploy: Stopping....')
}

module.exports = {
	activate,
	deactivate
}
