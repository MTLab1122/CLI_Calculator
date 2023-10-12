#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import gradient from "gradient-string";
import showBanner from "node-banner";
const history = [];
async function displayBanner() {
    await showBanner('CLI  based  Calculator!', 'TypeScript simple Command line Calculator!', 'green', 'yellow');
}
async function displayResultAndAskToContinue(history) {
    let answers = await inquirer.prompt([
        {
            name: "num1",
            type: "number",
            message: gradient('cyan', 'pink')("\nEnter First Number:"),
        },
        {
            name: "num2",
            type: "number",
            message: gradient('pink', 'cyan')("\nEnter Second Number:"),
        },
        {
            name: "operation",
            type: "list",
            choices: ["+", "-", "*", "/", "%"],
        },
    ]);
    let result;
    let operationSymbol = answers.operation;
    if (!isNaN(answers.num1) && !isNaN(answers.num2)) {
        switch (operationSymbol) {
            case "+":
                result = answers.num1 + answers.num2;
                break;
            case "-":
                result = answers.num1 - answers.num2;
                break;
            case "*":
                result = answers.num1 * answers.num2;
                break;
            case "/":
                result = answers.num1 / answers.num2;
                break;
            case "%":
                result = (answers.num1 * answers.num2) / 100;
                break;
            default:
                result = "Invalid Operation";
        }
        const historyEntry = `${answers.num1} ${operationSymbol} ${answers.num2} = ${result}`;
        history.push(historyEntry);
        console.log(chalk.bgWhiteBright `The Result of: ${history}`);
        let continueAnswer = await inquirer.prompt({
            name: "continue",
            type: "list",
            message: gradient.rainbow("Do you want to continue?"),
            choices: ["Yes", "No"],
        });
        if (continueAnswer.continue === "Yes") {
            displayResultAndAskToContinue(history);
        }
        else if (continueAnswer.continue === "No") {
            console.log(chalk.bgMagenta('Terminating the Calculator.'));
        }
    }
    else {
        console.log(chalk.bgRed('Invalid input. Please enter valid numbers.'));
        displayResultAndAskToContinue(history);
    }
}
setTimeout(async () => {
    await displayBanner();
    displayResultAndAskToContinue(history);
}, 100);
