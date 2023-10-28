import ServerAxios from "./serverAxios.js";
import Table from "cli-table3";
import chalk from "chalk";

const getSniffers = async () => {
  const res = await ServerAxios.get("/sniffers").catch((err) => {
    const errorMessage =
      chalk.bgRed.white.bold(" 🦈 Shark Alert! ") +
      chalk.red(
        "\nWe hit a reef while trying to fetch the sniffers.\nPlease try again later.",
      );

    console.log(errorMessage);
    process.exit(1);
  });

  const sniffers = res.data.sniffers;
  const table = new Table({
    head: ["Name", "Downstream URL", "Local Port"],
    colWidths: [20, 30, 20],
  });
  sniffers.forEach((sniffer) => {
    table.push([sniffer.name, sniffer.downstreamUrl, sniffer.port || "N/A"]);
  });

  // Print the table
  console.log(table.toString());
};

export default getSniffers;
