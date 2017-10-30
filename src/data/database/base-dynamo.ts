import { DynamoDB } from 'aws-sdk'
import { DynamoToPromise } from './dynamo-to-promise'

export namespace OSDynamo {

    export class ORM<Model> {

            private dynamo: DynamoDB.DocumentClient
            private dynamoPromise: DynamoToPromise
            private tableName: string

            constructor(tableName: string) {
                if (process.env.isRemote) {
                    this.dynamo = new DynamoDB.DocumentClient({
                        region: process.env.region,
                        accessKeyId: process.env.accessKeyId,
                        secretAccessKey: process.env.secretAccessKey,
                    })
                } else {
                    this.dynamo = new DynamoDB.DocumentClient({
                        region: 'localhost',
                        endpoint: 'http://localhost:8000',
                    })
                }
                this.dynamoPromise = new DynamoToPromise(this.dynamo)
                this.tableName = tableName
            }

            public async get(keyValue: string, keyName?: string): Promise<Model | undefined> {
                try {
                    const input = this.buildGetItemInput(keyValue, keyName)
                    const result = await this.dynamoPromise.getItem(input)
                    if (result.Item) {
                        return this.mapToModel(result.Item)
                    }
                    return undefined
                } catch (err) {
                    throw err
                }
            }

            public async batchGet(keyValues: string[], keyName?: string): Promise<Model[]> {
                try {
                    const input = this.buildBatchGetItemInput(keyValues, keyName)
                    const result = await this.dynamoPromise.batchGetItem(input)
                    if (result.Responses && result.Responses[this.tableName]) {
                        return this.mapToModelCollection(result.Responses[this.tableName])
                    }
                    return new Array<Model>()
                } catch (err) {
                    throw err
                }
            }

            public async update(item: Partial<Model>, keyValue: string, keyName?: string): Promise<Model> {
                try {
                    const input = this.buildUpdateInput(item, keyValue, keyName)
                    const result = await this.dynamoPromise.update(input)
                    return this.mapToModel(result.Attributes as DynamoDB.AttributeMap)
                } catch (err) {
                    throw err
                }
            }

            public async put(item: Model, keyName?: string): Promise<Model> {
                try {
                    const input = this.buildPutItemInput(item)
                    await this.dynamoPromise.put(input)
                    return item
                } catch (err) {
                    throw err
                }
            }

            public async batchPut(items: Model[]): Promise<Model[]> {
                try {
                    const input = this.buildBatchWriteInput(items)
                    await this.dynamoPromise.batchWrite(input)
                    return items
                } catch (err) {
                    throw err
                }
            }

            public async delete(keyValue: string, keyName?: string): Promise<Model> {
                try {
                    const input = this.buildDeleteInput(keyValue, keyName)
                    const result = await this.dynamoPromise.delete(input)
                    return this.mapToModel(result.Attributes as DynamoDB.AttributeMap)
                } catch (err) {
                    throw err
                }
            }

            public async batchDelete(keys: Array<{}>): Promise<void> {
                try {
                    const input = this.buildBatchWriteDeleteInput(keys)
                    return this.dynamoPromise.batchWrite(input)
                } catch (err) {
                    throw(err)
                }
            }

            public async scan(): Promise<Model[]> {
                try {
                    const input = this.buildScanInput()
                    const result = await this.dynamoPromise.scan(input)
                    if (result.Items) {
                        return this.mapToModelCollection(result.Items)
                    }
                    return new Array<Model>()
                } catch (err) {
                    throw (err)
                }
            }

            public async query(keyConditionExpression: string, expressionAttributeValues: {}, indexName?: string): Promise<Model[]> {
                try {
                    const input = this.buildQueryInput(keyConditionExpression, expressionAttributeValues, indexName)
                    const result = await this.dynamoPromise.query(input)
                    if (result.Items) {
                        return this.mapToModelCollection(result.Items)
                    }
                    return new Array<Model>()
                } catch (err) {
                    throw (err)
                }
            }

            private mapToModel(attributeMap: DynamoDB.AttributeMap): Model {
                const result = {} as Model
                for (const key in attributeMap) {
                    result[key] = attributeMap[key]
                }
                return result
            }

            private mapToModelCollection(attributesMap: DynamoDB.AttributeMap[]): Model[] {
                const result = new Array<Model>()
                for (const attributeMap of attributesMap) {
                    result.push(this.mapToModel(attributeMap))
                }
                return result
            }

