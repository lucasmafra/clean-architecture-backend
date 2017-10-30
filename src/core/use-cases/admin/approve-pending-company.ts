import { AuthorizerDataSource, IAuthenticatorDataSource, ICompanyDataSource, IMailerDataSource } from 'core'
import { BaseAdminUseCase } from './base-admin-use-case'

export class AdminApprovePendingCompany extends BaseAdminUseCase<IAdminApprovePendingCompanyInput, void> {

    private EMAIL_FROM = 'no-reply@mytopshop.com'
    private EMAIL_SUBJECT = 'Seu cadastro foi aprovado'
    private EMAIL_BODY = 'Bem vindo a nossa plataforma'

    constructor(
        protected authorizerDataSource: AuthorizerDataSource,
        protected authenticatorDataSource: IAuthenticatorDataSource,
        protected mailerDataSource: IMailerDataSource,
        protected companyDataSource: ICompanyDataSource,
    ) {
        super(authorizerDataSource)
    }

  public async buildUseCase(input: IAdminApprovePendingCompanyInput): Promise<void> {
    const pendingCompany = await this.companyDataSource.getPendingCompanyById(input.companyId)
    await this.companyDataSource.approvePendingCompany(input.companyId)
    await this.authenticatorDataSource.confirmCompanyOwner(pendingCompany.companyOwnerEmail)

    return this.mailerDataSource.sendEmail(
        this.EMAIL_FROM,
        [pendingCompany.companyOwnerEmail],
        this.EMAIL_SUBJECT,
        this.EMAIL_BODY,
    )
  }

}

export class IAdminApprovePendingCompanyInput {
    public companyId: string
}
