import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { SloHourlyCount, SloHourlyCountListMatch } from '../HoneycombTypes';
declare class SloHourlyCountEntity extends HoneycombEntityBase<SloHourlyCount> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: SloHourlyCountEntity): SloHourlyCountEntity;
    list(this: any, reqmatch?: SloHourlyCountListMatch, ctrl?: Control): Promise<SloHourlyCountEntity[]>;
}
export { SloHourlyCountEntity };
