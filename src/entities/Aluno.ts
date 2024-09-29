import Pessoa from "./Pessoa";

export default class Aluno {
  private _pessoa: Pessoa;
  private readonly _tipo: "Presencial" | "Ead";
  private readonly _turma: number;
  private _notas: number[] = [];
  private _media: number = 0;
  private _isAtivo: boolean = true;

  constructor(
    pessoa: Pessoa,
    tipo: "Presencial" | "Ead",
    turma: number,
    notas?: number[]
  ) {
    this._pessoa = pessoa;
    this._tipo = tipo;
    this._turma = turma;
    if (notas) this._notas = notas;
  }

  get pessoa() {
    return this._pessoa;
  }

  set pessoa(val: Pessoa) {
    this._pessoa = val;
  }

  get tipo() {
    return this._tipo;
  }

  get turma() {
    return this._turma;
  }

  get notas(): number[] {
    return this._notas;
  }

  set notas(val: number) {
    if (this._notas.length < 3) {
      this._notas.push(val);
    }
  }

  get media() {
    return this._media;
  }

  get isAtivo() {
    return this._isAtivo;
  }

  set isAtivo(val: boolean) {
    this._isAtivo = val;
  }

  public calcularMedia() {
    const soma = this._notas.reduce((acc, a) => acc + a, 0);
    this._media = soma / 3;
  }

  public toString(): string {
    return `Nome: ${this._pessoa.nome} | Turma: ${this._turma} | Email: ${
      this._pessoa.email
    } | Média:  ${this.media.toFixed(2)} | Status: ${
      this.isAtivo ? "ativo" : "inativo"
    }`;
  }
}
