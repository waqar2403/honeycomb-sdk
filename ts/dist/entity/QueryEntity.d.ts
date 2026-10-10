import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Query, QueryLoadMatch, QueryCreateData } from '../HoneycombTypes';
declare class QueryEntity extends HoneycombEntityBase<Query> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: QueryEntity): QueryEntity;
    load(this: any, reqmatch?: QueryLoadMatch, ctrl?: Control): Promise<QueryEntity>;
    create(this: any, reqdata?: QueryCreateData, ctrl?: Control): Promise<QueryEntity>;
}
export { QueryEntity };
