import fs from "fs";
import csv from "csv-parser";
import path from "path";



const readCSVFile = () => {
  const CSV_TABLE_FILE_PATH = "tabelaDeAlimentos.csv";
  const filePath = path.join(process.cwd(), "public", CSV_TABLE_FILE_PATH);
  return new Promise((resolve, reject) => {
    const rows: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row: any) => {
        rows.push(row);
      })
      .on("end", () => {
        resolve(rows);
      })
      .on("error", (error: any) => {
        reject(error);
      });
  });
};

export default readCSVFile;
