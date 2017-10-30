export function Serializable(): any {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        target[propertyKey] = undefined
    }
}
export * from './data-sources'
export * from './use-cases'
export * from './application-error'
