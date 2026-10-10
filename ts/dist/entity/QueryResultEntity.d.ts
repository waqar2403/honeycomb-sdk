import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { QueryResult, QueryResultLoadMatch, QueryResultCreateData } from '../HoneycombTypes';
declare class QueryResultEntity extends HoneycombEntityBase<QueryResult> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: QueryResultEntity): QueryResultEntity;
    load(this: any, reqmatch?: QueryResultLoadMatch, ctrl?: Control): Promise<QueryResultEntity>;
    create(this: any, reqdata?: QueryResultCreateData, ctrl?: Control): Promise<QueryResultEntity>;
}
export { QueryResultEntity };
