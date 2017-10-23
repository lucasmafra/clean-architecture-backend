import { AuthorizerService, IMyTopShopCredential, MyTopShopRole } from 'core/services'
import { BaseUseCase } from '../base-use-case'

export abstract class BaseCustomerUseCase<IUseCaseInput, IUseCaseOutput> extends BaseUseCase<IUseCaseInput, IUseCaseOutput> {

    public credential: IMyTopShopCredential

    constructor(private authorizer: AuthorizerService) {
        super()
    }

    public async execute(input: IUseCaseInput): Promise<IUseCaseOutput> {
        try {
            this.credential = await this.authorizer.authorizeByAllowedRoles([MyTopShopRole.Customer])
            const result = await this.buildUseCase(input)
            return result
        } catch (err) {
            console.log(err.stack)
            throw(err)
        }
    }
}
