"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.SctpStreamParametersT = exports.SctpStreamParameters = void 0;
const flatbuffers = require("flatbuffers");
class SctpStreamParameters {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsSctpStreamParameters(bb, obj) {
        return (obj || new SctpStreamParameters()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsSctpStreamParameters(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new SctpStreamParameters()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    streamId() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
    }
    ordered() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : null;
    }
    maxPacketLifeTime() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readUint16(this.bb_pos + offset) : null;
    }
    maxRetransmits() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.readUint16(this.bb_pos + offset) : null;
    }
    static startSctpStreamParameters(builder) {
        builder.startObject(4);
    }
    static addStreamId(builder, streamId) {
        builder.addFieldInt16(0, streamId, 0);
    }
    static addOrdered(builder, ordered) {
        builder.addFieldInt8(1, +ordered, 0);
    }
    static addMaxPacketLifeTime(builder, maxPacketLifeTime) {
        builder.addFieldInt16(2, maxPacketLifeTime, 0);
    }
    static addMaxRetransmits(builder, maxRetransmits) {
        builder.addFieldInt16(3, maxRetransmits, 0);
    }
    static endSctpStreamParameters(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createSctpStreamParameters(builder, streamId, ordered, maxPacketLifeTime, maxRetransmits) {
        SctpStreamParameters.startSctpStreamParameters(builder);
        SctpStreamParameters.addStreamId(builder, streamId);
        if (ordered !== null)
            SctpStreamParameters.addOrdered(builder, ordered);
        if (maxPacketLifeTime !== null)
            SctpStreamParameters.addMaxPacketLifeTime(builder, maxPacketLifeTime);
        if (maxRetransmits !== null)
            SctpStreamParameters.addMaxRetransmits(builder, maxRetransmits);
        return SctpStreamParameters.endSctpStreamParameters(builder);
    }
    unpack() {
        return new SctpStreamParametersT(this.streamId(), this.ordered(), this.maxPacketLifeTime(), this.maxRetransmits());
    }
    unpackTo(_o) {
        _o.streamId = this.streamId();
        _o.ordered = this.ordered();
        _o.maxPacketLifeTime = this.maxPacketLifeTime();
        _o.maxRetransmits = this.maxRetransmits();
    }
}
exports.SctpStreamParameters = SctpStreamParameters;
class SctpStreamParametersT {
    streamId;
    ordered;
    maxPacketLifeTime;
    maxRetransmits;
    constructor(streamId = 0, ordered = null, maxPacketLifeTime = null, maxRetransmits = null) {
        this.streamId = streamId;
        this.ordered = ordered;
        this.maxPacketLifeTime = maxPacketLifeTime;
        this.maxRetransmits = maxRetransmits;
    }
    pack(builder) {
        return SctpStreamParameters.createSctpStreamParameters(builder, this.streamId, this.ordered, this.maxPacketLifeTime, this.maxRetransmits);
    }
}
exports.SctpStreamParametersT = SctpStreamParametersT;
