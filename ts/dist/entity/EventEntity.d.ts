import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Event, EventCreateData } from '../HoneycombTypes';
declare class EventEntity extends HoneycombEntityBase<Event> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: EventEntity): EventEntity;
    create(this: any, reqdata?: EventCreateData, ctrl?: Control): Promise<EventEntity>;
}
export { EventEntity };
