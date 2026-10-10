import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { ManagementAuth, ManagementAuthLoadMatch } from '../HoneycombTypes';
declare class ManagementAuthEntity extends HoneycombEntityBase<ManagementAuth> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: ManagementAuthEntity): ManagementAuthEntity;
    load(this: any, reqmatch?: ManagementAuthLoadMatch, ctrl?: Control): Promise<ManagementAuthEntity>;
}
export { ManagementAuthEntity };
