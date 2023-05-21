export class Environment {
  private readonly record: {};
  constructor(record = {}) {
    this.record = record;
  }

  public define<T = any>(name: string, value: T) {
    this.record[name] = value;
    return value;
  }
  public lookup(name: string) {
    if (!this.record.hasOwnProperty(name)) {
      throw `Variable "${name}" has not been defined.`;
    }
    return this.record[name];
  }
}
