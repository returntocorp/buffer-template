import { rule } from "../src/rules/non-literal-require";
import { loadAST, assertAccepts, assertRejects } from "./util";

describe("non-literal require checks", () => {
  it("triggers even if the function being called might not be require", () => {
    // Some libraries will do stuff like polyfill require, so the type of the
    // 'require' function they call might be a union of NodeRequire with other
    // stuff.
    assertRejects(loadAST("maybe-require.js.ast.json"), rule);
  });

  it("allows a require of a union of string literals", () => {
    // In theory, code could require one of multiple packages with the same
    // interface. As long as all the package names are literals, this is fine.
    assertAccepts(loadAST("require-literal-union.js.ast.json"), rule);
  });
});
