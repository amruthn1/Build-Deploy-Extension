var e=require("vscode"),{exec:a}=require("child_process");function u(d){let n,_=e.window.createOutputChannel("WPILib Build+Deploy"),p=e.commands.registerCommand("wpilib-build-deploy-command.Build+Deploy",async function(){_.show(),_.clear(),_.appendLine(" ____      ____  _______  _____  _____      _   __         ______             _   __        __        ______                   __                   \r\n|_  _|    |_  _||_   __ \\|_   _||_   _|    (_) [  |       |_   _ \\           (_) [  |      |  ]  .-. |_   _ `.                [  |                  \r\n  \\ \\  /\\  / /    | |__) | | |    | |      __   | |.--.     | |_) | __   _   __   | |  .--.| | __| |__ | | `. \\ .---.  _ .--.  | |  .--.   _   __   \r\n   \\ \\/  \\/ /     |  ___/  | |    | |   _ [  |  | '/'`\\ \\   |  __'.[  | | | [  |  | |/ /'`\\' ||__   __|| |  | |/ /__\\\\[ '/'`\\ \\| |/ .'`\\ \\[ \\ [  ]  \r\n    \\  /\\  /     _| |_    _| |_  _| |__/ | | |  |  \\__/ |  _| |__) || \\_/ |, | |  | || \\__/  |   | |  _| |_.' /| \\__., | \\__/ || || \\__. | \\ '/ /   \r\n     \\/  \\/     |_____|  |_____||________|[___][__;.__.'  |_______/ '.__.'_/[___][___]'.__.;__]  '-' |______.'  '.__.' | ;.__/[___]'.__.'[\\_:  /    \r\n                                                                                                                      [__|                \\__.'     "),_.appendLine("Made by Team 2554"),n=!0,await l()});d.subscriptions.push(p);async function l(){a("cd "+e.workspace.workspaceFolders[0].uri.fsPath+"&& gradlew build",(s,r,i)=>{e.window.showInformationMessage("WPILib Build+Deploy: Building..."),_.appendLine("||   BUILDING   ||"),s&&(e.window.showErrorMessage("WPILib Build+Deploy: Error while building. Check output for detailed logs"),_.appendLine("||   ERROR   ||"),_.show(),_.appendLine(`${i}`),n=!1),_.show(),_.appendLine(`${r}`),_.appendLine(`${i}`),n&&(e.window.showInformationMessage("WPILib Build+Deploy: Deploying..."),_.appendLine("||   DEPLOYING   ||"),a("cd "+e.workspace.workspaceFolders[0].uri.fsPath+"&& gradlew deploy",(t,w,o)=>{t&&(e.window.showErrorMessage("WPILib Build+Deploy: Error while deploying. Check output for detailed logs"),_.appendLine("||   ERROR   ||"),_.show(),_.appendLine(`${o}`),n=!1),_.show(),_.appendLine(`${w}`),_.appendLine(`${o}`)}))})}}function c(){e.window.showInformationMessage("WPILib Build+Deploy: Stopping....")}module.exports={activate:u,deactivate:c};