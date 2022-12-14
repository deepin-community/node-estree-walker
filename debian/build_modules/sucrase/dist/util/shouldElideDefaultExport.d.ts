import TokenProcessor from "../TokenProcessor";
import { DeclarationInfo } from "./getDeclarationInfo";
/**
 * Common method sharing code between CJS and ESM cases, since they're the same here.
 */
export default function shouldElideDefaultExport(isTypeScriptTransformEnabled: boolean, tokens: TokenProcessor, declarationInfo: DeclarationInfo): boolean;
