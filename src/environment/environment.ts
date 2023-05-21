export class Environment {
  private readonly record: {};
  constructor(record = {}) {
    this.record = record;
  }

  define<T = any>(name: string, value: T) {
    this.record[name] = value;
    return value;
  }
}
