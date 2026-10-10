import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { QueryAnnotation, QueryAnnotationLoadMatch, QueryAnnotationListMatch, QueryAnnotationCreateData, QueryAnnotationUpdateData, QueryAnnotationRemoveMatch } from '../HoneycombTypes';
declare class QueryAnnotationEntity extends HoneycombEntityBase<QueryAnnotation> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: QueryAnnotationEntity): QueryAnnotationEntity;
    load(this: any, reqmatch?: QueryAnnotationLoadMatch, ctrl?: Control): Promise<QueryAnnotationEntity>;
    list(this: any, reqmatch?: QueryAnnotationListMatch, ctrl?: Control): Promise<QueryAnnotationEntity[]>;
    create(this: any, reqdata?: QueryAnnotationCreateData, ctrl?: Control): Promise<QueryAnnotationEntity>;
    update(this: any, reqdata?: QueryAnnotationUpdateData, ctrl?: Control): Promise<QueryAnnotationEntity>;
    remove(this: any, reqmatch?: QueryAnnotationRemoveMatch, ctrl?: Control): Promise<QueryAnnotationEntity>;
}
export { QueryAnnotationEntity };
