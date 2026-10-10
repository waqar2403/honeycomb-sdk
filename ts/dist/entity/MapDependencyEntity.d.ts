import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { MapDependency, MapDependencyLoadMatch, MapDependencyCreateData } from '../HoneycombTypes';
declare class MapDependencyEntity extends HoneycombEntityBase<MapDependency> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: MapDependencyEntity): MapDependencyEntity;
    load(this: any, reqmatch?: MapDependencyLoadMatch, ctrl?: Control): Promise<MapDependencyEntity>;
    create(this: any, reqdata?: MapDependencyCreateData, ctrl?: Control): Promise<MapDependencyEntity>;
}
export { MapDependencyEntity };
