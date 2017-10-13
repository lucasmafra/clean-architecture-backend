export namespace PostRepositoryGateway {

    export interface IPostRepository {
        getPostsByIds(ids: string[]): Promise<IPostOutput[]>
        getAllPosts(): Promise<IPostOutput[]>
        getPostById(id: string): Promise<IPostOutput | undefined>
        createCampaign(campaign: ICreatePostCampaignInput): Promise<IPostCampaignOutput>
        createSale(sale: ICreatePostSaleInput): Promise<IPostSaleOutput>
        createAdvertisement(advertisement: ICreatePostAdvertisementInput): Promise<IPostAdvertisementOutput>
        updateCampaign(id: string, campaign: IUpdatePostCampaignInput): Promise<IPostCampaignOutput>
        updateSale(id: string, sale: IUpdatePostSaleInput): Promise<IPostSaleOutput>
        updateAdvertisement(id: string, advertisement: IUpdatePostAdvertisementInput): Promise<IPostAdvertisementOutput>
        deletePost(id: string): Promise<void>
    }

    export enum PostType {
        Campaign = 'campaign',
        Sale = 'sale',
        Advertisement = 'advertisement',
    }

    export interface IPostOutput {
        id: string
        type: PostType
        companyId: string
        companyName: string
        companyLogo: string
        description: string
        creationDate: Date
        expirationDate: Date
        photo?: string
    }

    export interface IPostSaleOutput extends IPostOutput {
        productName: string
        discount: string
    }

    export interface IPostCampaignOutput extends IPostOutput {
        campaignIcon: string
        campaignText: string
    }

    export interface IPostAdvertisementOutput extends IPostOutput {
        photo: string
    }

    export interface ICreatePostInput {
        type: PostType
        companyId: string
        companyName: string
        companyLogo: string
        description: string
        creationDate: Date
        expirationDate: Date
    }

    export interface ICreatePostSaleInput extends ICreatePostInput {
        productName: string
        discount: string
    }

    export interface ICreatePostCampaignInput extends ICreatePostInput {
        campaignIcon: string
        campaignText: string
    }

    export interface ICreatePostAdvertisementInput extends ICreatePostInput {
        photo: string
    }

    export interface IUpdatePostInput {
        companyName?: string
        companyLogo?: string
        description?: string
        expirationDate?: Date
        photo?: string
    }

    export interface IUpdatePostSaleInput extends IUpdatePostInput {
        productName?: string
        discount?: string
    }

    export interface IUpdatePostCampaignInput extends IUpdatePostInput {
        campaignIcon?: string
        campaignText?: string
    }

    export interface IUpdatePostAdvertisementInput extends IUpdatePostInput {
        photo?: string
    }

}
