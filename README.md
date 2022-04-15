### NOTICE: This project is currently experimental and may not work properly!

# MongoData

#### A lightweight wrapper around MongoDB's [DataAPI](https://www.mongodb.com/developer/quickstart/atlas_data_api_introduction/).

![Made for Deno](https://img.shields.io/badge/made%20for-Deno-6B82F6?style=flat-square)
![Licence MIT](https://img.shields.io/github/license/lkwr/mongodata?color=blue&style=flat-square)
![Latest version](https://img.shields.io/github/v/tag/lkwr/mongodata?color=informational&label=version&sort=semver&style=flat-square)
![Latest commit](https://img.shields.io/github/last-commit/lkwr/dapi?style=flat-square)
![Status WIP](https://img.shields.io/badge/status-WIP-red?style=flat-square)

## Key Features

-   Made for [Deno](https://deno.land)
    -   works with [Deno Deploy](https://deno.com/deploy)
-   Pure Typescript
-   Lightweight
-   Zero dependencies

## How To Use

```ts
import { DataAPI } from 'https://deno.land/x/mongodata/mod.ts';

const api = new DataAPI({
    appId: '<APP ID>',
    dataSource: '<CLUSTER NAME>',
    key: '<API KEY>',
});

const database = api.getDatabase('<DATABASE>');
const collection = database.getCollection('<COLLECTION>');

const doc = { name: 'Bob', age: 30 };

console.log(await collection.insertOne({ document: doc }));
// 0123456789abcdef01234567

console.log(await collection.findOne({ filter: { name: 'Bob' } }));
// { _id: "0123456789abcdef01234567", name: "Bob", age: 30 }

console.log(await collection.deleteOne({ filter: { name: 'Bob' } }));
// { deletedCount: 1 }
```

## Known issues

-   [WIP] Currently you can not query BSON types (like ObjectIds)!

## Contributing

Feel free to send merge requests!

## You may also like...

-   [deno_mongo](https://github.com/denodrivers/deno_mongo) - MongoDB database driver developed for Deno.

## License

MIT

---

> Homepage [luke.id](https://luke.id) &nbsp;&middot;&nbsp;
> GitHub [@lkwr](https://github.com/lkwr) &nbsp;&middot;&nbsp;
> Twitter [@wlkrlk](https://twitter.com/wlkrlk)
