import { ErrorType, MyTopShopError } from 'core'

export abstract class BaseUseCase<IUseCaseInput, IUseCaseOutput> {

    public abstract buildUseCase(input: IUseCaseInput): Promise<IUseCaseOutput>

    public async execute(input: IUseCaseInput): Promise<IUseCaseOutput> {
        try {
            const result = await this.buildUseCase(input)
            return result
        } catch (err) {
            console.log(err.stack)
            if (err instanceof MyTopShopError) {
                throw err
            }
            throw new MyTopShopError(ErrorType.GenericError)
        }
    }
}

export interface IUseCaseFactory<UseCase> {
    build(): UseCase
}
