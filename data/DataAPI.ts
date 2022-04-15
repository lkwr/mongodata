import * as QT from './QueryTypes.ts';

export class DataAPI {
    private baseUrl;

    constructor(private options: DataAPIOptions) {
        this.baseUrl = `https://data.mongodb-api.com/app/${options.appId}/endpoint/data/beta/`;
    }

    getDatabase(database: string): Database {
        return new Database({ ...this.options, ...{ baseUrl: this.baseUrl, database } });
    }
}

export class Database {
    constructor(private options: DatabaseOptions) {}

    getCollection<T>(collection: string): Collection<T> {
        return new Collection({ ...this.options, ...{ collection } });
    }
}

export class Collection<T> {
    constructor(private options: CollectionOptions) {}

    async findOne(query: QT.FindOneQuery): Promise<T | null> {
        return (await this.makeFetch<QT.FindOneResponse<T>>('action/findOne', query)).document;
    }

    async find(query: QT.FindQuery): Promise<T[] | null> {
        return (await this.makeFetch<QT.FindResponse<T>>('action/find', query)).documents;
    }

    async insertOne(query: QT.InsertOneQuery<T>): Promise<string> {
        return (await this.makeFetch<QT.InsertOneResponse>('action/insertOne', query))
            .insertedId;
    }

    async insertMany(query: QT.InsertManyQuery<T>): Promise<Array<string>> {
        return (await this.makeFetch<QT.InsertManyResponse>('action/insertMany', query))
            .insertedIds;
    }

    async updateOne(query: QT.UpdateOneQuery): Promise<QT.UpdateOneResponse> {
        return await this.makeFetch<QT.UpdateOneResponse>('action/updateOne', query);
    }

    async updateMany(query: QT.UpdateManyQuery): Promise<QT.UpdateManyResponse> {
        return await this.makeFetch<QT.UpdateManyResponse>('action/updateMany', query);
    }

    async replaceOne(query: QT.ReplaceOneQuery<T>): Promise<QT.ReplaceOneResponse> {
        return await this.makeFetch<QT.ReplaceOneResponse>('action/replaceOne', query);
    }

    async deleteOne(query: QT.DeleteOneQuery): Promise<QT.DeleteOneResponse> {
        return await this.makeFetch<QT.DeleteOneResponse>('action/deleteOne', query);
    }

    async deleteMany(query: QT.DeleteManyQuery) {
        return await this.makeFetch<QT.DeleteManyResponse>('action/deleteMany', query);
    }

    // deno-lint-ignore no-explicit-any
    private async makeFetch<R>(endpoint: string, data: Record<string, any>): Promise<R> {
        const response = await fetch(this.options.baseUrl + endpoint, {
            headers: [
                ['content-type', 'application/json'],
                ['access-control-request-headers', '*'],
                ['api-key', this.options.key],
            ],
            body: JSON.stringify({
                ...{
                    dataSource: this.options.dataSource,
                    database: this.options.database,
                    collection: this.options.collection,
                },
                ...data,
            }),
            method: 'POST',
        });
        return await response.json();
    }
}

export interface DataAPIOptions {
    appId: string;
    key: string;
    dataSource: string;
}

type DatabaseOptions = DataAPIOptions & { baseUrl: string; database: string };

type CollectionOptions = DatabaseOptions & { collection: string };
