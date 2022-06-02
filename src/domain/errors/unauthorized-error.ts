export class UnauthorizedError extends Error {
  constructor() {
    super('Credenciais Inválidas');
    this.name = 'UnauthorizedError';
  }
}
