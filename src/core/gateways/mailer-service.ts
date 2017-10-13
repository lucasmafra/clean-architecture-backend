export namespace MailerServiceGateway {

    export interface IMailerService {
        sendEmail(from: string, to: string[], subject: string, body: string): Promise<void>
    }

}
