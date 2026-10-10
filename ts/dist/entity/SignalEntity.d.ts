import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Signal, SignalLoadMatch, SignalListMatch, SignalUpdateData } from '../HoneycombTypes';
declare class SignalEntity extends HoneycombEntityBase<Signal> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: SignalEntity): SignalEntity;
    load(this: any, reqmatch?: SignalLoadMatch, ctrl?: Control): Promise<SignalEntity>;
    list(this: any, reqmatch?: SignalListMatch, ctrl?: Control): Promise<SignalEntity[]>;
    update(this: any, reqdata?: SignalUpdateData, ctrl?: Control): Promise<SignalEntity>;
}
export { SignalEntity };
