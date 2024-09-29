export default class Pessoa {
  private _nome: string = "Exemplo";
  private _sobrenome: string = "Exemplo";
  private _email: string;
  private _nascimento: Date = new Date();
  //Classificação

  constructor(
    email: string,
    nome?: string,
    sobrenome?: string,
    nascimento?: Date
  ) {
    this._email = email;
    if (nome) this._nome = nome;
    if (sobrenome) this._sobrenome = sobrenome;
    if (nascimento) this._nascimento = nascimento;
  }

  get nome() {
    return this._nome;
  }

  set nome(val: string) {
    this._nome = val;
  }

  get sobrenome() {
    return this._sobrenome;
  }

  set sobrenome(val: string) {
    this._sobrenome = val;
  }

  get email() {
    return this._email;
  }

  set email(val: string) {
    this._email = val;
  }

  get nascimento() {
    return this._nascimento;
  }

  set nascimento(val: Date) {
    this._nascimento = val;
  }
}