            private buildPutItemInput(item: Model, keyName?: string): DynamoDB.PutItemInput {
                const itemMap = {}
                for (const key in item) {
                    itemMap[key as string] = item[key]
                }
                return {
                    TableName: this.tableName,
                    Item: itemMap,
                    // ConditionExpression: `attribute_not_exists(${keyName})`,
                }
            }

            private buildBatchWriteInput(items: Model[]): DynamoDB.BatchWriteItemInput {
                const result = []
                for (const item of items) {
                    const object = {}
                    for (const property of Object.keys(item)) {
                        if (item[property] !== undefined) {
                           object[property] = item[property]
                        }
                    }
                    result.push({
                        PutRequest: {
                            Item: object,
                        },
                    })
                }
                const requestItems = {}
                requestItems[this.tableName] = result
                return {
                    RequestItems: requestItems,
                }
            }

            private buildBatchWriteDeleteInput(keys: Array<{}>): DynamoDB.BatchWriteItemInput {
                const result = []
                for (const key of keys) {
                    result.push({
                        DeleteRequest: {
                            Key: key,
                        },
                    })
                }
                const requestItems = {}
                requestItems[this.tableName] = result
                return {
                    RequestItems: requestItems,
                    ReturnConsumedCapacity: 'TOTAL',
                    ReturnItemCollectionMetrics: 'SIZE',
                }
            }

            private buildUpdateInput(item: Partial<Model>, keyValue: string, keyName?: string): DynamoDB.UpdateItemInput {
                const ExpressionAttributeNames = {}
                const ExpressionAttributeValues = {}
                let UpdateExpression = 'SET'

                for (const property of Object.keys(item)) {
                    if ((item as {})[property] !== undefined) {
                        const attributeName = `#${property}`
                        const attributeValue = `:${property}`
                        ExpressionAttributeNames[attributeName] = property
                        ExpressionAttributeValues[attributeValue] = (item as {})[property]
                        UpdateExpression += ` ${attributeName} = ${attributeValue},`
                    }
                }
                UpdateExpression = UpdateExpression.slice(0, UpdateExpression.length - 1) // removing last semicolon of UpdateExpression object, otherwise dynamo doesn't accept it
                const key = {}
                key[keyName || 'id'] = keyValue
                return {
                    ExpressionAttributeNames,
                    ExpressionAttributeValues,
                    Key: key,
                    TableName: this.tableName,
                    ReturnValues: 'ALL_NEW',
                    UpdateExpression,
                } as any
            }

            private buildGetItemInput(keyValue: string, keyName?: string): DynamoDB.GetItemInput {
                const key = {}
                keyName = keyName || 'id'
                key[keyName] = keyValue
                return {
                    TableName: this.tableName,
                    Key: key,
                }
            }

            private buildBatchGetItemInput(keyValues: string[], keyName?: string): DynamoDB.BatchGetItemInput {
                const keys = []
                for (const keyValue of keyValues) {
                    const key = {}
                    key[keyName || 'id'] = keyValue
                    keys.push(key)
                }
                const table = {}
                table[this.tableName] = {
                    Keys: keys,
                }
                return {
                    RequestItems: table,
                }
            }

            private buildScanInput(): DynamoDB.ScanInput {
                return {
                    TableName: this.tableName,
                }
            }

            private buildDeleteInput(keyValue: string, keyName?: string): DynamoDB.DeleteItemInput {
                const key = {}
                key[keyName || 'id'] = keyValue
                return {
                    TableName: this.tableName,
                    Key: key,
                    ReturnValues: 'ALL_OLD', // important to know retrieve previous item so that we know if the id is valid
                }
            }

            private buildQueryInput(keyConditionExpression: string, expressionAttributeValues: {}, indexName?: string): DynamoDB.QueryInput {
                const input: DynamoDB.QueryInput = {
                    TableName: this.tableName,
                    KeyConditionExpression: keyConditionExpression,
                    ExpressionAttributeValues: expressionAttributeValues,
                }
                if (indexName) {
                    input.IndexName = indexName
                }
                return input
            }

        }

    export interface IModelMetadata {
        primaryKey: string
        rangeKey?: string
        globalIndexes?: Array<{
            name: string
            primaryKey: string
            rangeKey?: string,
        }>
    }

    export function define<Model>(tableName: string): ORM<Model>  {
            return new ORM<Model>(tableName)
    }
}
