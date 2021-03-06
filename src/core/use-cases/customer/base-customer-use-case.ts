import { ApplicationError, ApplicationErrorType } from 'core/application-error'
import { AuthorizerDataSource, IMyTopShopCredential, MyTopShopRole } from 'core/data-sources'
import { BaseUseCase } from '../base-use-case'

export abstract class BaseCustomerUseCase<IUseCaseInput, IUseCaseOutput> extends BaseUseCase<IUseCaseInput, IUseCaseOutput> {

    public credential: IMyTopShopCredential

    constructor(private authorizer: AuthorizerDataSource) {
        super()
    }

    public async execute(input: IUseCaseInput): Promise<IUseCaseOutput> {
        try {
            this.credential = await this.authorizer.authorizeByAllowedRoles([MyTopShopRole.Customer])
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
