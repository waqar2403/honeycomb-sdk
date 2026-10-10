import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { HistoricalAnomaly, HistoricalAnomalyListMatch } from '../HoneycombTypes';
declare class HistoricalAnomalyEntity extends HoneycombEntityBase<HistoricalAnomaly> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: HistoricalAnomalyEntity): HistoricalAnomalyEntity;
    list(this: any, reqmatch?: HistoricalAnomalyListMatch, ctrl?: Control): Promise<HistoricalAnomalyEntity[]>;
}
export { HistoricalAnomalyEntity };
