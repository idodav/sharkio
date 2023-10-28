import inquirer from "inquirer";
import { loadLoginFromFile, saveLoginToFile } from "./utils.js";
import fs from "fs";
import os from "os";
import path from "path";
import ServerAxios from "./serverAxios.js";
import chalk from "chalk";

async function login({ reset }) {
  let data = loadLoginFromFile();

  if (reset || !data?.email || !data?.token) {
    data = await inquirer.prompt([
      {
        type: "input",
        name: "email",
        message: "Enter your email:",
        validate: () => true,
      },
      {
        type: "password",
        name: "token",
        message: "Enter your token:",
        mask: "*",
        validate: () => true,
      },
    ]);

    try {
      const res = await ServerAxios.post("/login", data);
      if (!res?.data?.jwt) {
        throw new Error("No token received");
      }
      saveLoginToFile(res.data.jwt);
      const message = chalk.green.bold(
        "\n🎉 Login succeeded! \n\nWelcome aboard, Sharkio sailor! 🦈\n",
      );
      console.log(message);
    } catch (err) {
      const errorMessage = chalk.red.bold(
        "\n🚫 Login failed. \n\nSomething seems fishy... 🐟\n",
      );
      console.log(errorMessage);
      return;
    }
  }
}

export default login;
