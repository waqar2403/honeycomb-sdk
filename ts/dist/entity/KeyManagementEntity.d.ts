import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { KeyManagement, KeyManagementLoadMatch, KeyManagementCreateData, KeyManagementUpdateData, KeyManagementRemoveMatch } from '../HoneycombTypes';
declare class KeyManagementEntity extends HoneycombEntityBase<KeyManagement> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: KeyManagementEntity): KeyManagementEntity;
    load(this: any, reqmatch?: KeyManagementLoadMatch, ctrl?: Control): Promise<KeyManagementEntity>;
    create(this: any, reqdata?: KeyManagementCreateData, ctrl?: Control): Promise<KeyManagementEntity>;
    update(this: any, reqdata?: KeyManagementUpdateData, ctrl?: Control): Promise<KeyManagementEntity>;
    remove(this: any, reqmatch?: KeyManagementRemoveMatch, ctrl?: Control): Promise<KeyManagementEntity>;
}
export { KeyManagementEntity };
