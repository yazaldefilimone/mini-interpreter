import { Evaluator } from 'evaluator';
import { parserCode } from 'tests/main';

const makeSut = () => {
  const sut = new Evaluator();
  return {
    sut,
  };
};

describe('Object Oriented Programming', () => {
  it('classes', () => {
    const { sut } = makeSut();
    const code = `
      (class Math null 
        (begin
          (def constructor (this x y)
            (begin
              (set (prop this x) x)
              (set (prop this y) y)
            )
          )

          (def calc (this)
            (+ (prop this x) (prop this y))
          )
        ))
    
      (var math (new Math 10 20))

      ((prop math calc) math)
    `;
    const codeParser = parserCode(code);
    expect(sut.eva(codeParser)).toBe(30);
  });

  it('Class inheritance and Super calls', () => {
    const { sut } = makeSut();
    const code = `
       (class Math null 
        (begin
          (def constructor (this x y)
            (begin
              (set (prop this x) x)
              (set (prop this y) y)
            )
          )

          (def calc (this)
            (+ (prop this x) (prop this y))
          )
        ))
      (class SUM Math 
        (begin
          (def constructor (this x y z)
            (begin
              (prop ((super Math) constructor) this x y)
              (set (prop this z) z)
            )
          )
          (def calcWithInheritance (this)
            (+ ((prop (super Math) calc) this) (prop this y))
          )
        ))
    
      (var sum (new SUM 10 20 10))

      ((prop sum calcWithInheritance) sum)
    `;
    const codeParser = parserCode(code);
    console.log(JSON.stringify(codeParser));
    expect(sut.evaGlobal(codeParser)).toBe(30);
  });
});
