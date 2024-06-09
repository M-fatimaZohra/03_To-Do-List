#!/usr/bin/env node
import inquirer from "inquirer";
let toDos = [];
let condition = true;
while (condition) {
    let answer = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "•What Would you like to add in to-dos?"
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
        let q2 = await inquirer.prompt([{
                name: "next",
                message: "do You want to do any changes?",
                type: "confirm",
                default: "true"
            }
        ]);
        let condition2 = true;
        condition2 = q2.next;
        if (condition2) {
            while (condition2) {
                let q3 = await inquirer.prompt([
                    {
                        name: "choose",
                        message: "What kind of changes?",
                        type: "list",
                        choices: ["Add", "Remove", "Update"]
                    }
                ]);
                if (q3.choose === "Add") {
                    let addAnswer = await inquirer.prompt([
                        {
                            name: "todoad",
                            type: "input",
                            message: "•What would you like to add to your to-dos?"
                        }
                    ]);
                    toDos.push(addAnswer.todoad);
                }
                else if (q3.choose === "Remove") {
                    let removeAnswer = await inquirer.prompt([
                        {
                            name: "todore",
                            type: "list",
                            message: "Select the task you want to remove:",
                            choices: toDos
                        }
                    ]);
                    toDos = toDos.filter(todore => todore !== removeAnswer.todore);
                }
                else if (q3.choose === "Update") {
                    let updateAnswer = await inquirer.prompt([
                        {
                            name: "todoup",
                            type: "list",
                            message: "Select the task you want to update:",
                            choices: toDos
                        }
                    ]);
                    let newTask = await inquirer.prompt([
                        {
                            name: "newTodo",
                            type: "input",
                            message: "Enter the new task:"
                        }
                    ]);
                    toDos[toDos.indexOf(updateAnswer.todoup)] = newTask.newTodo;
                }
                else {
                    console.log(`ERR`);
                }
                console.log(`📜 UPDATED TO-DO LIST:`);
                toDos.forEach((work) => {
                    console.log(`•) ${work}`);
                });
                let moreChanges = await inquirer.prompt([
                    {
                        name: "next",
                        message: "Do you want to make more changes?",
                        type: "confirm",
                        default: true
                    }
                ]);
                condition2 = moreChanges.next;
                if (condition == false) {
                    console.log(`📜 UPDATED TO-DO LIST:`);
                    toDos.forEach((work) => {
                        console.log(`•) ${work}`);
                    });
                }
            }
        }
        else {
            console.log(`📜TODAY TODO LIST:`);
            for (let work of toDos) {
                console.log(`•) ${work}`);
            }
        }
    }
}
