import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { DatasetDefinition, DatasetDefinitionLoadMatch, DatasetDefinitionUpdateData } from '../HoneycombTypes';
declare class DatasetDefinitionEntity extends HoneycombEntityBase<DatasetDefinition> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: DatasetDefinitionEntity): DatasetDefinitionEntity;
    load(this: any, reqmatch?: DatasetDefinitionLoadMatch, ctrl?: Control): Promise<DatasetDefinitionEntity>;
    update(this: any, reqdata?: DatasetDefinitionUpdateData, ctrl?: Control): Promise<DatasetDefinitionEntity>;
}
export { DatasetDefinitionEntity };
