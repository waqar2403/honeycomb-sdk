import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { BoardView, BoardViewLoadMatch, BoardViewListMatch, BoardViewCreateData, BoardViewUpdateData } from '../HoneycombTypes';
declare class BoardViewEntity extends HoneycombEntityBase<BoardView> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: BoardViewEntity): BoardViewEntity;
    load(this: any, reqmatch?: BoardViewLoadMatch, ctrl?: Control): Promise<BoardViewEntity>;
    list(this: any, reqmatch?: BoardViewListMatch, ctrl?: Control): Promise<BoardViewEntity[]>;
    create(this: any, reqdata?: BoardViewCreateData, ctrl?: Control): Promise<BoardViewEntity>;
    update(this: any, reqdata?: BoardViewUpdateData, ctrl?: Control): Promise<BoardViewEntity>;
}
export { BoardViewEntity };
