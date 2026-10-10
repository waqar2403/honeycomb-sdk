import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { CalculatedField, CalculatedFieldLoadMatch, CalculatedFieldCreateData, CalculatedFieldUpdateData, CalculatedFieldRemoveMatch } from '../HoneycombTypes';
declare class CalculatedFieldEntity extends HoneycombEntityBase<CalculatedField> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: CalculatedFieldEntity): CalculatedFieldEntity;
    load(this: any, reqmatch?: CalculatedFieldLoadMatch, ctrl?: Control): Promise<CalculatedFieldEntity>;
    create(this: any, reqdata?: CalculatedFieldCreateData, ctrl?: Control): Promise<CalculatedFieldEntity>;
    update(this: any, reqdata?: CalculatedFieldUpdateData, ctrl?: Control): Promise<CalculatedFieldEntity>;
    remove(this: any, reqmatch?: CalculatedFieldRemoveMatch, ctrl?: Control): Promise<CalculatedFieldEntity>;
}
export { CalculatedFieldEntity };
