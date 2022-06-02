export class NotFoundError extends Error {
  constructor() {
    super('O recurso solicitado não foi encontrado');
    this.name = 'NotFoundError';
  }
}
