export class AppError extends Error {
  constructor() {
    super('Ocorreu um erro durante sua requisição');
    this.name = 'AppError';
  }
}
