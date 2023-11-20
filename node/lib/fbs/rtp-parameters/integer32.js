"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.Integer32T = exports.Integer32 = void 0;
const flatbuffers = require("flatbuffers");
class Integer32 {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsInteger32(bb, obj) {
        return (obj || new Integer32()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsInteger32(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Integer32()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    value() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    }
    static startInteger32(builder) {
        builder.startObject(1);
    }
    static addValue(builder, value) {
        builder.addFieldInt32(0, value, 0);
    }
    static endInteger32(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createInteger32(builder, value) {
        Integer32.startInteger32(builder);
        Integer32.addValue(builder, value);
        return Integer32.endInteger32(builder);
    }
    unpack() {
        return new Integer32T(this.value());
    }
    unpackTo(_o) {
        _o.value = this.value();
    }
}
exports.Integer32 = Integer32;
class Integer32T {
    value;
    constructor(value = 0) {
        this.value = value;
    }
    pack(builder) {
        return Integer32.createInteger32(builder, this.value);
    }
}
exports.Integer32T = Integer32T;