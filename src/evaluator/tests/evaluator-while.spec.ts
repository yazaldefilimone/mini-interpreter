import { Evaluator } from 'evaluator';
import { parserCode } from 'tests/main';

const makeSut = () => {
  const sut = new Evaluator();
  return {
    sut,
  };
};

describe('Evaluator', () => {
  it('while: should return the correct sum of two numbers', () => {
    const { sut } = makeSut();
    const secondScop = [
      'begin',

      ['var', 'counter', 0],

      [
        'while',
        ['<', 'counter', 10],
        // counter++
        // TODO: implement ['++', <Exp>]
        ['set', 'counter', ['+', 'counter', 1]],
      ],

      'counter',
    ];

    expect(sut.eva(secondScop)).toBe(10);
  });
  it('test parser', () => {
    const { sut } = makeSut();
    const code = `(begin (var y 10) y)`;
    const codeParser = parserCode(code);
    expect(sut.eva(codeParser)).toBe(10);
  });
});
