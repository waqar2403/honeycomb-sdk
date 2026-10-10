import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Slo, SloLoadMatch, SloCreateData, SloUpdateData, SloRemoveMatch } from '../HoneycombTypes';
declare class SloEntity extends HoneycombEntityBase<Slo> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: SloEntity): SloEntity;
    load(this: any, reqmatch?: SloLoadMatch, ctrl?: Control): Promise<SloEntity>;
    create(this: any, reqdata?: SloCreateData, ctrl?: Control): Promise<SloEntity>;
    update(this: any, reqdata?: SloUpdateData, ctrl?: Control): Promise<SloEntity>;
    remove(this: any, reqmatch?: SloRemoveMatch, ctrl?: Control): Promise<SloEntity>;
}
export { SloEntity };
