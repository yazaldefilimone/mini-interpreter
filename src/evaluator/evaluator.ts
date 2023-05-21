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

    if (exp.at(0) === "+") {
      return this.eva(exp.at(1)) + this.eva(exp.at(2));
    }
    if (exp.at(0) === "*") {
      return this.eva(exp.at(1)) * this.eva(exp.at(2));
    }

    if (exp.at(0) === "var") {
      const [_, name, value] = exp;
      return env.define(name, this.eva(value));
    }

    if (isVariableName(exp)) {
      return env.lookup(exp);
    }
    throw `Type Error: ${JSON.stringify(exp)}: unimplemented!`;
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
