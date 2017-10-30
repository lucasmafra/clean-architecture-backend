import { ApplicationError, ApplicationErrorType } from 'core/application-error'

export abstract class BaseUseCase<IUseCaseInput, IUseCaseOutput> {

    public abstract buildUseCase(input: IUseCaseInput): Promise<IUseCaseOutput>

    public async execute(input: IUseCaseInput): Promise<IUseCaseOutput> {
        try {
            const result = await this.buildUseCase(input)
            return result
        } catch (err) {
            console.log(err.stack)
            if (err instanceof ApplicationError) {
                throw err
            }
            throw new ApplicationError(ApplicationErrorType.GenericError)
        }
    }
}

export interface IUseCaseFactory<UseCase> {
    build(): UseCase
}
