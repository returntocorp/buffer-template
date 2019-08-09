import * as stadt from "stadt";
import * as estree from "estree";
import { Context, Rule, getType, possibleTypes } from "./index";
import { NominativeType, TypeKind } from "stadt";

function isBuffer(ty: any) {
  return ty.type === "Identifier" && ty.name === "Buffer";
}

// Checks for unsafe usage of the Buffer API, i.e. `new Buffer()`,
export const rule: Rule = {
    create(context: Context) {
    return {
      NewExpression(node: estree.NewExpression) {
        const checkId = "bad_buffer_constructor";
      
        if (!(isBuffer(node.callee))) {
          return;
        }
         /*
          YOUR CODE GOES HERE!
          Make sure to only report when Buffer is (possibly) called with a non-literal number argument!
          Literal numbers are almost always ok in real code, because they're usually filled in a loop immediately after instantiation.
        */
         context.report({
          node: node,
          checkId: checkId
        });
      }
    };
  }
}
