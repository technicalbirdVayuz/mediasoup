"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.DumpResponseT = exports.DumpResponse = void 0;
const flatbuffers = require("flatbuffers");
const srtp_parameters_1 = require("../../fbs/srtp-parameters/srtp-parameters");
const dump_1 = require("../../fbs/transport/dump");
const tuple_1 = require("../../fbs/transport/tuple");
class DumpResponse {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsDumpResponse(bb, obj) {
        return (obj || new DumpResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsDumpResponse(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new DumpResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    base(obj) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? (obj || new dump_1.Dump()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    rtcpMux() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    comedia() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    tuple(obj) {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? (obj || new tuple_1.Tuple()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    rtcpTuple(obj) {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? (obj || new tuple_1.Tuple()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    srtpParameters(obj) {
        const offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? (obj || new srtp_parameters_1.SrtpParameters()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    static startDumpResponse(builder) {
        builder.startObject(6);
    }
    static addBase(builder, baseOffset) {
        builder.addFieldOffset(0, baseOffset, 0);
    }
    static addRtcpMux(builder, rtcpMux) {
        builder.addFieldInt8(1, +rtcpMux, +false);
    }
    static addComedia(builder, comedia) {
        builder.addFieldInt8(2, +comedia, +false);
    }
    static addTuple(builder, tupleOffset) {
        builder.addFieldOffset(3, tupleOffset, 0);
    }
    static addRtcpTuple(builder, rtcpTupleOffset) {
        builder.addFieldOffset(4, rtcpTupleOffset, 0);
    }
    static addSrtpParameters(builder, srtpParametersOffset) {
        builder.addFieldOffset(5, srtpParametersOffset, 0);
    }
    static endDumpResponse(builder) {
        const offset = builder.endObject();
        builder.requiredField(offset, 4); // base
        builder.requiredField(offset, 10); // tuple
        return offset;
    }
    unpack() {
        return new DumpResponseT((this.base() !== null ? this.base().unpack() : null), this.rtcpMux(), this.comedia(), (this.tuple() !== null ? this.tuple().unpack() : null), (this.rtcpTuple() !== null ? this.rtcpTuple().unpack() : null), (this.srtpParameters() !== null ? this.srtpParameters().unpack() : null));
    }
    unpackTo(_o) {
        _o.base = (this.base() !== null ? this.base().unpack() : null);
        _o.rtcpMux = this.rtcpMux();
        _o.comedia = this.comedia();
        _o.tuple = (this.tuple() !== null ? this.tuple().unpack() : null);
        _o.rtcpTuple = (this.rtcpTuple() !== null ? this.rtcpTuple().unpack() : null);
        _o.srtpParameters = (this.srtpParameters() !== null ? this.srtpParameters().unpack() : null);
    }
}
exports.DumpResponse = DumpResponse;
class DumpResponseT {
    base;
    rtcpMux;
    comedia;
    tuple;
    rtcpTuple;
    srtpParameters;
    constructor(base = null, rtcpMux = false, comedia = false, tuple = null, rtcpTuple = null, srtpParameters = null) {
        this.base = base;
        this.rtcpMux = rtcpMux;
        this.comedia = comedia;
        this.tuple = tuple;
        this.rtcpTuple = rtcpTuple;
        this.srtpParameters = srtpParameters;
    }
    pack(builder) {
        const base = (this.base !== null ? this.base.pack(builder) : 0);
        const tuple = (this.tuple !== null ? this.tuple.pack(builder) : 0);
        const rtcpTuple = (this.rtcpTuple !== null ? this.rtcpTuple.pack(builder) : 0);
        const srtpParameters = (this.srtpParameters !== null ? this.srtpParameters.pack(builder) : 0);
        DumpResponse.startDumpResponse(builder);
        DumpResponse.addBase(builder, base);
        DumpResponse.addRtcpMux(builder, this.rtcpMux);
        DumpResponse.addComedia(builder, this.comedia);
        DumpResponse.addTuple(builder, tuple);
        DumpResponse.addRtcpTuple(builder, rtcpTuple);
        DumpResponse.addSrtpParameters(builder, srtpParameters);
        return DumpResponse.endDumpResponse(builder);
    }
}
exports.DumpResponseT = DumpResponseT;