export class Usuario {
  nome: string
  idade: number
  senha: string

  constructor(nome: string, idade: number, senha: string) {
    this.nome = nome
    this.idade = idade
    this.senha = senha
  }

  apresentar(): string {
    return `Olá, ${this.nome}! Você tem ${this.idade} anos.`
  }

  verificarSenha(tentativa: string): boolean {
    return tentativa === this.senha
  }

  redefinirSenha(novaSenha: string): boolean {
    if (!novaSenha.trim()) return false

    this.senha = novaSenha
    return true
  }
}