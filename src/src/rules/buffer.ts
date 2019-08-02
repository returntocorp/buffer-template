import * as stadt from "stadt";
import * as estree from "estree";
import { Context, Rule, getType, possibleTypes } from "./index";
import { NominativeType, TypeKind } from "stadt";

// Checks for unsafe usage of the Buffer API, i.e. `new Buffer()`,
export const rule: Rule = {
  create(context: Context) {
    function checkConstructor(node: estree.NewExpression) {
      const checkId = "buffer_constructor_number"
      
      if (!(node.callee.type == "Identifier" && node.callee.name == "Buffer")) {
        return;
      }

      /*
        YOUR CODE GOES HERE!
        Make sure to only report when Buffer is called with a non-literal number argument!
      */
 
      context.report({
        node: node,
        checkId: checkId
      });
    }

    return {
      NewExpression(node: estree.NewExpression) {
        checkConstructor(node);
      }
    };
  }
};
