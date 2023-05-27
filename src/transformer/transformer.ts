export class Transformer {
  transformerDefToLambda(exp: unknown[]) {
    const [_tag, name, params, body] = exp;
    const evaExp = ['var', name, ['lambda', params, body]];
    return evaExp;
  }
  transformerSwitchToIf(exp: unknown[]) {
    const [_tag, ...cases] = exp;
    const ifExp: unknown[] = ['if', null, null, null];
    let current = ifExp;
    for (let index = 0; index < cases.length - 1; index++) {
      const [currentCondicional, currentBlock] = cases[index] as unknown[];
      current[1] = currentCondicional;
      current[2] = currentBlock;
      const next = cases[index + 1];

      const [nextCondicional, nextBlock] = next as unknown[];

      current[3] = nextCondicional === 'else' ? nextBlock : ['if'];
      current = current[3] as unknown[];
    }

    return ifExp;
  }
  transformerForToWhile(exp: unknown[]): unknown[] {
    const [_tag, counter, condition, ...rest] = exp;
    const whileExp = ['begin', counter, ['while', condition, ['begin', ...rest]]];
    return whileExp;
  }

  transformerIncrementeToSet(exp: unknown[]) {
    const [_tag, name, num] = exp;

    return num ? ['set', name, ['+', name, num]] : ['set', name, ['+', name, 1]];
  }

  transformerDecrementeToSet(exp: unknown[]) {
    const [_tag, name, num] = exp;
    return num ? ['set', name, ['-', name, num]] : ['set', name, ['-', name, 1]];
  }
}
