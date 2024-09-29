import Turma from "./Turma";
import Aluno from "./Aluno";
import Pessoa from "./Pessoa";

export default class Escola {
  public _contadorTurmas = 0;
  private MAX_TURMAS = 10;
  private MEDIA = 6;
  private _turmas: Turma[] = [];

  constructor(private _nome: string) {}

  public quantidadeDeTurmas() {
    console.log(`Quantidade de turmas criadas: ${this._contadorTurmas}`);
    console.log(`Número maximo de turmas: ${this.MAX_TURMAS}`);
  }

  public get nome() {
    return this._nome;
  }

  public set nome(nome: string) {
    this._nome = nome;
  }

  public get turmas() {
    if (this._turmas.length > 0) {
      return this._turmas;
    }
    console.log("Nenhuma Turma cadastrada na escola!");
    return [];
  }

  public buscarAluno(emailAluno: string) {
    for (const turma of this._turmas) {
      const alunoEncontrado = turma.alunos.find(
        (aluno) => aluno.pessoa.email === emailAluno
      );
      if (alunoEncontrado) {
        return alunoEncontrado;
      }
    }
    return null;
  }

  public buscarTurma(codigoTurma: number) {
    const turma = this._turmas.find((turma) => turma.codigo === codigoTurma);
    if (turma) {
      return turma;
    }
    return null;
  }

  public adicionarTurma(turma: Turma) {
    if (this._contadorTurmas >= 10) {
      throw new Error("Maximo de turmas criadas!");
    }
    if (
      this._turmas.find(
        (turmaEncontrada) => turmaEncontrada.codigo === turma.codigo
      )
    ) {
      throw new Error("Já existe uma turma com esse código!");
    }
    this._turmas.push(turma);
    this._contadorTurmas++;
  }

  public removerTurma(codigoTurma: number) {
    const turma = this.buscarTurma(codigoTurma);
    if (!turma) {
      throw new Error("Turma não existe");
    }
    if (!(this._contadorTurmas > 0)) {
      throw new Error("Nenhuma turma cadastrada na escola!");
    }
    if (this._turmas.includes(turma)) {
      throw new Error("Turma já cadastrada na escola!");
    }
    const index = this._turmas.indexOf(turma);
    this._turmas.splice(index, 1);
  }

  public adicionarAluno(pessoa: Pessoa, codigoTurma: number, notas?: number[]) {
    const turma = this.buscarTurma(codigoTurma);
    if (!turma) {
      throw new Error("Turma não existe");
    }
    if (!this._turmas.includes(turma)) {
      throw new Error("Turma não cadastrada na escola!");
    }
    if (!(turma.alunos.length < 10)) {
      throw new Error("Turma Cheia!");
    }
    if (this.validarIdade(pessoa.nascimento) < 16) {
      throw new Error("Aluno menor de 16 anos");
    }
    const totalAlunos = this.listarAlunos();
    if (totalAlunos.find((aluno) => aluno.pessoa.email === pessoa.email)) {
      throw new Error("Já existe um aluno com esse email!");
    }
    const aluno = new Aluno(pessoa, turma.tipo, turma.codigo, notas);
    if (turma.alunos.includes(aluno)) {
      throw new Error("Aluno já cadastrado na turma!");
    }
    turma.alunos.push(aluno);
    if (turma.alunos.length >= 5) {
      turma.isAtivo = true;
    } else {
      turma.isAtivo = false;
    }
  }

  public removerAluno(emailAluno: string, codigoTurma: number) {
    const turma = this.buscarTurma(codigoTurma);
    const aluno = this.buscarAluno(emailAluno);
    if (!turma) {
      throw new Error("Turma não existe");
    }
    if (!aluno) {
      throw new Error("Aluno não existe");
    }
    if (!(turma.alunos.length > 0)) {
      throw new Error("Nenhum Aluno cadastrado na turma!");
    }
    if (turma.alunos.includes(aluno)) {
      const index = turma.alunos.indexOf(aluno);
      turma.alunos.splice(index, 1);
      if (turma.alunos.length >= 5) {
        turma.isAtivo = true;
      } else {
        turma.isAtivo = false;
      }
      return;
    }
    throw new Error("Aluno não cadastrado na turma!");
  }

  public validarIdade(dataNascimento: Date): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  public trocarStatusAluno(emailAluno: string, status: boolean) {
    const aluno = this.buscarAluno(emailAluno);
    if (aluno) {
      aluno.isAtivo = status;
      return;
    }
    throw new Error("Aluno não encontrado!");
  }

  public atualizarAluno(
    aluno: Aluno,
    email: string,
    nome: string,
    sobrenome: string,
    nascimento: Date
  ) {
    if (this.listarAlunos().find((aluno) => aluno.pessoa.email === email)) {
      throw new Error("Já existe um aluno com esse email");
    }
    aluno.pessoa.email = email;
    aluno.pessoa.nome = nome;
    aluno.pessoa.sobrenome = sobrenome;
    aluno.pessoa.nascimento = nascimento;
    console.log("Aluno atualizado!");
  }

  public listarAlunos(): Aluno[] {
    const alunosTotal: Aluno[] = [];
    for (const turma of this._turmas) {
      for (const aluno of turma.alunos) {
        alunosTotal.push(aluno);
      }
    }
    return alunosTotal;
  }

  public listarAlunosNaMedia(): Aluno[] {
    const listaAlunosMedia: Aluno[] = [];
    this.listarAlunos().forEach((aluno) => {
      aluno.calcularMedia();
      if (aluno.media >= this.MEDIA) {
        listaAlunosMedia.push(aluno);
      }
    });
    return listaAlunosMedia;
  }

  public listarAlunosAbaixoMedia(): Aluno[] {
    const listaAlunosAbaixoMedia: Aluno[] = [];
    this.listarAlunos().forEach((aluno) => {
      aluno.calcularMedia();
      if (aluno.media < this.MEDIA) {
        listaAlunosAbaixoMedia.push(aluno);
      }
    });
    return listaAlunosAbaixoMedia;
  }

  public listarAlunosAtivos(): Aluno[] {
    const listaAlunosAtivos: Aluno[] = [];
    this.listarAlunos().forEach((aluno) => {
      if (aluno.isAtivo) {
        listaAlunosAtivos.push(aluno);
      }
    });
    return listaAlunosAtivos;
  }

  public listarAlunosInativos(): Aluno[] {
    const listaAlunosInativos: Aluno[] = [];
    this.listarAlunos().forEach((aluno) => {
      if (!aluno.isAtivo) {
        listaAlunosInativos.push(aluno);
      }
    });
    return listaAlunosInativos;
  }

  public relatorioCompleto() {
    console.log(`=-=-=-=- Relatorio Completo Escola: ${this._nome} =-=-=-=-`);
    console.log(`Quantidade de alunos: ${this.listarAlunos().length}`);
    console.log(`Quantidade de turmas: ${this._turmas.length}`);
    console.log(
      `Alunos que estão com a média esperada: ${
        this.listarAlunosNaMedia().length
      }`
    );
    console.log(
      `Alunos que estão abaixo da média esperada: ${
        this.listarAlunosAbaixoMedia().length
      }`
    );
    console.log(`Alunos ativos: ${this.listarAlunosAtivos().length}`);
    console.log(`Alunos inativos: ${this.listarAlunosInativos().length}`);
    this.listarAlunos().forEach((aluno) => {
      console.log(aluno.toString());
    });
  }
}
