"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectResponseT = exports.ConnectResponse = void 0;
const flatbuffers = require("flatbuffers");
const tuple_1 = require("../../fbs/transport/tuple");
class ConnectResponse {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsConnectResponse(bb, obj) {
        return (obj || new ConnectResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsConnectResponse(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new ConnectResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    tuple(obj) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? (obj || new tuple_1.Tuple()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    static startConnectResponse(builder) {
        builder.startObject(1);
    }
    static addTuple(builder, tupleOffset) {
        builder.addFieldOffset(0, tupleOffset, 0);
    }
    static endConnectResponse(builder) {
        const offset = builder.endObject();
        builder.requiredField(offset, 4); // tuple
        return offset;
    }
    static createConnectResponse(builder, tupleOffset) {
        ConnectResponse.startConnectResponse(builder);
        ConnectResponse.addTuple(builder, tupleOffset);
        return ConnectResponse.endConnectResponse(builder);
    }
    unpack() {
        return new ConnectResponseT((this.tuple() !== null ? this.tuple().unpack() : null));
    }
    unpackTo(_o) {
        _o.tuple = (this.tuple() !== null ? this.tuple().unpack() : null);
    }
}
exports.ConnectResponse = ConnectResponse;
class ConnectResponseT {
    tuple;
    constructor(tuple = null) {
        this.tuple = tuple;
    }
    pack(builder) {
        const tuple = (this.tuple !== null ? this.tuple.pack(builder) : 0);
        return ConnectResponse.createConnectResponse(builder, tuple);
    }
}
exports.ConnectResponseT = ConnectResponseT;