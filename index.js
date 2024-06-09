#!/usr/bin/env ts-node
import inquirer from "inquirer";
let toDos = [];
let condition = true;
while (condition) {
    let answer = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "•What Would you like to add in todos?"
        }
    ]);
    toDos.push(answer.todo);
    let nextStep = await inquirer.prompt([
        {
            name: "more",
            type: "confirm",
            message: "•would you like to add more toDos?",
            default: "true"
        }
    ]);
    condition = nextStep.more;
    if (condition) {
        console.log(toDos);
    }
    else {
        console.log(`📜TODAY TODO LIST:`);
        for (let work of toDos) {
            console.log(`•) ${work}`);
        }
    }
}
