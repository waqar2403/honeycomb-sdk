import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Marker, MarkerListMatch, MarkerCreateData, MarkerUpdateData, MarkerRemoveMatch } from '../HoneycombTypes';
declare class MarkerEntity extends HoneycombEntityBase<Marker> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: MarkerEntity): MarkerEntity;
    list(this: any, reqmatch?: MarkerListMatch, ctrl?: Control): Promise<MarkerEntity[]>;
    create(this: any, reqdata?: MarkerCreateData, ctrl?: Control): Promise<MarkerEntity>;
    update(this: any, reqdata?: MarkerUpdateData, ctrl?: Control): Promise<MarkerEntity>;
    remove(this: any, reqmatch?: MarkerRemoveMatch, ctrl?: Control): Promise<MarkerEntity>;
}
export { MarkerEntity };
