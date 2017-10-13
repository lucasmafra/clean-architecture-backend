import { AuthenticatorServiceGateway, AuthorizerServiceGateway, MailerServiceGateway, PendingCompanyRepositoryGateway } from '../../gateways'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminApproveCompanyOwnerUseCase extends BaseAdminUseCase<IUseCaseDependencies, IUseCaseInput, void> {

    private EMAIL_FROM = 'no-reply@mytopshop.com'
    private EMAIL_SUBJECT = 'Seu cadastro foi aprovado'
    private EMAIL_BODY = 'Bem vindo a nossa plataforma'

    constructor(
        protected dependencies: IUseCaseDependencies,
    ) {
        super(dependencies.authorizerService)
    }

  public async buildUseCase(input: IUseCaseInput): Promise<void> {
    const pendingCompany = await this.validate(input.companyId)
    await this.dependencies.pendingCompanyRepository.approvePendingCompany(input.companyId)
    await this.dependencies.authenticatorService.confirmCompanyOwner(pendingCompany.companyOwnerEmail)

    return this.dependencies.mailerService.sendEmail(
        this.EMAIL_FROM,
        [pendingCompany.companyOwnerEmail],
        this.EMAIL_SUBJECT,
        this.EMAIL_BODY,
    )
  }

  private async validate(companyId: string): Promise<PendingCompanyRepositoryGateway.IPendingCompanyOutput> {
    const pendingCompany = await this.dependencies.pendingCompanyRepository.getPendingCompanyById(companyId)
    if (!pendingCompany) {
      throw new Error('No pending company with this id')
    }
    return Promise.resolve(pendingCompany)
  }
}

interface IUseCaseDependencies {
    authorizerService: AuthorizerServiceGateway.BaseAuthorizerService,
    authenticatorService: AuthenticatorServiceGateway.IAuthenticatorService,
    mailerService: MailerServiceGateway.IMailerService,
    pendingCompanyRepository: PendingCompanyRepositoryGateway.IPendingCompanyRepository,
}

interface IUseCaseInput {
    companyId: string
}
