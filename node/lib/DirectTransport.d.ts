/// <reference types="node" />
import { BaseTransportDump, BaseTransportStats, Transport, TransportEvents, TransportObserverEvents, TransportConstructorOptions } from './Transport';
import { SctpParameters } from './SctpParameters';
import { AppData } from './types';
import * as FbsDirectTransport from './fbs/direct-transport';
export type DirectTransportOptions<DirectTransportAppData extends AppData = AppData> = {
    /**
     * Maximum allowed size for direct messages sent from DataProducers.
     * Default 262144.
     */
    maxMessageSize: number;
    /**
     * Custom application data.
     */
    appData?: DirectTransportAppData;
};
export type DirectTransportDump = BaseTransportDump;
export type DirectTransportStat = BaseTransportStats & {
    type: string;
};
export type DirectTransportEvents = TransportEvents & {
    rtcp: [Buffer];
};
export type DirectTransportObserverEvents = TransportObserverEvents & {
    rtcp: [Buffer];
};
type DirectTransportConstructorOptions<DirectTransportAppData> = TransportConstructorOptions<DirectTransportAppData> & {
    data: DirectTransportData;
};
export type DirectTransportData = {
    sctpParameters?: SctpParameters;
};
export declare class DirectTransport<DirectTransportAppData extends AppData = AppData> extends Transport<DirectTransportAppData, DirectTransportEvents, DirectTransportObserverEvents> {
    #private;
    /**
     * @private
     */
    constructor(options: DirectTransportConstructorOptions<DirectTransportAppData>);
    /**
     * Close the DirectTransport.
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
    dump(): Promise<DirectTransportDump>;
    /**
     * Get DirectTransport stats.
     *
     * @override
     */
    getStats(): Promise<DirectTransportStat[]>;
    /**
     * NO-OP method in DirectTransport.
     *
     * @override
     */
    connect(): Promise<void>;
    /**
     * @override
     */
    setMaxIncomingBitrate(bitrate: number): Promise<void>;
    /**
     * @override
     */
    setMaxOutgoingBitrate(bitrate: number): Promise<void>;
    /**
     * @override
     */
    setMinOutgoingBitrate(bitrate: number): Promise<void>;
    /**
     * Send RTCP packet.
     */
    sendRtcp(rtcpPacket: Buffer): void;
    private handleWorkerNotifications;
}
export declare function parseDirectTransportDumpResponse(binary: FbsDirectTransport.DumpResponse): BaseTransportDump;
export {};
//# sourceMappingURL=DirectTransport.d.ts.map