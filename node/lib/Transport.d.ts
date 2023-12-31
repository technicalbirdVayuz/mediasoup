import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import { Channel } from './Channel';
import { RouterInternal } from './Router';
import { WebRtcTransportData } from './WebRtcTransport';
import { PlainTransportData } from './PlainTransport';
import { PipeTransportData } from './PipeTransport';
import { DirectTransportData } from './DirectTransport';
import { Producer, ProducerOptions } from './Producer';
import { Consumer, ConsumerOptions } from './Consumer';
import { DataProducer, DataProducerOptions } from './DataProducer';
import { DataConsumer, DataConsumerOptions } from './DataConsumer';
import { RtpCapabilities } from './RtpParameters';
import { SctpParameters } from './SctpParameters';
import { AppData } from './types';
import * as FbsTransport from './fbs/transport';
import { SctpState as FbsSctpState } from './fbs/sctp-association/sctp-state';
export type TransportListenInfo = {
    /**
     * Network protocol.
     */
    protocol: TransportProtocol;
    /**
     * Listening IPv4 or IPv6.
     */
    ip: string;
    /**
     * Announced IPv4 or IPv6 (useful when running mediasoup behind NAT with
     * private IP).
     */
    announcedIp?: string;
    /**
     * Listening port.
     */
    port?: number;
    /**
     * Send buffer size (bytes).
     */
    sendBufferSize?: number;
    /**
     * Recv buffer size (bytes).
     */
    recvBufferSize?: number;
};
/**
 * Use TransportListenInfo instead.
 * @deprecated
 */
export type TransportListenIp = {
    /**
     * Listening IPv4 or IPv6.
     */
    ip: string;
    /**
     * Announced IPv4 or IPv6 (useful when running mediasoup behind NAT with
     * private IP).
     */
    announcedIp?: string;
};
/**
 * Transport protocol.
 */
export type TransportProtocol = 'udp' | 'tcp';
export type TransportTuple = {
    localIp: string;
    localPort: number;
    remoteIp?: string;
    remotePort?: number;
    protocol: TransportProtocol;
};
/**
 * Valid types for 'trace' event.
 */
export type TransportTraceEventType = 'probation' | 'bwe';
/**
 * 'trace' event data.
 */
