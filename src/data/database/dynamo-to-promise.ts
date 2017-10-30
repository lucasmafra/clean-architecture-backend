import * as AWS from 'aws-sdk'
import { DynamoDB } from 'aws-sdk'

export class DynamoToPromise {

    constructor(private dynamo: DynamoDB.DocumentClient) { }

    public async scan(params: DynamoDB.ScanInput): Promise<DynamoDB.ScanOutput> {
        return new Promise((resolve, reject) => {
            this.dynamo.scan( params, (err: AWS.AWSError, data: DynamoDB.DocumentClient.ScanOutput) => {
                if (err) {
                    return reject(err)
                }
                return resolve(data)
            })
        })
    }

    public async getItem(params: DynamoDB.GetItemInput): Promise<DynamoDB.GetItemOutput> {
        return new Promise((resolve, reject) => {
            this.dynamo.get( params, (err: AWS.AWSError, data: DynamoDB.DocumentClient.GetItemOutput) => {
                if (err) {
                    return reject(err)
                }
                return resolve(data)
            })
        })
    }

    public async put(params: DynamoDB.PutItemInput): Promise<DynamoDB.PutItemOutput> {
        return new Promise((resolve, reject) => {
            this.dynamo.put( params, (err: AWS.AWSError, data: DynamoDB.DocumentClient.GetItemOutput) => {
                if (err) {
                    return reject(err)
                }
                return resolve(data)
            })
        })
    }

    public async update(params: DynamoDB.UpdateItemInput): Promise<DynamoDB.UpdateItemOutput> {
            return new Promise((resolve, reject) => {
            this.dynamo.update( params, (err: AWS.AWSError, data: DynamoDB.DocumentClient.UpdateItemOutput) => {
                if (err) {
                    return reject(err)
                }
                return resolve(data)
            })
        })
    }

    public async delete(params: DynamoDB.DeleteItemInput): Promise<DynamoDB.DeleteItemOutput> {
        return new Promise((resolve, reject) => {
            this.dynamo.delete( params, (err: AWS.AWSError, data: DynamoDB.DocumentClient.DeleteItemOutput) => {
                if (err) {
                    return reject(err)
                }
                return resolve(data)
            })
        })
    }

    public async batchWrite(batchWriteInput: DynamoDB.BatchWriteItemInput, parallelBatches?: number,
                            itemsPerBatch?: number, packageDelay?: number, retryDelay?: number): Promise<void> {

        const ITEMS_PER_BATCH = itemsPerBatch || 25
        const PACKAGE_DELAY = packageDelay || 200
        const RETRY_DELAY = retryDelay || 200
        const MAX_RETRIES = 10

        for (const table in batchWriteInput.RequestItems) {
            let promiseArray: any[] = []
            const PARALLEL_BATCHES = parallelBatches || Math.ceil(batchWriteInput.RequestItems[table].length / ITEMS_PER_BATCH)
            let remainingRequests = batchWriteInput.RequestItems[table]
            while (remainingRequests.length) {
                const requestsToSend = remainingRequests.slice(0, ITEMS_PER_BATCH)
                const batchWriteToSend: DynamoDB.BatchWriteItemInput = { RequestItems : {} }
                batchWriteToSend.RequestItems[table] = requestsToSend
                if (requestsToSend && requestsToSend.length) {
                    batchWriteToSend.RequestItems[table] = requestsToSend
                }
                promiseArray.push(this.singleBatchWrite(batchWriteToSend))
                remainingRequests = remainingRequests.slice(ITEMS_PER_BATCH)
                // if the max parallel batches has been reached, resolve promises
                if (promiseArray.length === PARALLEL_BATCHES) {
                    let currentTry = 0
                    while (promiseArray.length > 0) {
                        try {
                            const responses = await Promise.all(promiseArray)
                            // batches written successfully, reset promises
                            promiseArray = []
                            // check for any unproccessed items
                            responses.map((response) => {
                                if (response.UnprocessedItems.RequestItems) {
                                    // unprocessed item detected, add it to promise again
                                    promiseArray.push(this.singleBatchWrite(response.UnprocessedItems))
                                }
                            })
                            // wait before continuing loop
                            await this.sleep(PACKAGE_DELAY)
                        } catch (err) {
                            if (err.code === 'ProvisionedThroughputExceededException') {
                                // table writing capacity was exceeded
                                if (currentTry === MAX_RETRIES) {
                                // retry limit reached, give up on the current package of batches
                                    promiseArray = []
                                    break
                                }
                                // retry to send all batches
                                currentTry++
                                // apply exponential backoff
                                await this.sleep(RETRY_DELAY * currentTry)
                                continue
                            } else {
                                // unknown Error
                                throw(err)
                            }
                        }
                    }
                }
            }
        }
    }

