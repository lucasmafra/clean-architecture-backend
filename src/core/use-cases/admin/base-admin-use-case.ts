import { AuthorizerService, IMyTopShopCredential, MyTopShopRole } from 'core/services'
import { BaseUseCase } from '../base-use-case'

export abstract class BaseAdminUseCase<IUseCaseInput, IUseCaseOutput> extends BaseUseCase<IUseCaseInput, IUseCaseOutput> {

    private credential: IMyTopShopCredential

    constructor(private authorizerGateway: AuthorizerService) {
        super()
    }

    public async execute(input: IUseCaseInput): Promise<IUseCaseOutput> {
        try {
            this.credential = await this.authorizerGateway.authorizeByAllowedRoles([MyTopShopRole.Admin])
            const result = await this.buildUseCase(input)
            return result
        } catch (err) {
            console.log(err.stack)
            throw(err)
        }
    }
}
