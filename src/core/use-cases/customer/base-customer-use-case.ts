import { AuthorizerServiceGateway } from '../../gateways'
import { BaseUseCase } from '../base-use-case'

export abstract class BaseCustomerUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> extends BaseUseCase<IUseCaseDependencies, IUseCaseInput, IUseCaseOutput> {

    private credential: AuthorizerServiceGateway.IMyTopShopCredential

    constructor(private authorizerGateway: AuthorizerServiceGateway.BaseAuthorizerService) {
        super()
    }

    public async execute(input: IUseCaseInput): Promise<IUseCaseOutput> {
        try {
            this.credential = await this.authorizerGateway.authorizeByAllowedRoles([AuthorizerServiceGateway.MyTopShopRole.Customer])
            const result = await this.buildUseCase(input)
            return result
        } catch (err) {
            console.log(err.stack)
            throw(err)
        }
    }
}
