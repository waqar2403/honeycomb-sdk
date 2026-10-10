import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { ApiKey, ApiKeyLoadMatch, ApiKeyListMatch, ApiKeyCreateData, ApiKeyUpdateData, ApiKeyRemoveMatch } from '../HoneycombTypes';
declare class ApiKeyEntity extends HoneycombEntityBase<ApiKey> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: ApiKeyEntity): ApiKeyEntity;
    load(this: any, reqmatch?: ApiKeyLoadMatch, ctrl?: Control): Promise<ApiKeyEntity>;
    list(this: any, reqmatch?: ApiKeyListMatch, ctrl?: Control): Promise<ApiKeyEntity[]>;
    create(this: any, reqdata?: ApiKeyCreateData, ctrl?: Control): Promise<ApiKeyEntity>;
    update(this: any, reqdata?: ApiKeyUpdateData, ctrl?: Control): Promise<ApiKeyEntity>;
    remove(this: any, reqmatch?: ApiKeyRemoveMatch, ctrl?: Control): Promise<ApiKeyEntity>;
}
export { ApiKeyEntity };
