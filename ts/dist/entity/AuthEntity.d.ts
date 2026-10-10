import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Auth, AuthLoadMatch } from '../HoneycombTypes';
declare class AuthEntity extends HoneycombEntityBase<Auth> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: AuthEntity): AuthEntity;
    load(this: any, reqmatch?: AuthLoadMatch, ctrl?: Control): Promise<AuthEntity>;
}
export { AuthEntity };
