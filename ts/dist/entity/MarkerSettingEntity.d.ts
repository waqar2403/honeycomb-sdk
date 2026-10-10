import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { MarkerSetting, MarkerSettingLoadMatch, MarkerSettingCreateData, MarkerSettingUpdateData, MarkerSettingRemoveMatch } from '../HoneycombTypes';
declare class MarkerSettingEntity extends HoneycombEntityBase<MarkerSetting> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: MarkerSettingEntity): MarkerSettingEntity;
    load(this: any, reqmatch?: MarkerSettingLoadMatch, ctrl?: Control): Promise<MarkerSettingEntity>;
    create(this: any, reqdata?: MarkerSettingCreateData, ctrl?: Control): Promise<MarkerSettingEntity>;
    update(this: any, reqdata?: MarkerSettingUpdateData, ctrl?: Control): Promise<MarkerSettingEntity>;
    remove(this: any, reqmatch?: MarkerSettingRemoveMatch, ctrl?: Control): Promise<MarkerSettingEntity>;
}
export { MarkerSettingEntity };
