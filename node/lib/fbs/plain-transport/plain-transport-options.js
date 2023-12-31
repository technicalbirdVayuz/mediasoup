"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlainTransportOptionsT = exports.PlainTransportOptions = void 0;
const flatbuffers = require("flatbuffers");
const listen_info_1 = require("../../fbs/transport/listen-info");
const options_1 = require("../../fbs/transport/options");
class PlainTransportOptions {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsPlainTransportOptions(bb, obj) {
        return (obj || new PlainTransportOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsPlainTransportOptions(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new PlainTransportOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    base(obj) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? (obj || new options_1.Options()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    listenInfo(obj) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? (obj || new listen_info_1.ListenInfo()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    rtcpListenInfo(obj) {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? (obj || new listen_info_1.ListenInfo()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    rtcpMux() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    comedia() {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    enableSrtp() {
        const offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    srtpCryptoSuite() {
        const offset = this.bb.__offset(this.bb_pos, 16);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : null;
    }
    static startPlainTransportOptions(builder) {
        builder.startObject(7);
    }
    static addBase(builder, baseOffset) {
        builder.addFieldOffset(0, baseOffset, 0);
    }
    static addListenInfo(builder, listenInfoOffset) {
        builder.addFieldOffset(1, listenInfoOffset, 0);
    }
    static addRtcpListenInfo(builder, rtcpListenInfoOffset) {
        builder.addFieldOffset(2, rtcpListenInfoOffset, 0);
    }
    static addRtcpMux(builder, rtcpMux) {
        builder.addFieldInt8(3, +rtcpMux, +false);
    }
    static addComedia(builder, comedia) {
        builder.addFieldInt8(4, +comedia, +false);
    }
    static addEnableSrtp(builder, enableSrtp) {
        builder.addFieldInt8(5, +enableSrtp, +false);
    }
    static addSrtpCryptoSuite(builder, srtpCryptoSuite) {
        builder.addFieldInt8(6, srtpCryptoSuite, 0);
    }
    static endPlainTransportOptions(builder) {
        const offset = builder.endObject();
        builder.requiredField(offset, 4); // base
        builder.requiredField(offset, 6); // listen_info
        return offset;
    }
    unpack() {
        return new PlainTransportOptionsT((this.base() !== null ? this.base().unpack() : null), (this.listenInfo() !== null ? this.listenInfo().unpack() : null), (this.rtcpListenInfo() !== null ? this.rtcpListenInfo().unpack() : null), this.rtcpMux(), this.comedia(), this.enableSrtp(), this.srtpCryptoSuite());
    }
    unpackTo(_o) {
        _o.base = (this.base() !== null ? this.base().unpack() : null);
        _o.listenInfo = (this.listenInfo() !== null ? this.listenInfo().unpack() : null);
        _o.rtcpListenInfo = (this.rtcpListenInfo() !== null ? this.rtcpListenInfo().unpack() : null);
        _o.rtcpMux = this.rtcpMux();
        _o.comedia = this.comedia();
        _o.enableSrtp = this.enableSrtp();
        _o.srtpCryptoSuite = this.srtpCryptoSuite();
    }
}
exports.PlainTransportOptions = PlainTransportOptions;
class PlainTransportOptionsT {
    base;
    listenInfo;
    rtcpListenInfo;
    rtcpMux;
    comedia;
    enableSrtp;
    srtpCryptoSuite;
    constructor(base = null, listenInfo = null, rtcpListenInfo = null, rtcpMux = false, comedia = false, enableSrtp = false, srtpCryptoSuite = null) {
        this.base = base;
        this.listenInfo = listenInfo;
        this.rtcpListenInfo = rtcpListenInfo;
        this.rtcpMux = rtcpMux;
        this.comedia = comedia;
        this.enableSrtp = enableSrtp;
        this.srtpCryptoSuite = srtpCryptoSuite;
    }
    pack(builder) {
        const base = (this.base !== null ? this.base.pack(builder) : 0);
        const listenInfo = (this.listenInfo !== null ? this.listenInfo.pack(builder) : 0);
        const rtcpListenInfo = (this.rtcpListenInfo !== null ? this.rtcpListenInfo.pack(builder) : 0);
        PlainTransportOptions.startPlainTransportOptions(builder);
        PlainTransportOptions.addBase(builder, base);
        PlainTransportOptions.addListenInfo(builder, listenInfo);
        PlainTransportOptions.addRtcpListenInfo(builder, rtcpListenInfo);
        PlainTransportOptions.addRtcpMux(builder, this.rtcpMux);
        PlainTransportOptions.addComedia(builder, this.comedia);
        PlainTransportOptions.addEnableSrtp(builder, this.enableSrtp);
        if (this.srtpCryptoSuite !== null)
            PlainTransportOptions.addSrtpCryptoSuite(builder, this.srtpCryptoSuite);
        return PlainTransportOptions.endPlainTransportOptions(builder);
    }
}
exports.PlainTransportOptionsT = PlainTransportOptionsT;
