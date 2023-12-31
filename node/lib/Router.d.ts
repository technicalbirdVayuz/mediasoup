import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import { Channel } from './Channel';
import { Transport, TransportListenInfo, TransportListenIp } from './Transport';
import { WebRtcTransport, WebRtcTransportOptions } from './WebRtcTransport';
import { PlainTransport, PlainTransportOptions } from './PlainTransport';
import { PipeTransport, PipeTransportOptions } from './PipeTransport';
import { DirectTransport, DirectTransportOptions } from './DirectTransport';
import { Producer } from './Producer';
import { Consumer } from './Consumer';
import { DataProducer } from './DataProducer';
import { DataConsumer } from './DataConsumer';
import { RtpObserver } from './RtpObserver';
import { ActiveSpeakerObserver, ActiveSpeakerObserverOptions } from './ActiveSpeakerObserver';
import { AudioLevelObserver, AudioLevelObserverOptions } from './AudioLevelObserver';
import { RtpCapabilities, RtpCodecCapability } from './RtpParameters';
import { NumSctpStreams } from './SctpParameters';
import { AppData, Either } from './types';
import * as FbsRouter from './fbs/router';
export type RouterOptions<RouterAppData extends AppData = AppData> = {
    /**
     * Router media codecs.
     */
    mediaCodecs?: RtpCodecCapability[];
    /**
     * Custom application data.
     */
    appData?: RouterAppData;
};
type PipeToRouterListenInfo = {
    listenInfo: TransportListenInfo;
};
type PipeToRouterListenIp = {
    /**
     * IP used in the PipeTransport pair. Default '127.0.0.1'.
     */
    listenIp?: TransportListenIp | string;
};
type PipeToRouterListen = Either<PipeToRouterListenInfo, PipeToRouterListenIp>;
export type PipeToRouterOptions = {
    /**
     * The id of the Producer to consume.
     */
    producerId?: string;
    /**
     * The id of the DataProducer to consume.
     */
    dataProducerId?: string;
    /**
     * Target Router instance.
     */
    router: Router;
    /**
     * Create a SCTP association. Default true.
     */
    enableSctp?: boolean;
    /**
     * SCTP streams number.
     */
    numSctpStreams?: NumSctpStreams;
    /**
     * Enable RTX and NACK for RTP retransmission.
     */
    enableRtx?: boolean;
    /**
     * Enable SRTP.
     */
    enableSrtp?: boolean;
} & PipeToRouterListen;
export type PipeToRouterResult = {
    /**
     * The Consumer created in the current Router.
     */
    pipeConsumer?: Consumer;
    /**
     * The Producer created in the target Router.
     */
    pipeProducer?: Producer;
    /**
     * The DataConsumer created in the current Router.
     */
    pipeDataConsumer?: DataConsumer;
    /**
     * The DataProducer created in the target Router.
     */
    pipeDataProducer?: DataProducer;
};
export type RouterDump = {
    /**
     * The Router id.
     */
    id: string;
    /**
     * Id of Transports.
     */
    transportIds: string[];
    /**
     * Id of RtpObservers.
     */
    rtpObserverIds: string[];
    /**
     * Array of Producer id and its respective Consumer ids.
     */
    mapProducerIdConsumerIds: {
        key: string;
        values: string[];
    }[];
    /**
     * Array of Consumer id and its Producer id.
     */
    mapConsumerIdProducerId: {
        key: string;
        value: string;
    }[];
    /**
     * Array of Producer id and its respective Observer ids.
     */
    mapProducerIdObserverIds: {
        key: string;
        values: string[];
    }[];
    /**
     * Array of Producer id and its respective DataConsumer ids.
     */
    mapDataProducerIdDataConsumerIds: {
        key: string;
        values: string[];
    }[];
    /**
     * Array of DataConsumer id and its DataProducer id.
     */
    mapDataConsumerIdDataProducerId: {
        key: string;
        value: string;
    }[];
};
type PipeTransportPair = {
    [key: string]: PipeTransport;
};
export type RouterEvents = {
    workerclose: [];
    '@close': [];
};
export type RouterObserverEvents = {
    close: [];
    newtransport: [Transport];
    newrtpobserver: [RtpObserver];
};
export type RouterInternal = {
    routerId: string;
};
type RouterData = {
    rtpCapabilities: RtpCapabilities;
};
export declare class Router<RouterAppData extends AppData = AppData> extends EnhancedEventEmitter<RouterEvents> {
    #private;
    /**
     * @private
     */
    constructor({ internal, data, channel, appData }: {
        internal: RouterInternal;
        data: RouterData;
        channel: Channel;
        appData?: RouterAppData;
    });
    /**
     * Router id.
     */
    get id(): string;
    /**
     * Whether the Router is closed.
     */
    get closed(): boolean;
    /**
     * RTP capabilities of the Router.
     */
    get rtpCapabilities(): RtpCapabilities;
    /**
     * App custom data.
     */
    get appData(): RouterAppData;
    /**
     * App custom data setter.
     */
    set appData(appData: RouterAppData);
    /**
     * Observer.
     */
    get observer(): EnhancedEventEmitter<RouterObserverEvents>;
    /**
     * @private
     * Just for testing purposes.
     */
    get transportsForTesting(): Map<string, Transport>;
    /**
     * Close the Router.
     */
    close(): void;
    /**
     * Worker was closed.
     *
     * @private
     */
    workerClosed(): void;
    /**
     * Dump Router.
     */
    dump(): Promise<RouterDump>;
    /**
     * Create a WebRtcTransport.
     */
    createWebRtcTransport<WebRtcTransportAppData extends AppData = AppData>({ webRtcServer, listenInfos, listenIps, port, enableUdp, enableTcp, preferUdp, preferTcp, initialAvailableOutgoingBitrate, enableSctp, numSctpStreams, maxSctpMessageSize, sctpSendBufferSize, appData }: WebRtcTransportOptions<WebRtcTransportAppData>): Promise<WebRtcTransport<WebRtcTransportAppData>>;
    /**
     * Create a PlainTransport.
     */
    createPlainTransport<PlainTransportAppData extends AppData = AppData>({ listenInfo, rtcpListenInfo, listenIp, port, rtcpMux, comedia, enableSctp, numSctpStreams, maxSctpMessageSize, sctpSendBufferSize, enableSrtp, srtpCryptoSuite, appData }: PlainTransportOptions<PlainTransportAppData>): Promise<PlainTransport<PlainTransportAppData>>;
    /**
     * Create a PipeTransport.
     */
    createPipeTransport<PipeTransportAppData extends AppData = AppData>({ listenInfo, listenIp, port, enableSctp, numSctpStreams, maxSctpMessageSize, sctpSendBufferSize, enableRtx, enableSrtp, appData }: PipeTransportOptions<PipeTransportAppData>): Promise<PipeTransport<PipeTransportAppData>>;
    /**
     * Create a DirectTransport.
     */
    createDirectTransport<DirectTransportAppData extends AppData = AppData>({ maxMessageSize, appData }?: DirectTransportOptions<DirectTransportAppData>): Promise<DirectTransport<DirectTransportAppData>>;
    /**
     * Pipes the given Producer or DataProducer into another Router in same host.
     */
    pipeToRouter({ producerId, dataProducerId, router, listenInfo, listenIp, enableSctp, numSctpStreams, enableRtx, enableSrtp }: PipeToRouterOptions): Promise<PipeToRouterResult>;
    /**
     * @private
     */
    addPipeTransportPair(pipeTransportPairKey: string, pipeTransportPairPromise: Promise<PipeTransportPair>): void;
    /**
     * Create an ActiveSpeakerObserver
     */
    createActiveSpeakerObserver<ActiveSpeakerObserverAppData extends AppData = AppData>({ interval, appData }?: ActiveSpeakerObserverOptions<ActiveSpeakerObserverAppData>): Promise<ActiveSpeakerObserver<ActiveSpeakerObserverAppData>>;
    /**
     * Create an AudioLevelObserver.
     */
    createAudioLevelObserver<AudioLevelObserverAppData extends AppData = AppData>({ maxEntries, threshold, interval, appData }?: AudioLevelObserverOptions<AudioLevelObserverAppData>): Promise<AudioLevelObserver<AudioLevelObserverAppData>>;
    /**
     * Check whether the given RTP capabilities can consume the given Producer.
     */
    canConsume({ producerId, rtpCapabilities }: {
        producerId: string;
        rtpCapabilities: RtpCapabilities;
    }): boolean;
}
export declare function parseRouterDumpResponse(binary: FbsRouter.DumpResponse): RouterDump;
export {};
//# sourceMappingURL=Router.d.ts.map