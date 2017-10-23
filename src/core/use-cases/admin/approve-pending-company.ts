import { ICompanyRepository } from 'core/repositories'
import { AuthorizerService, IAuthenticatorService, IMailerService } from 'core/services'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminApprovePendingCompany extends BaseAdminUseCase<IAdminApprovePendingCompanyInput, void> {

    private EMAIL_FROM = 'no-reply@mytopshop.com'
    private EMAIL_SUBJECT = 'Seu cadastro foi aprovado'
    private EMAIL_BODY = 'Bem vindo a nossa plataforma'

    constructor(
        protected authorizerService: AuthorizerService,
        protected authenticatorService: IAuthenticatorService,
        protected mailerService: IMailerService,
        protected companyRepository: ICompanyRepository,
    ) {
        super(authorizerService)
    }

  public async buildUseCase(input: IAdminApprovePendingCompanyInput): Promise<void> {
    const pendingCompany = await this.companyRepository.getPendingCompanyById(input.companyId)
    await this.companyRepository.approvePendingCompany(input.companyId)
    await this.authenticatorService.confirmCompanyOwner(pendingCompany.companyOwnerEmail)

    return this.mailerService.sendEmail(
        this.EMAIL_FROM,
        [pendingCompany.companyOwnerEmail],
        this.EMAIL_SUBJECT,
        this.EMAIL_BODY,
    )
  }

}

export interface IAdminApprovePendingCompanyInput {
    companyId: string
}
