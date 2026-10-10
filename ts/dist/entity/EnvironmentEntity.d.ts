import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Environment, EnvironmentLoadMatch, EnvironmentCreateData, EnvironmentUpdateData, EnvironmentRemoveMatch } from '../HoneycombTypes';
declare class EnvironmentEntity extends HoneycombEntityBase<Environment> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: EnvironmentEntity): EnvironmentEntity;
    load(this: any, reqmatch?: EnvironmentLoadMatch, ctrl?: Control): Promise<EnvironmentEntity>;
    create(this: any, reqdata?: EnvironmentCreateData, ctrl?: Control): Promise<EnvironmentEntity>;
    update(this: any, reqdata?: EnvironmentUpdateData, ctrl?: Control): Promise<EnvironmentEntity>;
    remove(this: any, reqmatch?: EnvironmentRemoveMatch, ctrl?: Control): Promise<EnvironmentEntity>;
}
export { EnvironmentEntity };
