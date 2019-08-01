import { assert } from "chai";
import * as estree from "estree";
import * as fs from "fs";
import * as path from "path";
import * as rules from "../src/rules/index";

export function loadAST(name: string): estree.Node {
  const filePath = path.join(__dirname, "testdata", "ast", name);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function assertAccepts(ast: estree.Node, rule: rules.Rule) {
  const context = rules.runRules(ast as any, [rule]);
  assert.isEmpty(context.getReports());
}

export function assertRejects(ast: estree.Node, rule: rules.Rule) {
  const context = rules.runRules(ast as any, [rule]);
  assert.isNotEmpty(context.getReports());
}

export function assertReportsCheckIds(
  ast: estree.Node,
  rule: rules.Rule,
  check_ids: [string]
) {
  const context = rules.runRules(ast as any, [rule]);
  assert.sameDeepMembers(
    check_ids,
    context.getReports().map(report => report.checkId)
  );
}
