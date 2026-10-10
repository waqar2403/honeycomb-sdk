import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Dataset, DatasetLoadMatch, DatasetListMatch, DatasetCreateData, DatasetUpdateData, DatasetRemoveMatch } from '../HoneycombTypes';
declare class DatasetEntity extends HoneycombEntityBase<Dataset> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: DatasetEntity): DatasetEntity;
    load(this: any, reqmatch?: DatasetLoadMatch, ctrl?: Control): Promise<DatasetEntity>;
    list(this: any, reqmatch?: DatasetListMatch, ctrl?: Control): Promise<DatasetEntity[]>;
    create(this: any, reqdata?: DatasetCreateData, ctrl?: Control): Promise<DatasetEntity>;
    update(this: any, reqdata?: DatasetUpdateData, ctrl?: Control): Promise<DatasetEntity>;
    remove(this: any, reqmatch?: DatasetRemoveMatch, ctrl?: Control): Promise<DatasetEntity>;
}
export { DatasetEntity };
