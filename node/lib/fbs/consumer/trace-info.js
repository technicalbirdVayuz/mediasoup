"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionListToTraceInfo = exports.unionToTraceInfo = exports.TraceInfo = void 0;
const fir_trace_info_1 = require("../../fbs/consumer/fir-trace-info");
const key_frame_trace_info_1 = require("../../fbs/consumer/key-frame-trace-info");
const pli_trace_info_1 = require("../../fbs/consumer/pli-trace-info");
const rtp_trace_info_1 = require("../../fbs/consumer/rtp-trace-info");
var TraceInfo;
(function (TraceInfo) {
    TraceInfo[TraceInfo["NONE"] = 0] = "NONE";
    TraceInfo[TraceInfo["KeyFrameTraceInfo"] = 1] = "KeyFrameTraceInfo";
    TraceInfo[TraceInfo["FirTraceInfo"] = 2] = "FirTraceInfo";
    TraceInfo[TraceInfo["PliTraceInfo"] = 3] = "PliTraceInfo";
    TraceInfo[TraceInfo["RtpTraceInfo"] = 4] = "RtpTraceInfo";
})(TraceInfo || (exports.TraceInfo = TraceInfo = {}));
function unionToTraceInfo(type, accessor) {
    switch (TraceInfo[type]) {
        case 'NONE': return null;
        case 'KeyFrameTraceInfo': return accessor(new key_frame_trace_info_1.KeyFrameTraceInfo());
        case 'FirTraceInfo': return accessor(new fir_trace_info_1.FirTraceInfo());
        case 'PliTraceInfo': return accessor(new pli_trace_info_1.PliTraceInfo());
        case 'RtpTraceInfo': return accessor(new rtp_trace_info_1.RtpTraceInfo());
        default: return null;
    }
}
exports.unionToTraceInfo = unionToTraceInfo;
function unionListToTraceInfo(type, accessor, index) {
    switch (TraceInfo[type]) {
        case 'NONE': return null;
        case 'KeyFrameTraceInfo': return accessor(index, new key_frame_trace_info_1.KeyFrameTraceInfo());
        case 'FirTraceInfo': return accessor(index, new fir_trace_info_1.FirTraceInfo());
        case 'PliTraceInfo': return accessor(index, new pli_trace_info_1.PliTraceInfo());
        case 'RtpTraceInfo': return accessor(index, new rtp_trace_info_1.RtpTraceInfo());
        default: return null;
    }
}
exports.unionListToTraceInfo = unionListToTraceInfo;
