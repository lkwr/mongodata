// deno-lint-ignore-file no-explicit-any

// Check https://www.mongodb.com/docs/atlas/api/data-api-resources/

type QueryFilter = any;

// findOne
export interface FindOneQuery {
    filter?: QueryFilter;
    projection?: any;
}
export interface FindOneResponse<T> {
    document: T | null;
}

// find
export interface FindQuery {
    filter?: QueryFilter;
    projection?: any;
    sort?: any;
    limit?: number;
    skip?: number;
}
export interface FindResponse<T> {
    documents: Array<T>;
}

// insertOne
export interface InsertOneQuery<T> {
    document: T;
}
export interface InsertOneResponse {
    insertedId: string;
}

// insertMany
export interface InsertManyQuery<T> {
    documents: Array<T>;
}
export interface InsertManyResponse {
    insertedIds: Array<string>;
}

// updateOne
export interface UpdateOneQuery {
    filter: QueryFilter;
    update: any;
    upsert?: boolean;
}
export interface UpdateOneResponse {
    matchedCount: number;
    modifiedCount: number;
    upsertedId?: string;
}

// updateMany
export interface UpdateManyQuery {
    filter: QueryFilter;
    update: any;
    upsert?: boolean;
}
export interface UpdateManyResponse {
    matchedCount: number;
    modifiedCount: number;
    upsertedId?: string;
}

// replaceOne
export interface ReplaceOneQuery<T> {
    filter: QueryFilter;
    replacement: T;
    upsert?: boolean;
}
export interface ReplaceOneResponse {
    matchedCount: number;
    modifiedCount: number;
    upsertedId?: string;
}

// deleteOne
export interface DeleteOneQuery {
    filter: QueryFilter;
}
export interface DeleteOneResponse {
    deletedCount: number;
}

// deleteMany
export interface DeleteManyQuery {
    filter: QueryFilter;
}
export interface DeleteManyResponse {
    deletedCount: number;
}
