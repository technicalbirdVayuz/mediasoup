/// <reference types="node" />
import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import { Channel } from './Channel';
import { TransportInternal } from './Transport';
import { MediaKind, RtpParameters } from './RtpParameters';
import { RtpStreamRecvStats } from './RtpStream';
import { AppData } from './types';
import * as FbsProducer from './fbs/producer';
import * as FbsRtpParameters from './fbs/rtp-parameters';
export type ProducerOptions<ProducerAppData extends AppData = AppData> = {
    /**
     * Producer id (just for Router.pipeToRouter() method).
     */
    id?: string;
    /**
     * Media kind ('audio' or 'video').
     */
    kind: MediaKind;
    /**
     * RTP parameters defining what the endpoint is sending.
     */
    rtpParameters: RtpParameters;
    /**
     * Whether the producer must start in paused mode. Default false.
     */
    paused?: boolean;
    /**
     * Just for video. Time (in ms) before asking the sender for a new key frame
     * after having asked a previous one. Default 0.
     */
    keyFrameRequestDelay?: number;
    /**
     * Custom application data.
     */
    appData?: ProducerAppData;
};
/**
 * Valid types for 'trace' event.
 */
export type ProducerTraceEventType = 'rtp' | 'keyframe' | 'nack' | 'pli' | 'fir';
/**
 * 'trace' event data.
 */
export type ProducerTraceEventData = {
    /**
     * Trace type.
     */
    type: ProducerTraceEventType;
    /**
     * Event timestamp.
     */
    timestamp: number;
    /**
     * Event direction.
     */
    direction: 'in' | 'out';
    /**
     * Per type information.
     */
    info: any;
};
export type ProducerScore = {
    /**
     * Index of the RTP stream in the rtpParameters.encodings array.
     */
    encodingIdx: number;
    /**
     * SSRC of the RTP stream.
     */
    ssrc: number;
    /**
     * RID of the RTP stream.
     */
    rid?: string;
    /**
     * The score of the RTP stream.
     */
    score: number;
};
export type ProducerVideoOrientation = {
    /**
     * Whether the source is a video camera.
     */
    camera: boolean;
    /**
     * Whether the video source is flipped.
     */
    flip: boolean;
    /**
     * Rotation degrees (0, 90, 180 or 270).
     */
    rotation: number;
};
export type ProducerStat = RtpStreamRecvStats;
/**
 * Producer type.
 */
export type ProducerType = 'simple' | 'simulcast' | 'svc';
export type ProducerEvents = {
    transportclose: [];
    score: [ProducerScore[]];
    videoorientationchange: [ProducerVideoOrientation];
    trace: [ProducerTraceEventData];
    '@close': [];
};
export type ProducerObserverEvents = {
    close: [];
    pause: [];
    resume: [];
    score: [ProducerScore[]];
    videoorientationchange: [ProducerVideoOrientation];
    trace: [ProducerTraceEventData];
};
type ProducerDump = {
    id: string;
    kind: string;
    type: ProducerType;
    rtpParameters: RtpParameters;
    rtpMapping: any;
    rtpStreams: any;
    traceEventTypes: string[];
    paused: boolean;
};
type ProducerInternal = TransportInternal & {
    producerId: string;
};
type ProducerData = {
    kind: MediaKind;
    rtpParameters: RtpParameters;
    type: ProducerType;
    consumableRtpParameters: RtpParameters;
};
export declare class Producer<ProducerAppData extends AppData = AppData> extends EnhancedEventEmitter<ProducerEvents> {
    #private;
    /**
     * @private
     */
    constructor({ internal, data, channel, appData, paused }: {
        internal: ProducerInternal;
        data: ProducerData;
        channel: Channel;
        appData?: ProducerAppData;
        paused: boolean;
    });
    /**
     * Producer id.
     */
    get id(): string;
    /**
     * Whether the Producer is closed.
     */
    get closed(): boolean;
    /**
     * Media kind.
     */
    get kind(): MediaKind;
    /**
     * RTP parameters.
     */
    get rtpParameters(): RtpParameters;
    /**
     * Producer type.
     */
    get type(): ProducerType;
    /**
     * Consumable RTP parameters.
     *
     * @private
     */
    get consumableRtpParameters(): RtpParameters;
    /**
     * Whether the Producer is paused.
     */
    get paused(): boolean;
    /**
     * Producer score list.
     */
    get score(): ProducerScore[];
    /**
     * App custom data.
     */
    get appData(): ProducerAppData;
    /**
     * App custom data setter.
     */
    set appData(appData: ProducerAppData);
    /**
     * Observer.
     */
    get observer(): EnhancedEventEmitter<ProducerObserverEvents>;
    /**
     * @private
     * Just for testing purposes.
     */
    get channelForTesting(): Channel;
    /**
     * Close the Producer.
     */
    close(): void;
    /**
     * Transport was closed.
     *
     * @private
     */
    transportClosed(): void;
    /**
     * Dump Producer.
     */
    dump(): Promise<ProducerDump>;
    /**
     * Get Producer stats.
     */
    getStats(): Promise<ProducerStat[]>;
    /**
     * Pause the Producer.
     */
    pause(): Promise<void>;
    /**
     * Resume the Producer.
     */
    resume(): Promise<void>;
    /**
     * Enable 'trace' event.
     */
    enableTraceEvent(types?: ProducerTraceEventType[]): Promise<void>;
    /**
     * Send RTP packet (just valid for Producers created on a DirectTransport).
     */
    send(rtpPacket: Buffer): void;
    private handleWorkerNotifications;
}
export declare function producerTypeFromFbs(type: FbsRtpParameters.Type): ProducerType;
export declare function producerTypeToFbs(type: ProducerType): FbsRtpParameters.Type;
export declare function parseProducerDump(data: FbsProducer.DumpResponse): ProducerDump;
export {};
//# sourceMappingURL=Producer.d.ts.map