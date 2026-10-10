import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Column, ColumnLoadMatch, ColumnCreateData, ColumnUpdateData, ColumnRemoveMatch } from '../HoneycombTypes';
declare class ColumnEntity extends HoneycombEntityBase<Column> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: ColumnEntity): ColumnEntity;
    load(this: any, reqmatch?: ColumnLoadMatch, ctrl?: Control): Promise<ColumnEntity>;
    create(this: any, reqdata?: ColumnCreateData, ctrl?: Control): Promise<ColumnEntity>;
    update(this: any, reqdata?: ColumnUpdateData, ctrl?: Control): Promise<ColumnEntity>;
    remove(this: any, reqmatch?: ColumnRemoveMatch, ctrl?: Control): Promise<ColumnEntity>;
}
export { ColumnEntity };
