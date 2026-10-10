import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Kinesi, KinesiCreateData } from '../HoneycombTypes';
declare class KinesiEntity extends HoneycombEntityBase<Kinesi> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: KinesiEntity): KinesiEntity;
    create(this: any, reqdata?: KinesiCreateData, ctrl?: Control): Promise<KinesiEntity>;
}
export { KinesiEntity };
