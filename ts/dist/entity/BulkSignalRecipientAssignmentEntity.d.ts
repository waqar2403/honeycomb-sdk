import { HoneycombEntityBase } from '../HoneycombEntityBase';
import type { HoneycombSDK } from '../HoneycombSDK';
import type { Control } from '../types';
import type { BulkSignalRecipientAssignment, BulkSignalRecipientAssignmentCreateData } from '../HoneycombTypes';
declare class BulkSignalRecipientAssignmentEntity extends HoneycombEntityBase<BulkSignalRecipientAssignment> {
    constructor(client: HoneycombSDK, entopts: any);
    make(this: BulkSignalRecipientAssignmentEntity): BulkSignalRecipientAssignmentEntity;
    create(this: any, reqdata?: BulkSignalRecipientAssignmentCreateData, ctrl?: Control): Promise<BulkSignalRecipientAssignmentEntity>;
}
export { BulkSignalRecipientAssignmentEntity };
