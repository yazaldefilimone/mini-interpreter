export class Environment {
  private readonly record: {};
  private readonly parent: Environment | null;
  constructor(record = {}, parent = null) {
    this.record = record;
    this.parent = parent;
  }

  public define<T = unknown>(name: string, value: T) {
    this.record[name] = value;
    return value;
  }
  public lookup(name: string) {
    return this.resolve(name).record[name];
  }
  public assign<T = unknown>(name: string, value: T) {
    this.resolve(name).record[name] = value;
    return value;
  }

  public resolve(name: string): Environment {
    if (this.record.hasOwnProperty(name)) {
      return this;
    }
    if (this.parent === null) {
      throw `Error: variable "${name}" has not been defined.`;
    }
    return this.parent.resolve(name);
  }
}

export const globalEnvironment = new Environment({
  true: true,
  false: false,
  null: null,
  '+'(opOne: number, opTwo: number) {
    return opOne + opTwo;
  },
  '-'(opOne: number, opTwo: number = null) {
    if (opTwo === null) {
      return -opOne;
    }
    return opOne - opTwo;
  },
  '*'(opOne: number, opTwo: number) {
    return opOne * opTwo;
  },
  '/'(opOne: number, opTwo: number) {
    return opOne / opTwo;
  },
  '='(opOne: number, opTwo: number) {
    return opOne === opTwo;
  },

  '<='(opOne: number, opTwo: number) {
    return opOne <= opTwo;
  },
  '>='(opOne: number, opTwo: number) {
    return opOne >= opTwo;
  },
  '>'(opOne: number, opTwo: number) {
    return opOne > opTwo;
  },
  '<'(opOne: number, opTwo: number) {
    return opOne < opTwo;
  },
  print(...args: any[]) {
    console.log(args.length > 2 ? args : args.at(0));
  },
});
