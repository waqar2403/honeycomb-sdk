import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Recipient, RecipientLoadMatch, RecipientListMatch, RecipientCreateData, RecipientUpdateData, RecipientRemoveMatch } from '../HoneycombTypes';
declare class RecipientEntity extends HoneycombEntityBase<Recipient> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: RecipientEntity): RecipientEntity;
    load(this: any, reqmatch?: RecipientLoadMatch, ctrl?: Control): Promise<RecipientEntity>;
    list(this: any, reqmatch?: RecipientListMatch, ctrl?: Control): Promise<RecipientEntity[]>;
    create(this: any, reqdata?: RecipientCreateData, ctrl?: Control): Promise<RecipientEntity>;
    update(this: any, reqdata?: RecipientUpdateData, ctrl?: Control): Promise<RecipientEntity>;
    remove(this: any, reqmatch?: RecipientRemoveMatch, ctrl?: Control): Promise<RecipientEntity>;
}
export { RecipientEntity };
