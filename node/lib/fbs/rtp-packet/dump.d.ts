import * as flatbuffers from 'flatbuffers';
export declare class Dump implements flatbuffers.IUnpackableObject<DumpT> {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): Dump;
    static getRootAsDump(bb: flatbuffers.ByteBuffer, obj?: Dump): Dump;
    static getSizePrefixedRootAsDump(bb: flatbuffers.ByteBuffer, obj?: Dump): Dump;
    payloadType(): number;
    sequenceNumber(): number;
    timestamp(): number;
    marker(): boolean;
    ssrc(): number;
    isKeyFrame(): boolean;
    size(): bigint;
    payloadSize(): bigint;
    spatialLayer(): number;
    temporalLayer(): number;
    mid(): string | null;
    mid(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    rid(): string | null;
    rid(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    rrid(): string | null;
    rrid(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    wideSequenceNumber(): number | null;
    static startDump(builder: flatbuffers.Builder): void;
    static addPayloadType(builder: flatbuffers.Builder, payloadType: number): void;
    static addSequenceNumber(builder: flatbuffers.Builder, sequenceNumber: number): void;
    static addTimestamp(builder: flatbuffers.Builder, timestamp: number): void;
    static addMarker(builder: flatbuffers.Builder, marker: boolean): void;
    static addSsrc(builder: flatbuffers.Builder, ssrc: number): void;
    static addIsKeyFrame(builder: flatbuffers.Builder, isKeyFrame: boolean): void;
    static addSize(builder: flatbuffers.Builder, size: bigint): void;
    static addPayloadSize(builder: flatbuffers.Builder, payloadSize: bigint): void;
    static addSpatialLayer(builder: flatbuffers.Builder, spatialLayer: number): void;
    static addTemporalLayer(builder: flatbuffers.Builder, temporalLayer: number): void;
    static addMid(builder: flatbuffers.Builder, midOffset: flatbuffers.Offset): void;
    static addRid(builder: flatbuffers.Builder, ridOffset: flatbuffers.Offset): void;
    static addRrid(builder: flatbuffers.Builder, rridOffset: flatbuffers.Offset): void;
    static addWideSequenceNumber(builder: flatbuffers.Builder, wideSequenceNumber: number): void;
    static endDump(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createDump(builder: flatbuffers.Builder, payloadType: number, sequenceNumber: number, timestamp: number, marker: boolean, ssrc: number, isKeyFrame: boolean, size: bigint, payloadSize: bigint, spatialLayer: number, temporalLayer: number, midOffset: flatbuffers.Offset, ridOffset: flatbuffers.Offset, rridOffset: flatbuffers.Offset, wideSequenceNumber: number | null): flatbuffers.Offset;
    unpack(): DumpT;
    unpackTo(_o: DumpT): void;
}
export declare class DumpT implements flatbuffers.IGeneratedObject {
    payloadType: number;
    sequenceNumber: number;
    timestamp: number;
    marker: boolean;
    ssrc: number;
    isKeyFrame: boolean;
    size: bigint;
    payloadSize: bigint;
    spatialLayer: number;
    temporalLayer: number;
    mid: string | Uint8Array | null;
    rid: string | Uint8Array | null;
    rrid: string | Uint8Array | null;
    wideSequenceNumber: number | null;
    constructor(payloadType?: number, sequenceNumber?: number, timestamp?: number, marker?: boolean, ssrc?: number, isKeyFrame?: boolean, size?: bigint, payloadSize?: bigint, spatialLayer?: number, temporalLayer?: number, mid?: string | Uint8Array | null, rid?: string | Uint8Array | null, rrid?: string | Uint8Array | null, wideSequenceNumber?: number | null);
    pack(builder: flatbuffers.Builder): flatbuffers.Offset;
}
//# sourceMappingURL=dump.d.ts.map