export type TransportTraceEventData = {
    /**
     * Trace type.
     */
    type: TransportTraceEventType;
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
export type SctpState = 'new' | 'connecting' | 'connected' | 'failed' | 'closed';
export type TransportEvents = {
    routerclose: [];
    listenserverclose: [];
    trace: [TransportTraceEventData];
    '@close': [];
    '@newproducer': [Producer];
    '@producerclose': [Producer];
    '@newdataproducer': [DataProducer];
    '@dataproducerclose': [DataProducer];
    '@listenserverclose': [];
};
export type TransportObserverEvents = {
    close: [];
    newproducer: [Producer];
    newconsumer: [Consumer];
    newdataproducer: [DataProducer];
    newdataconsumer: [DataConsumer];
    trace: [TransportTraceEventData];
};
export type TransportConstructorOptions<TransportAppData> = {
    internal: TransportInternal;
    data: TransportData;
    channel: Channel;
    appData?: TransportAppData;
    getRouterRtpCapabilities: () => RtpCapabilities;
    getProducerById: (producerId: string) => Producer | undefined;
    getDataProducerById: (dataProducerId: string) => DataProducer | undefined;
};
export type TransportInternal = RouterInternal & {
    transportId: string;
};
export type BaseTransportDump = {
    id: string;
    direct: boolean;
    producerIds: string[];
    consumerIds: string[];
    mapSsrcConsumerId: {
        key: number;
        value: string;
    }[];
    mapRtxSsrcConsumerId: {
        key: number;
        value: string;
    }[];
    recvRtpHeaderExtensions: RecvRtpHeaderExtensions;
    rtpListener: RtpListenerDump;
    maxMessageSize: number;
    dataProducerIds: string[];
    dataConsumerIds: string[];
    sctpParameters?: SctpParameters;
    sctpState?: SctpState;
    sctpListener?: SctpListenerDump;
    traceEventTypes?: string[];
};
export type BaseTransportStats = {
    transportId: string;
    timestamp: number;
    sctpState?: SctpState;
    bytesReceived: number;
    recvBitrate: number;
    bytesSent: number;
    sendBitrate: number;
    rtpBytesReceived: number;
    rtpRecvBitrate: number;
    rtpBytesSent: number;
    rtpSendBitrate: number;
    rtxBytesReceived: number;
    rtxRecvBitrate: number;
    rtxBytesSent: number;
    rtxSendBitrate: number;
    probationBytesSent: number;
    probationSendBitrate: number;
    availableOutgoingBitrate?: number;
    availableIncomingBitrate?: number;
    maxIncomingBitrate?: number;
};
type TransportData = WebRtcTransportData | PlainTransportData | PipeTransportData | DirectTransportData;
type RtpListenerDump = {
    ssrcTable: {
        key: number;
        value: string;
    }[];
    midTable: {
        key: number;
        value: string;
    }[];
    ridTable: {
        key: number;
        value: string;
    }[];
};
type SctpListenerDump = {
    streamIdTable: {
        key: number;
        value: string;
    }[];
};
type RecvRtpHeaderExtensions = {
    mid?: number;
    rid?: number;
    rrid?: number;
    absSendTime?: number;
    transportWideCc01?: number;
};
export declare class Transport<TransportAppData extends AppData = AppData, Events extends TransportEvents = TransportEvents, ObserverEvents extends TransportObserverEvents = TransportObserverEvents> extends EnhancedEventEmitter<Events> {
    #private;
    protected readonly internal: TransportInternal;
    protected readonly channel: Channel;
    protected readonly getProducerById: (producerId: string) => Producer | undefined;
    protected readonly getDataProducerById: (dataProducerId: string) => DataProducer | undefined;
    protected readonly consumers: Map<string, Consumer>;
    protected readonly dataProducers: Map<string, DataProducer>;
    protected readonly dataConsumers: Map<string, DataConsumer>;
    /**
     * @private
     * @interface
     */
    constructor({ internal, data, channel, appData, getRouterRtpCapabilities, getProducerById, getDataProducerById }: TransportConstructorOptions<TransportAppData>);
    /**
     * Transport id.
     */
    get id(): string;
    /**
     * Whether the Transport is closed.
     */
    get closed(): boolean;
    /**
     * App custom data.
     */
    get appData(): TransportAppData;
    /**
     * App custom data setter.
     */
    set appData(appData: TransportAppData);
    /**
     * Observer.
     */
    get observer(): EnhancedEventEmitter<ObserverEvents>;
    /**
     * @private
     * Just for testing purposes.
     */
    get channelForTesting(): Channel;
    /**
     * Close the Transport.
     */
    close(): void;
    /**
     * Router was closed.
     *
     * @private
     * @virtual
     */
    routerClosed(): void;
    /**
     * Listen server was closed (this just happens in WebRtcTransports when their
     * associated WebRtcServer is closed).
     *
     * @private
     */
    listenServerClosed(): void;
    /**
     * Dump Transport.
     *
     * @abstract
     */
    dump(): Promise<any>;
    /**
     * Get Transport stats.
     *
     * @abstract
     */
    getStats(): Promise<any[]>;
    /**
     * Provide the Transport remote parameters.
     *
     * @abstract
     */
    connect(params: any): Promise<void>;
    /**
     * Set maximum incoming bitrate for receiving media.
     */
    setMaxIncomingBitrate(bitrate: number): Promise<void>;
    /**
     * Set maximum outgoing bitrate for sending media.
     */
    setMaxOutgoingBitrate(bitrate: number): Promise<void>;
    /**
     * Set minimum outgoing bitrate for sending media.
     */
    setMinOutgoingBitrate(bitrate: number): Promise<void>;
    /**
     * Create a Producer.
     */
    produce<ProducerAppData extends AppData = AppData>({ id, kind, rtpParameters, paused, keyFrameRequestDelay, appData }: ProducerOptions<ProducerAppData>): Promise<Producer<ProducerAppData>>;
    /**
     * Create a Consumer.
     *
     * @virtual
     */
    consume<ConsumerAppData extends AppData = AppData>({ producerId, rtpCapabilities, paused, mid, preferredLayers, ignoreDtx, enableRtx, pipe, appData }: ConsumerOptions<ConsumerAppData>): Promise<Consumer<ConsumerAppData>>;
    /**
     * Create a DataProducer.
     */
    produceData<DataProducerAppData extends AppData = AppData>({ id, sctpStreamParameters, label, protocol, paused, appData }?: DataProducerOptions<DataProducerAppData>): Promise<DataProducer<DataProducerAppData>>;
    /**
     * Create a DataConsumer.
     */
    consumeData<DataConsumerAppData extends AppData = AppData>({ dataProducerId, ordered, maxPacketLifeTime, maxRetransmits, paused, subchannels, appData }: DataConsumerOptions<DataConsumerAppData>): Promise<DataConsumer<DataConsumerAppData>>;
    /**
     * Enable 'trace' event.
     */
    enableTraceEvent(types?: TransportTraceEventType[]): Promise<void>;
    private getNextSctpStreamId;
}
export declare function parseSctpState(fbsSctpState: FbsSctpState): SctpState;
export declare function parseProtocol(protocol: FbsTransport.Protocol): TransportProtocol;
export declare function serializeProtocol(protocol: TransportProtocol): FbsTransport.Protocol;
export declare function parseTuple(binary: FbsTransport.Tuple): TransportTuple;
export declare function parseBaseTransportDump(binary: FbsTransport.Dump): BaseTransportDump;
export declare function parseBaseTransportStats(binary: FbsTransport.Stats): BaseTransportStats;
export declare function parseTransportTraceEventData(trace: FbsTransport.TraceNotification): TransportTraceEventData;
export {};
//# sourceMappingURL=Transport.d.ts.map