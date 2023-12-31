"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateActiveSpeakerObserverRequestT = exports.CreateActiveSpeakerObserverRequest = void 0;
const flatbuffers = require("flatbuffers");
const active_speaker_observer_options_1 = require("../../fbs/active-speaker-observer/active-speaker-observer-options");
class CreateActiveSpeakerObserverRequest {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsCreateActiveSpeakerObserverRequest(bb, obj) {
        return (obj || new CreateActiveSpeakerObserverRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsCreateActiveSpeakerObserverRequest(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new CreateActiveSpeakerObserverRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    rtpObserverId(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    options(obj) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? (obj || new active_speaker_observer_options_1.ActiveSpeakerObserverOptions()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    static startCreateActiveSpeakerObserverRequest(builder) {
        builder.startObject(2);
    }
    static addRtpObserverId(builder, rtpObserverIdOffset) {
        builder.addFieldOffset(0, rtpObserverIdOffset, 0);
    }
    static addOptions(builder, optionsOffset) {
        builder.addFieldOffset(1, optionsOffset, 0);
    }
    static endCreateActiveSpeakerObserverRequest(builder) {
        const offset = builder.endObject();
        builder.requiredField(offset, 4); // rtp_observer_id
        builder.requiredField(offset, 6); // options
        return offset;
    }
    unpack() {
        return new CreateActiveSpeakerObserverRequestT(this.rtpObserverId(), (this.options() !== null ? this.options().unpack() : null));
    }
    unpackTo(_o) {
        _o.rtpObserverId = this.rtpObserverId();
        _o.options = (this.options() !== null ? this.options().unpack() : null);
    }
}
exports.CreateActiveSpeakerObserverRequest = CreateActiveSpeakerObserverRequest;
class CreateActiveSpeakerObserverRequestT {
    rtpObserverId;
    options;
    constructor(rtpObserverId = null, options = null) {
        this.rtpObserverId = rtpObserverId;
        this.options = options;
    }
    pack(builder) {
        const rtpObserverId = (this.rtpObserverId !== null ? builder.createString(this.rtpObserverId) : 0);
        const options = (this.options !== null ? this.options.pack(builder) : 0);
        CreateActiveSpeakerObserverRequest.startCreateActiveSpeakerObserverRequest(builder);
        CreateActiveSpeakerObserverRequest.addRtpObserverId(builder, rtpObserverId);
        CreateActiveSpeakerObserverRequest.addOptions(builder, options);
        return CreateActiveSpeakerObserverRequest.endCreateActiveSpeakerObserverRequest(builder);
    }
}
exports.CreateActiveSpeakerObserverRequestT = CreateActiveSpeakerObserverRequestT;
