import { Environment } from "environment";

type expType<T = any | unknown> = T;

export class Evaluator {
  private globalEnv: Environment;
  constructor(globalEnv = new Environment()) {
    this.globalEnv = globalEnv;
  }

  eva(exp: expType, env = this.globalEnv) {
    if (isNumber(exp)) {
      return exp;
    }

    if (isString(exp)) {
      return exp.slice(1, -1);
    }
    // math
    if (exp.at(0) === "+") {
      return this.eva(exp.at(1), env) + this.eva(exp.at(2), env);
    }
    if (exp.at(0) === "*") {
      return this.eva(exp.at(1), env) * this.eva(exp.at(2), env);
    }
    // variables
    if (exp.at(0) === "var") {
      const [_, name, value] = exp;
      return env.define(name, this.eva(value, env));
    }
    if (exp.at(0) === "set") {
      const [_, name, value] = exp;
      return env.assign(name, this.eva(value, env));
    }

    if (isVariableName(exp)) {
      return env.lookup(exp);
    }
    // block scope

    if (exp.at(0) === "begin") {
      const newEnv = new Environment({}, env);
      return this._evalBlock(exp, newEnv);
    }
    throw `Type Error: ${JSON.stringify(exp)}: unimplemented!`;
  }
  private _evalBlock(exp: expType, env: Environment) {
    let result: unknown;
    const [_tag, ...expressions] = exp;
    expressions.forEach((expression: Array<unknown>) => {
      result = this.eva(expression, env);
    });
    return result;
  }
}

function isNumber(exp: expType) {
  return typeof exp === "number";
}
function isString(exp: expType) {
  return typeof exp === "string" && exp[0] === '"' && exp.at(-1) === '"';
}

function isVariableName(exp: expType) {
  return typeof exp === "string" && /^[a-zA-Z][a-zA-Z)-9_]*$/.test(exp);
}
