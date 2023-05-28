import { Environment, globalEnvironment } from 'environment';
import { Transformer } from 'transformer';
import parser from '../parser/parser';
import fs from 'fs';
type expType = any;
type userFnType = {
  params: unknown[];
  body: unknown[];
  env: Environment;
};

export class Evaluator {
  private globalEnv: Environment;
  private _transformer: Transformer;
  constructor(globalEnv = globalEnvironment) {
    this.globalEnv = globalEnv;
    this._transformer = new Transformer();
  }

  evaGlobal(expressions: unknown) {
    return this._evalBlock(['block', expressions], this.globalEnv);
  }

  eva(exp: expType, env = this.globalEnv) {
    if (!Boolean(exp)) {
      return exp;
    }
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
    // return ['set', ['+', name, 1]];

    if (exp.at(0) === 'set') {
      const [_, ref, value] = exp;
      // (set <name> (prop classInstance prop))
      if (Array.isArray(ref) && ref.at(0) === 'prop') {
        const [_tag, instance, propName] = ref;
        const instanceEnvironment = this.eva(instance, env);

        return instanceEnvironment.define(propName, this.eva(value, env));
      }
      return env.assign(ref, this.eva(value, env));
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
      // console.log({ body });
      while (this.eva(condition, env)) {
        result = this.eva(body, env);
      }
      return result;
    }
    // for
    if (exp.at(0) === 'for') {
      const whileExp = this._transformer.forToWhile(exp);
      return this.eva(whileExp, env);
    }
    // functions:user
    if (exp.at(0) === 'def') {
      const evaExp = this._transformer.defToLambda(exp);
      return this.eva(evaExp, env);
    }
    // lambda
    if (exp.at(0) === 'lambda') {
      const [_tag, params, body] = exp;
      const fn = {
        params,
        body,
        env,
      };
      return fn;
    }
    // class
    if (exp.at(0) === 'class') {
      const [_tag, name, parent, body] = exp;
      const parentEnvironment = this.eva(parent, env) ?? env;

      const classEnvironment = new Environment({}, parentEnvironment);
      this._evalBody(body, classEnvironment);

      return env.define(name, classEnvironment);
    }
    // new: instance of class
    if (exp.at(0) === 'new') {
      const classEnvironment = this.eva(exp.at(1), env);
      const instanceEnvironment = new Environment({}, classEnvironment);
      const args = exp.slice(2).map((arg: unknown) => this.eva(arg, env));

      this._callUserDefinedFunction(classEnvironment.lookup('constructor'), [
        instanceEnvironment,
        ...args,
      ]);

      return instanceEnvironment;
    }

    // prop: (prop <instance> <name>)
    if (exp.at(0) === 'prop') {
      const [_tag, instance, name] = exp;

      const instanceEnvironment = this.eva(instance, env);
      return instanceEnvironment.lookup(name);
    }

    // super:inheritance
    if (exp.at(0) === 'super') {
      const [_tag, className] = exp;
      console.log({ className });
      return this.eva(className, env)?.parent;
    }

    // modules
    if (exp.at(0) === 'module') {
      const [_tag, name, body] = exp;
      const moduleEnvironment = new Environment({}, env);

      this._evalBody(body, moduleEnvironment);
      return env.define(name, moduleEnvironment);
    }

    // import
    if (exp.at(0) === 'import') {
      const [_tag, name] = exp;
      const path = `./modules/${name}.eva`;
      const moduleSource = fs.readFileSync(path, 'utf-8');
      const body = parser.parse(`(begin ${moduleSource})`);
      const moduleExpression = ['module', name, body];
      return this.eva(moduleExpression, env);
    }
    // switch
    if (exp.at(0) === 'switch') {
      const evaExp = this._transformer.switchToIf(exp);
      return this.eva(evaExp, env);
    }

    // ++
    if (exp.at(0) === '++') {
      const evaExp = this._transformer.incrementeToSet(exp);
      return this.eva(evaExp, env);
    }
    // --
    if (exp.at(0) === '--') {
      const evaExp = this._transformer.decrementeToSet(exp);
      return this.eva(evaExp, env);
    }
    // +=
    if (exp.at(0) === '+=') {
      const evaExp = this._transformer.incrementeToSet(exp);
      return this.eva(evaExp, env);
    }
    // -=
    if (exp.at(0) === '-=') {
      const evaExp = this._transformer.decrementeToSet(exp);
      return this.eva(evaExp, env);
    }
    // functions:native/user

    if (Array.isArray(exp)) {
      const fn = this.eva(exp.at(0), env);
      const args = exp.slice(1).map((e) => this.eva(e, env));
      if (typeof fn === 'function') {
        return fn(...args);
      }
      // user function
      return this._callUserDefinedFunction(fn, args);
    }

    throw `Type Error: ${JSON.stringify(typeof exp === 'object' ? exp.at(0) : exp)} unimplemented!`;
  }

  private _evalBody(body: unknown[], env: Environment) {
    if (body.at(0) === 'begin') {
      return this._evalBlock(body, env);
    }
    return this.eva(body, env);
  }

  private _callUserDefinedFunction(fn: userFnType, args: unknown[]) {
    const activationRecord = {};
    fn.params.map((param: any, index: number) => {
      return (activationRecord[param] = args[index]);
    });
    const activationEnv = new Environment(activationRecord, fn.env);
    return this._evalBody(fn.body, activationEnv);
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
