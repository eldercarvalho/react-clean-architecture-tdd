import { Either } from 'fp-ts/lib/Either';

export interface IUsecase<P, T> {
  execute(params: P): Promise<Either<Error, T>>;
  execute(): Promise<Either<Error, T>>;
}
