import * as stadt from "stadt";
import * as estree from "estree";
import { Context, Rule, getType, possibleTypes } from "./index";
import { NominativeType, TypeKind } from "stadt";

// Checks for unsafe usage of the Buffer API, i.e. `new Buffer()`,
export const rule: Rule = {
  create(context: Context) {
    function checkConstructor(node: estree.NewExpression) {
      /*
        YOUR CODE GOES HERE!
        Make sure to only set the checkId when Buffer is called with a single number argument!
      */
      
      const checkId: string | undefined = undefined;
      if (checkId === undefined) {
        return;
      }

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
