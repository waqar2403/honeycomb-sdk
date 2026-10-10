"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KinesisEventEntity = void 0;
const HoneycombEntityBase_1 = require("../HoneycombEntityBase");
class KinesisEventEntity extends HoneycombEntityBase_1.HoneycombEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'kinesis_event';
        this.name_ = 'kinesis_event';
        this.Name = 'KinesisEvent';
    }
    make() {
        return new KinesisEventEntity(this._client, this.entopts());
    }
    async create(reqdata, ctrl) {
        const utility = this._utility;
        const { makeContext, done, 
        // The registry name is `makeError`; `error` is the local alias.
        makeError: error, featureHook, makePoint, makeRequest, makeResponse, makeResult, makeSpec, } = utility;
        let fres = undefined;
        let ctx = makeContext({
            opname: 'create',
            ctrl,
            match: this._match,
            data: this._data,
            reqdata
        }, this._entctx);
        try {
            fres = featureHook(ctx, 'PrePoint');
            if (fres instanceof Promise) {
                await fres;
            }
            ctx.out.point = makePoint(ctx);
            if (ctx.out.point instanceof Error) {
                return error(ctx, ctx.out.point);
            }
            fres = featureHook(ctx, 'PreSpec');
            if (fres instanceof Promise) {
                await fres;
            }
            ctx.out.spec = makeSpec(ctx);
            if (ctx.out.spec instanceof Error) {
                return error(ctx, ctx.out.spec);
            }
            fres = featureHook(ctx, 'PreRequest');
            if (fres instanceof Promise) {
                await fres;
            }
            ctx.out.request = await makeRequest(ctx);
            if (ctx.out.request instanceof Error) {
                return error(ctx, ctx.out.request);
            }
            fres = featureHook(ctx, 'PreResponse');
            if (fres instanceof Promise) {
                await fres;
            }
            ctx.out.response = await makeResponse(ctx);
            if (ctx.out.response instanceof Error) {
                return error(ctx, ctx.out.response);
            }
            fres = featureHook(ctx, 'PreResult');
            if (fres instanceof Promise) {
                await fres;
            }
            ctx.out.result = await makeResult(ctx);
            if (ctx.out.result instanceof Error) {
                return error(ctx, ctx.out.result);
            }
            fres = featureHook(ctx, 'PreDone');
            if (fres instanceof Promise) {
                await fres;
            }
            if (null != ctx.result) {
                if (null != ctx.result.resdata) {
                    this._data = ctx.result.resdata;
                }
            }
            const out = done(ctx);
            return (ctx.result && ctx.result.ok) ? this : out;
        }
        catch (err) {
            // What a hook throws here must not escape the cleaning below.
            try {
                fres = featureHook(ctx, 'PreUnexpected');
                if (fres instanceof Promise) {
                    await fres;
                }
            }
            catch (hookerr) {
                err = hookerr;
            }
            err = this._unexpected(ctx, err);
            if (err) {
                throw err;
            }
            else {
                // Off-happy-path (throw disabled): typed as any so the method's
                // Promise<KinesisEventEntity> return stays clean under strict null checks.
                return undefined;
            }
        }
    }
}
exports.KinesisEventEntity = KinesisEventEntity;
//# sourceMappingURL=KinesisEventEntity.js.map