import { Injector } from 'di-typescript'
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql/type'
import * as AdminFactories from 'presentation/factories/admin'
import { CompanyOwnerView } from './types'

const Queries = new GraphQLObjectType({
  name: 'AdminQueries',
  fields: {
    companyOwner: {
      type: CompanyOwnerView,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, {id}, context) => {
        const useCase = new Injector().get(AdminFactories.AdminGetCompaniesUseCaseFactory).build()
        return useCase.execute(null)
      },
    },
    companyOwners: {
        type: CompanyOwnerView,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (parent, {id}, context) => {
          const useCase = new Injector().get(AdminFactories.AdminGetCompaniesUseCaseFactory).build()
          return useCase.execute(null)
        },
    },
    company: {
        type: CompanyOwnerView,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (parent, {id}, context) => {
          const useCase = new Injector().get(AdminFactories.AdminGetCompaniesUseCaseFactory).build()
          return useCase.execute(null)
        },
    },
    companies: {
        type: CompanyOwnerView,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (parent, {id}, context) => {
          const useCase = new Injector().get(AdminFactories.AdminGetCompaniesUseCaseFactory).build()
          return useCase.execute(null)
        },
    },
    pendingCompanies: {
        type: CompanyOwnerView,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (parent, {id}, context) => {
          const useCase = new Injector().get(AdminFactories.AdminGetCompaniesUseCaseFactory).build()
          return useCase.execute(null)
        },
    },
  },
})

const Mutations = new GraphQLObjectType({
  name: 'AdminMutations',
  fields: {
    createCategories: {
        type: CompanyOwnerView,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (parent, {id}, context) => {
          const useCase = new Injector().get(AdminFactories.AdminGetCompaniesUseCaseFactory).build()
          return useCase.execute(null)
        },
    },
    createSubcategory: {
        type: CompanyOwnerView,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (parent, {id}, context) => {
          const useCase = new Injector().get(AdminFactories.AdminGetCompaniesUseCaseFactory).build()
          return useCase.execute(null)
        },
    },
    updateCategory: {
        type: CompanyOwnerView,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (parent, {id}, context) => {
          const useCase = new Injector().get(AdminFactories.AdminGetCompaniesUseCaseFactory).build()
          return useCase.execute(null)
        },
    },
    updateSubcategory: {
        type: CompanyOwnerView,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (parent, {id}, context) => {
          const useCase = new Injector().get(AdminFactories.AdminGetCompaniesUseCaseFactory).build()
          return useCase.execute(null)
        },
    },
    deleteCategory: {
        type: CompanyOwnerView,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (parent, {id}, context) => {
          const useCase = new Injector().get(AdminFactories.AdminGetCompaniesUseCaseFactory).build()
          return useCase.execute(null)
        },
    },
    deleteSubcategory: {
        type: CompanyOwnerView,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (parent, {id}, context) => {
          const useCase = new Injector().get(AdminFactories.AdminGetCompaniesUseCaseFactory).build()
          return useCase.execute(null)
        },
    },
    approveCompanyOwner: {
        type: CompanyOwnerView,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (parent, {id}, context) => {
          const useCase = new Injector().get(AdminFactories.AdminGetCompaniesUseCaseFactory).build()
          return useCase.execute(null)
        },
    },
  },
})

export const AdminQueries = new GraphQLObjectType({
  name: 'AdminQueries',
  fields: {
    AdminQueries: {
      type: Queries,
      resolve: () => true, // workaround for schema group in graphql
    },
  },
})

export const AdminMutations = new GraphQLObjectType({
  name: 'AdminMutations',
  fields: {
    AdminMutations: {
      type: Mutations,
      resolve: () => true, // workaround for schema group in graphql
    },
  },
})
