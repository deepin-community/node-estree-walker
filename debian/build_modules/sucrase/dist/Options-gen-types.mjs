/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from "ts-interface-checker";
// tslint:disable:object-literal-key-quotes

export const Transform = t.union(
  t.lit("jsx"),
  t.lit("typescript"),
  t.lit("flow"),
  t.lit("imports"),
  t.lit("react-hot-loader"),
);

export const SourceMapOptions = t.iface([], {
  compiledFilename: "string",
});

export const Options = t.iface([], {
  transforms: t.array("Transform"),
  jsxPragma: t.opt("string"),
  jsxFragmentPragma: t.opt("string"),
  enableLegacyTypeScriptModuleInterop: t.opt("boolean"),
  enableLegacyBabel5ModuleInterop: t.opt("boolean"),
  sourceMapOptions: t.opt("SourceMapOptions"),
  filePath: t.opt("string"),
  production: t.opt("boolean"),
});

const exportedTypeSuite = {
  Transform,
  SourceMapOptions,
  Options,
};
export default exportedTypeSuite;