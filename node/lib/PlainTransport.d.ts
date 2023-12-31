import { BaseTransportDump, BaseTransportStats, Transport, TransportListenInfo, TransportListenIp, TransportTuple, TransportEvents, TransportObserverEvents, TransportConstructorOptions, SctpState } from './Transport';
import { SctpParameters, NumSctpStreams } from './SctpParameters';
import { SrtpParameters, SrtpCryptoSuite } from './SrtpParameters';
import { AppData, Either } from './types';
import * as FbsPlainTransport from './fbs/plain-transport';
type PlainTransportListenInfo = {
    /**
     * Listening info.
     */
    listenInfo: TransportListenInfo;
    /**
     * Optional listening info for RTCP.
     */
    rtcpListenInfo?: TransportListenInfo;
};
type PlainTransportListenIp = {
    /**
     * Listening IP address.
     */
    listenIp: TransportListenIp | string;
    /**
     * Fixed port to listen on instead of selecting automatically from Worker's port
     * range.
     */
    port?: number;
};
type PlainTransportListen = Either<PlainTransportListenInfo, PlainTransportListenIp>;
export type PlainTransportOptions<PlainTransportAppData extends AppData = AppData> = {
    /**
     * Use RTCP-mux (RTP and RTCP in the same port). Default true.
     */
    rtcpMux?: boolean;
    /**
     * Whether remote IP:port should be auto-detected based on first RTP/RTCP
     * packet received. If enabled, connect() method must not be called unless
     * SRTP is enabled. If so, it must be called with just remote SRTP parameters.
     * Default false.
     */
    comedia?: boolean;
    /**
     * Create a SCTP association. Default false.
     */
    enableSctp?: boolean;
    /**
     * SCTP streams number.
     */
    numSctpStreams?: NumSctpStreams;
    /**
     * Maximum allowed size for SCTP messages sent by DataProducers.
     * Default 262144.
     */
    maxSctpMessageSize?: number;
    /**
     * Maximum SCTP send buffer used by DataConsumers.
     * Default 262144.
     */
    sctpSendBufferSize?: number;
    /**
     * Enable SRTP. For this to work, connect() must be called
     * with remote SRTP parameters. Default false.
     */
    enableSrtp?: boolean;
    /**
     * The SRTP crypto suite to be used if enableSrtp is set. Default
     * 'AES_CM_128_HMAC_SHA1_80'.
     */
    srtpCryptoSuite?: SrtpCryptoSuite;
    /**
     * Custom application data.
     */
    appData?: PlainTransportAppData;
} & PlainTransportListen;
export type PlainTransportStat = BaseTransportStats & {
    type: string;
    rtcpMux: boolean;
    comedia: boolean;
    tuple: TransportTuple;
    rtcpTuple?: TransportTuple;
};
export type PlainTransportEvents = TransportEvents & {
    tuple: [TransportTuple];
    rtcptuple: [TransportTuple];
    sctpstatechange: [SctpState];
};
export type PlainTransportObserverEvents = TransportObserverEvents & {
    tuple: [TransportTuple];
    rtcptuple: [TransportTuple];
    sctpstatechange: [SctpState];
};
type PlainTransportConstructorOptions<PlainTransportAppData> = TransportConstructorOptions<PlainTransportAppData> & {
    data: PlainTransportData;
};
export type PlainTransportData = {
    rtcpMux?: boolean;
    comedia?: boolean;
    tuple: TransportTuple;
    rtcpTuple?: TransportTuple;
    sctpParameters?: SctpParameters;
    sctpState?: SctpState;
    srtpParameters?: SrtpParameters;
};
type PlainTransportDump = BaseTransportDump & {
    rtcpMux: boolean;
    comedia: boolean;
    tuple: TransportTuple;
    rtcpTuple?: TransportTuple;
    srtpParameters?: SrtpParameters;
};
export declare class PlainTransport<PlainTransportAppData extends AppData = AppData> extends Transport<PlainTransportAppData, PlainTransportEvents, PlainTransportObserverEvents> {
    #private;
    /**
     * @private
     */
    constructor(options: PlainTransportConstructorOptions<PlainTransportAppData>);
    /**
     * Transport tuple.
     */
    get tuple(): TransportTuple;
    /**
     * Transport RTCP tuple.
     */
    get rtcpTuple(): TransportTuple | undefined;
    /**
     * SCTP parameters.
     */
    get sctpParameters(): SctpParameters | undefined;
    /**
     * SCTP state.
     */
    get sctpState(): SctpState | undefined;
    /**
     * SRTP parameters.
     */
    get srtpParameters(): SrtpParameters | undefined;
    /**
     * Close the PlainTransport.
     *
     * @override
     */
    close(): void;
    /**
     * Router was closed.
     *
     * @private
     * @override
     */
    routerClosed(): void;
    /**
     * Dump Transport.
     */
    dump(): Promise<PlainTransportDump>;
    /**
     * Get PlainTransport stats.
     *
     * @override
     */
    getStats(): Promise<PlainTransportStat[]>;
    /**
     * Provide the PlainTransport remote parameters.
     *
     * @override
     */
    connect({ ip, port, rtcpPort, srtpParameters }: {
        ip?: string;
        port?: number;
        rtcpPort?: number;
        srtpParameters?: SrtpParameters;
    }): Promise<void>;
    private handleWorkerNotifications;
}
export declare function parsePlainTransportDumpResponse(binary: FbsPlainTransport.DumpResponse): PlainTransportDump;
export {};
//# sourceMappingURL=PlainTransport.d.ts.map