    public async batchGetItem(batchGetInput: DynamoDB.BatchGetItemInput, parallelBatches?: number,
                              itemsPerBatch?: number, packageDelay?: number, retryDelay?: number): Promise<DynamoDB.BatchGetItemOutput> {

        const ITEMS_PER_BATCH = itemsPerBatch || 100
        const PACKAGE_DELAY = packageDelay || 200
        const RETRY_DELAY = retryDelay || 200
        const MAX_RETRIES = 10
        const result: DynamoDB.BatchGetItemOutput = { Responses: {} }

        for (const table in batchGetInput.RequestItems) {
            let promiseArray: any[] = []
            const PARALLEL_BATCHES = parallelBatches || Math.ceil(batchGetInput.RequestItems[table].Keys.length / ITEMS_PER_BATCH)
            let remainingRequests = batchGetInput.RequestItems[table].Keys
            while (remainingRequests.length) {
                const requestsToSend = remainingRequests.slice(0, ITEMS_PER_BATCH)
                if (requestsToSend && requestsToSend.length) {
                    const batchGetToSend: DynamoDB.BatchGetItemInput = { RequestItems: {} }
                    batchGetToSend.RequestItems[table] = { Keys: requestsToSend }
                    promiseArray.push(this.singleBatchGetItem(batchGetToSend))
                }
                remainingRequests = remainingRequests.slice(ITEMS_PER_BATCH)
                // if the max parallel batches has been reached, resolve promises
                if (promiseArray.length === PARALLEL_BATCHES) {
                    let currentTry = 0
                    while (promiseArray.length > 0) {
                        try {
                            const responses = await Promise.all(promiseArray)
                            // batches written successfully, reset promises
                            promiseArray = []
                            // check for any unproccessed items
                            responses.map((response) => {
                                if (result.Responses) {
                                    if (result.Responses[table]) {
                                    result.Responses[table].concat(response.Responses[table])
                                    } else {
                                    result.Responses[table] = response.Responses[table]
                                    }
                                }
                                if (response.UnprocessedKeys.RequestItems) {
                                // unprocessed item detected, add it to promise again
                                    promiseArray.push(this.singleBatchGetItem(response.UnprocessedItems))
                                }
                            })
                            // wait before continuing loop
                            await this.sleep(PACKAGE_DELAY)
                        } catch (err) {
                            if (err.code === 'ProvisionedThroughputExceededException') {
                                // table writing capacity was exceeded
                                if (currentTry === MAX_RETRIES) {
                                    // retry limit reached, give up on the current package of batches
                                    promiseArray = []
                                    break
                                }
                                // retry to send all batches
                                currentTry++
                                // apply exponential backoff
                                await this.sleep(RETRY_DELAY * currentTry)
                                continue
                            } else {
                                // unknown Error
                                throw(err)
                            }
                        }
                    }
                }
            }
        }
        return Promise.resolve(result)
    }

    public async query(queryInput: DynamoDB.QueryInput): Promise<DynamoDB.QueryOutput> {

        const query = queryInput
        let items: any[] = []
        let result: any = {
            LastEvaluatedKey: 'placeHolder',
        }

        while (result.LastEvaluatedKey) {
            try {
                result = await this.singleQuery(query)
                queryInput.ExclusiveStartKey = undefined
                items = items.concat(result.Items)
                if (result.LastEvaluatedKey) {
                    queryInput.ExclusiveStartKey = result.LastEvaluatedKey
                }
            } catch (err) {
                throw(err)
            }
        }
        result.Items = items
        return result
    }

    private async singleBatchGetItem(params: DynamoDB.BatchGetItemInput): Promise<DynamoDB.BatchGetItemOutput> {
        return new Promise((resolve, reject) => {
            this.dynamo.batchGet( params, (err: AWS.AWSError, data: DynamoDB.DocumentClient.BatchGetItemOutput) => {
                if (err) {
                return reject(err)
                }
                return resolve(data)
            })
        })
    }

    private async singleBatchWrite(params: DynamoDB.BatchWriteItemInput): Promise<DynamoDB.BatchWriteItemOutput> {
        return new Promise((resolve, reject) => {
            this.dynamo.batchWrite( params, (err: AWS.AWSError, data: DynamoDB.DocumentClient.BatchWriteItemOutput) => {
                if (err) {
                return reject(err)
                }
                return resolve(data)
            })
        })
    }

    private async singleQuery(params: DynamoDB.QueryInput): Promise<DynamoDB.QueryOutput> {
        return new Promise((resolve, reject) => {
            this.dynamo.query( params, (err: AWS.AWSError, data: DynamoDB.DocumentClient.QueryOutput) => {
                if (err) {
                return reject(err)
                }
                return resolve(data)
            })
        })
    }

    private sleep(ms: any) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

}

export interface Iteste extends DynamoDB.AttributeDefinition {
    id: string
    teste: number
}
