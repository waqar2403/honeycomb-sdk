import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { BurnAlert, BurnAlertLoadMatch, BurnAlertCreateData, BurnAlertUpdateData, BurnAlertRemoveMatch } from '../HoneycombTypes';
declare class BurnAlertEntity extends HoneycombEntityBase<BurnAlert> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: BurnAlertEntity): BurnAlertEntity;
    load(this: any, reqmatch?: BurnAlertLoadMatch, ctrl?: Control): Promise<BurnAlertEntity>;
    create(this: any, reqdata?: BurnAlertCreateData, ctrl?: Control): Promise<BurnAlertEntity>;
    update(this: any, reqdata?: BurnAlertUpdateData, ctrl?: Control): Promise<BurnAlertEntity>;
    remove(this: any, reqmatch?: BurnAlertRemoveMatch, ctrl?: Control): Promise<BurnAlertEntity>;
}
export { BurnAlertEntity };
