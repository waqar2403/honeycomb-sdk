import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Trigger, TriggerLoadMatch, TriggerListMatch, TriggerCreateData, TriggerUpdateData, TriggerRemoveMatch } from '../HoneycombTypes';
declare class TriggerEntity extends HoneycombEntityBase<Trigger> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: TriggerEntity): TriggerEntity;
    load(this: any, reqmatch?: TriggerLoadMatch, ctrl?: Control): Promise<TriggerEntity>;
    list(this: any, reqmatch?: TriggerListMatch, ctrl?: Control): Promise<TriggerEntity[]>;
    create(this: any, reqdata?: TriggerCreateData, ctrl?: Control): Promise<TriggerEntity>;
    update(this: any, reqdata?: TriggerUpdateData, ctrl?: Control): Promise<TriggerEntity>;
    remove(this: any, reqmatch?: TriggerRemoveMatch, ctrl?: Control): Promise<TriggerEntity>;
}
export { TriggerEntity };
