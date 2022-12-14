/* eslint-disable no-console */
import commander from "commander";
import {exists, mkdir, readdir, readFile, stat, writeFile} from "mz/fs";
import {join} from "path";

import { transform} from "./index";








export default function run() {
  commander
    .description(`Sucrase: super-fast Babel alternative.`)
    .usage("[options] <srcDir>")
    .option(
      "-d, --out-dir <out>",
      "Compile an input directory of modules into an output directory.",
    )
    .option("--out-extension <extension>", "File extension to use for all output files.", "js")
    .option("--exclude-dirs <paths>", "Names of directories that should not be traversed.")
    .option("-t, --transforms <transforms>", "Comma-separated list of transforms to run.")
    .option("-q, --quiet", "Don't print the names of converted files.")
    .option(
      "--enable-legacy-typescript-module-interop",
      "Use default TypeScript ESM/CJS interop strategy.",
    )
    .option("--enable-legacy-babel5-module-interop", "Use Babel 5 ESM/CJS interop strategy.")
    .option("--jsx-pragma <string>", "Element creation function, defaults to `React.createElement`")
    .option("--jsx-fragment-pragma <string>", "Fragment component, defaults to `React.Fragment`")
    .parse(process.argv);

  if (!commander.outDir) {
    console.error("Out directory is required");
    process.exit(1);
  }

  if (!commander.transforms) {
    console.error("Transforms option is required.");
    process.exit(1);
  }

  if (!commander.args[0]) {
    console.error("Source directory is required.");
    process.exit(1);
  }

  const outDir = commander.outDir;
  const srcDir = commander.args[0];

  const options = {
    outExtension: commander.outExtension,
    excludeDirs: commander.excludeDirs ? commander.excludeDirs.split(",") : [],
    quiet: commander.quiet,
    sucraseOptions: {
      transforms: commander.transforms.split(","),
      enableLegacyTypeScriptModuleInterop: commander.enableLegacyTypescriptModuleInterop,
      enableLegacyBabel5ModuleInterop: commander.enableLegacyBabel5ModuleInterop,
      jsxPragma: commander.jsxPragma || "React.createElement",
      jsxFragmentPragma: commander.jsxFragmentPragma || "React.Fragment",
    },
  };

  buildDirectory(srcDir, outDir, options).catch((e) => {
    process.exitCode = 1;
    console.error(e);
  });
}

async function buildDirectory(
  srcDirPath,
  outDirPath,
  options,
) {
  const extensions = options.sucraseOptions.transforms.includes("typescript")
    ? [".ts", ".tsx"]
    : [".js", ".jsx"];
  if (!(await exists(outDirPath))) {
    await mkdir(outDirPath);
  }
  for (const child of await readdir(srcDirPath)) {
    if (["node_modules", ".git"].includes(child) || options.excludeDirs.includes(child)) {
      continue;
    }
    const srcChildPath = join(srcDirPath, child);
    const outChildPath = join(outDirPath, child);
    if ((await stat(srcChildPath)).isDirectory()) {
      await buildDirectory(srcChildPath, outChildPath, options);
    } else if (extensions.some((ext) => srcChildPath.endsWith(ext))) {
      const outPath = outChildPath.replace(/\.\w+$/, `.${options.outExtension}`);
      await buildFile(srcChildPath, outPath, options);
    }
  }
}

async function buildFile(srcPath, outPath, options) {
  if (!options.quiet) {
    console.log(`${srcPath} -> ${outPath}`);
  }
  const code = (await readFile(srcPath)).toString();
  const transformedCode = transform(code, {...options.sucraseOptions, filePath: srcPath}).code;
  await writeFile(outPath, transformedCode);
}
