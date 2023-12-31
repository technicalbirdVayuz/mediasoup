"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSendStreamStats = exports.parseRtpStreamRecvStats = exports.parseRtpStreamStats = void 0;
const FbsRtpStream = require("./fbs/rtp-stream");
const FbsRtpParameters = require("./fbs/rtp-parameters");
function parseRtpStreamStats(binary) {
    if (binary.dataType() === FbsRtpStream.StatsData.RecvStats) {
        return parseRtpStreamRecvStats(binary);
    }
    else {
        return parseSendStreamStats(binary);
    }
}
exports.parseRtpStreamStats = parseRtpStreamStats;
function parseRtpStreamRecvStats(binary) {
    const recvStats = new FbsRtpStream.RecvStats();
    const baseStats = new FbsRtpStream.BaseStats();
    binary.data(recvStats);
    recvStats.base().data(baseStats);
    const base = parseBaseStreamStats(baseStats);
    return {
        ...base,
        type: 'inbound-rtp',
        jitter: recvStats.jitter(),
        byteCount: Number(recvStats.byteCount()),
        packetCount: Number(recvStats.packetCount()),
        bitrate: Number(recvStats.bitrate()),
        bitrateByLayer: parseBitrateByLayer(recvStats)
    };
}
exports.parseRtpStreamRecvStats = parseRtpStreamRecvStats;
function parseSendStreamStats(binary) {
    const sendStats = new FbsRtpStream.SendStats();
    const baseStats = new FbsRtpStream.BaseStats();
    binary.data(sendStats);
    sendStats.base().data(baseStats);
    const base = parseBaseStreamStats(baseStats);
    return {
        ...base,
        type: 'outbound-rtp',
        byteCount: Number(sendStats.byteCount()),
        packetCount: Number(sendStats.packetCount()),
        bitrate: Number(sendStats.bitrate())
    };
}
exports.parseSendStreamStats = parseSendStreamStats;
function parseBaseStreamStats(binary) {
    return {
        timestamp: Number(binary.timestamp()),
        ssrc: binary.ssrc(),
        rtxSsrc: binary.rtxSsrc() ?? undefined,
        rid: binary.rid() ?? undefined,
        kind: binary.kind() === FbsRtpParameters.MediaKind.AUDIO ?
            'audio' :
            'video',
        mimeType: binary.mimeType(),
        packetsLost: Number(binary.packetsLost()),
        fractionLost: Number(binary.fractionLost()),
        packetsDiscarded: Number(binary.packetsDiscarded()),
        packetsRetransmitted: Number(binary.packetsRetransmitted()),
        packetsRepaired: Number(binary.packetsRepaired()),
        nackCount: Number(binary.nackCount()),
        nackPacketCount: Number(binary.nackPacketCount()),
        pliCount: Number(binary.pliCount()),
        firCount: Number(binary.firCount()),
        score: binary.score(),
        roundTripTime: binary.roundTripTime(),
        rtxPacketsDiscarded: binary.rtxPacketsDiscarded() ?
            Number(binary.rtxPacketsDiscarded()) :
            undefined
    };
}
function parseBitrateByLayer(binary) {
    if (binary.bitrateByLayerLength() === 0) {
        return {};
    }
    const bitRateByLayer = {};
    for (let i = 0; i < binary.bitrateByLayerLength(); ++i) {
        const layer = binary.bitrateByLayer(i).layer();
        const bitrate = binary.bitrateByLayer(i).bitrate();
        bitRateByLayer[layer] = Number(bitrate);
    }
}
