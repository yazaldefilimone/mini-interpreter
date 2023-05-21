type exType<T = any | unknown> = T;

export class SelfEvaluation {
  eva(ex: exType) {
    if (isNumber(ex)) {
      return ex;
    }

    if (isString(ex)) {
      return ex.slice(1, -1);
    }

    if (ex.at(0) === "+") {
      return this.eva(ex.at(1)) + this.eva(ex.at(2));
    }
    if (ex.at(0) === "*") {
      return this.eva(ex.at(1)) * this.eva(ex.at(2));
    }
    throw `Type Error: ${typeof ex}: unimplemented!`;
  }
}

function isNumber(ex: exType<number>) {
  return typeof ex === "number";
}
function isString(ex: exType<string>) {
  return typeof ex === "string" && ex[0] === '"' && ex.at(-1) === '"';
}
