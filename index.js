#! /usr/bin/env node
import inquirer from "inquirer";
let bankBalance = 500000;
function welcome() {
    console.log("***********************\n");
    console.log("Welcome to atm\n");
    console.log("***********************\n");
}
let signup = async () => {
    await welcome();
    console.log("Please create your account");
    let user = await inquirer.prompt([
        {
            name: "userName",
            type: "input",
            message: "User Name: "
        },
        {
            name: "userPassword",
            type: "password",
            message: "Password: ",
            mask: "*"
        }
    ]);
    console.clear();
    welcome();
    async function login(userName, userPassword) {
        let meanWhile = false;
        do {
            console.log("Please login to your account");
            let enteredUser = await inquirer.prompt([
                {
                    name: "enteredName",
                    type: "input",
                    message: "User Name: "
                },
                {
                    name: "enteredPassword",
                    type: "password",
                    message: "Password: ",
                    mask: "*"
                }
            ]);
            console.clear();
            if (userName == enteredUser.enteredName && userPassword == enteredUser.enteredPassword) {
                do {
                    console.log("*******************************\n");
                    console.log(`Welcome ${userName} to our ATM`);
                    console.log("You are Loged-In\n");
                    console.log("*******************************\n");
                    meanWhile = false;
                    console.log("What you want to do");
                    let options = await inquirer.prompt([
                        {
                            name: "bank_option",
                            type: "list",
                            choices: ["Cash Withdraw", "Money Transfer", "Check Balance", "Cash Deposit"]
                        }
                    ]);
                    if (options.bank_option == "Cash Withdraw") {
                        let fmeanwhile = false;
                        do {
                            let userWithdraw = await inquirer.prompt([
                                {
                                    name: "cash_withdraw",
                                    type: "number",
                                    message: "Please enter amount: "
                                }
                            ]);
                            if (userWithdraw.cash_withdraw < bankBalance) {
                                console.log(`\nYou have successfully withdraw: ${userWithdraw.cash_withdraw}\n`);
                                bankBalance = bankBalance - userWithdraw.cash_withdraw;
                                console.log(`Your remaining balance is: ${bankBalance}\n`);
                                fmeanwhile = false;
                                await _continue();
                            }
                            else {
                                console.log("Please enter the correct amount\n");
                                fmeanwhile = true;
                            }
                        } while (fmeanwhile);
                    }
                    else if (options.bank_option == "Money Transfer") {
                        let swhile = false;
                        do {
                            let userTransfer = await inquirer.prompt([
                                {
                                    name: "selectPerson",
                                    type: "list",
                                    choices: ["Khalid", "Zia Khan", "Adil"],
                                    message: "Select a person"
                                },
                                {
                                    name: "cash_transfer",
                                    type: "number",
                                    message: "Please enter amount: "
                                }
                            ]);
                            if (userTransfer.cash_transfer < bankBalance) {
                                console.log(`\nYou have successfully Transfer: ${userTransfer.cash_transfer}\n`);
                                bankBalance = bankBalance - userTransfer.cash_transfer;
                                console.log(`Your remaining balance is: ${bankBalance}\n`);
                                swhile = false;
                                await _continue();
                            }
                            else {
                                console.log("Please enter the correct amount\n");
                                swhile = true;
                            }
                        } while (swhile);
                    }
                    else if (options.bank_option == "Check Balance") {
                        console.log(`\nYour Bank Balance is: ${bankBalance}`);
                        await _continue();
                    }
                    else if (options.bank_option == "Cash Deposit") {
                        let user_deposit = await inquirer.prompt([
                            {
                                name: "cash_deposit",
                                type: "number",
                                message: "How much cash you want deposit: "
                            }
                        ]);
                        bankBalance = user_deposit.cash_deposit + bankBalance;
                        console.log(`\nYour have successfully deposited: ${user_deposit.cash_deposit}\n`);
                        console.log(`Your remaining balance is: ${bankBalance}`);
                        await _continue();
                    }
                } while (continueAgain);
            }
            else if (userName !== enteredUser.enteredName && userPassword !== enteredUser.enteredPassword) {
                console.log("Your entered wrong user-name and password\n");
                console.log("Please try again");
                meanWhile = true;
            }
            else if (userName !== enteredUser.enteredName && userPassword == enteredUser.enteredPassword) {
                console.log("Your entered wrong user-name\n");
                console.log("Please try again");
                meanWhile = true;
            }
            else if (userName == enteredUser.enteredName && userPassword !== enteredUser.enteredPassword) {
                console.log("Your entered wrong password\n");
                console.log("Please try again");
                meanWhile = true;
            }
            else {
                console.log("Please enter correct user name and password\n");
                meanWhile = true;
            }
        } while (meanWhile);
    }
    await login(user.userName, user.userPassword);
};
let continueAgain = false;
async function _continue() {
    let again = await inquirer.prompt([
        {
            name: "continue",
            type: "confirm",
            message: "Do you want to continue?"
        }
    ]);
    if (again.continue == true) {
        continueAgain = true;
    }
    else {
        continueAgain = false;
        console.log("Thank You!");
    }
    console.clear();
}
signup();
