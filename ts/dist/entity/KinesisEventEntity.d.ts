import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { KinesisEvent, KinesisEventCreateData } from '../HoneycombTypes';
declare class KinesisEventEntity extends HoneycombEntityBase<KinesisEvent> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: KinesisEventEntity): KinesisEventEntity;
    create(this: any, reqdata?: KinesisEventCreateData, ctrl?: Control): Promise<KinesisEventEntity>;
}
export { KinesisEventEntity };
