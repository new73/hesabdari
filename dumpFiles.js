import fs from "fs";
import path from "path";

function dumpDir(dir, outFile) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      dumpDir(fullPath, outFile);
    } else {
      fs.appendFileSync(
        outFile,
        `\n\n--- FILE: ${fullPath} ---\n\n${fs.readFileSync(fullPath, "utf8")}`
      );
    }
  }
}

const output = "project-dump.txt";
if (fs.existsSync(output)) fs.unlinkSync(output);

dumpDir("./src", output);
dumpDir("./server", output);

console.log("✅ همه فایل‌ها داخل project-dump.txt ذخیره شد");
