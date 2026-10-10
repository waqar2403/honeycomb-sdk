import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { Board, BoardLoadMatch, BoardListMatch, BoardCreateData, BoardUpdateData, BoardRemoveMatch } from '../HoneycombTypes';
declare class BoardEntity extends HoneycombEntityBase<Board> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: BoardEntity): BoardEntity;
    load(this: any, reqmatch?: BoardLoadMatch, ctrl?: Control): Promise<BoardEntity>;
    list(this: any, reqmatch?: BoardListMatch, ctrl?: Control): Promise<BoardEntity[]>;
    create(this: any, reqdata?: BoardCreateData, ctrl?: Control): Promise<BoardEntity>;
    update(this: any, reqdata?: BoardUpdateData, ctrl?: Control): Promise<BoardEntity>;
    remove(this: any, reqmatch?: BoardRemoveMatch, ctrl?: Control): Promise<BoardEntity>;
}
export { BoardEntity };
