import Aluno from "./Aluno";

export default class Turma {
  public static MAX_ALUNOS = 10;
  public static MIN_ALUNOS = 5;
  private _alunos: Aluno[] = [];
  private _isAtivo: boolean = false;

  constructor(
    private readonly _codigo: number,
    private _tipo: "Presencial" | "Ead",
    private _descricao: string
  ) {
    if (this._codigo > 10) {
      throw new Error("Número maximo de turmas criadas!");
    }
  }

  public get codigo() {
    return this._codigo;
  }

  public get tipo() {
    return this._tipo;
  }

  public get descricao() {
    return this._descricao;
  }

  public set descricao(descricao: string) {
    this._descricao = descricao;
  }

  public get alunos() {
    return this._alunos;
  }

  public get isAtivo() {
    return this._isAtivo;
  }

  public set isAtivo(ativo: boolean) {
    this._isAtivo = ativo;
  }
}
