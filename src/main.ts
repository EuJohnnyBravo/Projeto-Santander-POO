import Pessoa from "./entities/Pessoa";
import Escola from "./entities/Escola";
import Turma from "./entities/Turma";
import vetorPessoas from "./populate/Pessoas"; //pessoas

// Escola
const ada = new Escola("ada tech");

// Turmas
const turma1 = new Turma(1, "Presencial", "algo 1");
const turma2 = new Turma(2, "Ead", "algo 2");
const turma3 = new Turma(3, "Presencial", "algo 3");
const turma4 = new Turma(4, "Ead", "algo 4");
const turma5 = new Turma(5, "Presencial", "algo 5");
const turma6 = new Turma(6, "Ead", "algo 6");

// adicionando turmas
ada.adicionarTurma(turma1);
ada.adicionarTurma(turma2);
ada.adicionarTurma(turma3);
ada.adicionarTurma(turma4);
ada.adicionarTurma(turma5);
ada.adicionarTurma(turma6);

function gerarNotas(): number[] {
  const notas: number[] = [];
  for (let i = 0; i < 3; i++) {
    const random = Math.floor(Math.random() * 11);
    notas.push(random);
  }
  return notas;
}

// criando aluno e adicionando nas turmas
let i = 0;
let endI = 5;
for (i; i < endI; i++) {
  ada.adicionarAluno(vetorPessoas[i], turma1.codigo, gerarNotas());
}
endI += 5;
for (i; i < endI; i++) {
  ada.adicionarAluno(vetorPessoas[i], turma2.codigo, gerarNotas());
}
endI += 5;
for (i; i < endI; i++) {
  ada.adicionarAluno(vetorPessoas[i], turma3.codigo, gerarNotas());
}
endI += 5;
for (i; i < endI; i++) {
  ada.adicionarAluno(vetorPessoas[i], turma4.codigo, gerarNotas());
}
endI += 5;
for (i; i < endI; i++) {
  ada.adicionarAluno(vetorPessoas[i], turma5.codigo, gerarNotas());
}
endI += 5;
for (i; i < endI; i++) {
  ada.adicionarAluno(vetorPessoas[i], turma6.codigo, gerarNotas());
}

// adicionando notas nos alunos

ada.relatorioCompleto();

ada.trocarStatusAluno("email26@exemplo.com", false);

ada.relatorioCompleto();
