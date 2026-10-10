import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { SloCount, SloCountListMatch } from '../HoneycombTypes';
declare class SloCountEntity extends HoneycombEntityBase<SloCount> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: SloCountEntity): SloCountEntity;
    list(this: any, reqmatch?: SloCountListMatch, ctrl?: Control): Promise<SloCountEntity[]>;
}
export { SloCountEntity };
