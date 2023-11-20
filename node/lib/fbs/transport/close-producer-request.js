"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseProducerRequestT = exports.CloseProducerRequest = void 0;
const flatbuffers = require("flatbuffers");
class CloseProducerRequest {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsCloseProducerRequest(bb, obj) {
        return (obj || new CloseProducerRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsCloseProducerRequest(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new CloseProducerRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    producerId(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    static startCloseProducerRequest(builder) {
        builder.startObject(1);
    }
    static addProducerId(builder, producerIdOffset) {
        builder.addFieldOffset(0, producerIdOffset, 0);
    }
    static endCloseProducerRequest(builder) {
        const offset = builder.endObject();
        builder.requiredField(offset, 4); // producer_id
        return offset;
    }
    static createCloseProducerRequest(builder, producerIdOffset) {
        CloseProducerRequest.startCloseProducerRequest(builder);
        CloseProducerRequest.addProducerId(builder, producerIdOffset);
        return CloseProducerRequest.endCloseProducerRequest(builder);
    }
    unpack() {
        return new CloseProducerRequestT(this.producerId());
    }
    unpackTo(_o) {
        _o.producerId = this.producerId();
    }
}
exports.CloseProducerRequest = CloseProducerRequest;
class CloseProducerRequestT {
    producerId;
    constructor(producerId = null) {
        this.producerId = producerId;
    }
    pack(builder) {
        const producerId = (this.producerId !== null ? builder.createString(this.producerId) : 0);
        return CloseProducerRequest.createCloseProducerRequest(builder, producerId);
    }
}
exports.CloseProducerRequestT = CloseProducerRequestT;