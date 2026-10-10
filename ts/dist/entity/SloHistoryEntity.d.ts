import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { SloHistory, SloHistoryCreateData } from '../HoneycombTypes';
declare class SloHistoryEntity extends HoneycombEntityBase<SloHistory> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: SloHistoryEntity): SloHistoryEntity;
    create(this: any, reqdata?: SloHistoryCreateData, ctrl?: Control): Promise<SloHistoryEntity>;
}
export { SloHistoryEntity };
