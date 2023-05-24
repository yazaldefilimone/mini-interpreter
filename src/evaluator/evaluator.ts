import { Environment, globalEnvironment } from 'environment';

type expType<T = any | unknown> = T;

export class Evaluator {
  private globalEnv: Environment;
  constructor(globalEnv = globalEnvironment) {
    this.globalEnv = globalEnv;
  }

  eva(exp: expType, env = this.globalEnv) {
    if (this._isNumber(exp)) {
      return exp;
    }

    if (this._isString(exp)) {
      return exp.slice(1, -1);
    }

    // variables
    if (exp.at(0) === 'var') {
      const [_, name, value] = exp;
      return env.define(name, this.eva(value, env));
    }
    if (exp.at(0) === 'set') {
      const [_, name, value] = exp;
      return env.assign(name, this.eva(value, env));
    }

    if (this._isVariableName(exp)) {
      return env.lookup(exp);
    }
    // block scope
    if (exp.at(0) === 'begin') {
      const newEnv = new Environment({}, env);
      return this._evalBlock(exp, newEnv);
    }
    // if
    if (exp.at(0) === 'if') {
      const [_tag, expression, consequent, alternative] = exp;
      if (this.eva(expression, env)) {
        return this.eva(consequent, env);
      }
      return this.eva(alternative, env);
    }
    // while
    if (exp.at(0) === 'while') {
      const [_tag, condition, body] = exp;
      let result: unknown;
      while (this.eva(condition, env)) {
        result = this.eva(body, env);
      }
      return result;
    }
    // functions:user
    if (exp.at(0) === 'def') {
      const [_tag, name, params, body] = exp;
      const fn = {
        params,
        body,
        env,
      };
      return env.define(name, fn);
    }
    // functions:native/user

    if (Array.isArray(exp)) {
      const fn = this.eva(exp.at(0), env);
      const args = exp.slice(1).map((e) => this.eva(e, env));
      if (typeof fn === 'function') {
        return fn(...args);
      }
      // user function
      const activationRecord = {};
      fn.params.map((param: any, index: number) => {
        return (activationRecord[param] = args[index]);
      });
      const activationEnv = new Environment(activationRecord, fn.env);
      return this._evalBody(fn.body, activationEnv);
    }

    throw `Type Error: ${JSON.stringify(typeof exp === 'object' ? exp.at(0) : exp)} unimplemented!`;
  }

  private _evalBody(body: unknown[], env: Environment) {
    if (body.at(0) === 'begin') {
      return this._evalBlock(body, env);
    }
    return this.eva(body, env);
  }

  private _evalBlock(exp: expType, env: Environment) {
    let result: unknown;
    const [_tag, ...expressions] = exp;
    expressions.forEach((expression: Array<unknown>) => {
      result = this.eva(expression, env);
    });
    return result;
  }

  private _isNumber(exp: expType) {
    return typeof exp === 'number';
  }
  private _isString(exp: expType) {
    return typeof exp === 'string' && exp[0] === '"' && exp.at(-1) === '"';
  }

  private _isVariableName(exp: expType) {
    return typeof exp === 'string' && /^[+\-*/<>=a-zA-Z][a-zA-Z)-9_]*$/.test(exp);
  }
}
