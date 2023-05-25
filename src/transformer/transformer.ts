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
}
