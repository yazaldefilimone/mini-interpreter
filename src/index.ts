import readline from 'readline';
import Parser from './parser/parser.js';
import { Evaluator } from 'evaluator';

const ScannerClose = {
  exit: 'exit',
  quit: 'quit',
};

const exits = [ScannerClose.exit, ScannerClose.quit];

export function startRepl() {
  const scanner = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function repl() {
    scanner.question('> ', (input) => {
      if (exits.includes(input)) return scanner.close();
      const evaluator = new Evaluator();
      const exp = Parser.parse(`(begin ${input})`);

      const evaluated = evaluator.evaGlobal(exp);

      if (evaluated !== undefined && typeof evaluated !== 'object') {
        console.log(evaluated);
      }

      repl();
    });
  }

  console.log('Welcome');
  repl();
}

startRepl();
