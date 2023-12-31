import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import { Channel } from './Channel';
import { RouterInternal } from './Router';
import { Producer } from './Producer';
import { AppData } from './types';
export type RtpObserverEvents = {
    routerclose: [];
    '@close': [];
};
export type RtpObserverObserverEvents = {
    close: [];
    pause: [];
    resume: [];
    addproducer: [Producer];
    removeproducer: [Producer];
};
export type RtpObserverConstructorOptions<RtpObserverAppData> = {
    internal: RtpObserverObserverInternal;
    channel: Channel;
    appData?: RtpObserverAppData;
    getProducerById: (producerId: string) => Producer | undefined;
};
export type RtpObserverObserverInternal = RouterInternal & {
    rtpObserverId: string;
};
export type RtpObserverAddRemoveProducerOptions = {
    /**
     * The id of the Producer to be added or removed.
     */
    producerId: string;
};
export declare class RtpObserver<RtpObserverAppData extends AppData = AppData, Events extends RtpObserverEvents = RtpObserverEvents> extends EnhancedEventEmitter<Events> {
    #private;
    protected readonly internal: RtpObserverObserverInternal;
    protected readonly channel: Channel;
    protected readonly getProducerById: (producerId: string) => Producer | undefined;
    /**
     * @private
     * @interface
     */
    constructor({ internal, channel, appData, getProducerById }: RtpObserverConstructorOptions<RtpObserverAppData>);
    /**
     * RtpObserver id.
     */
    get id(): string;
    /**
     * Whether the RtpObserver is closed.
     */
    get closed(): boolean;
    /**
     * Whether the RtpObserver is paused.
     */
    get paused(): boolean;
    /**
     * App custom data.
     */
    get appData(): RtpObserverAppData;
    /**
     * App custom data setter.
     */
    set appData(appData: RtpObserverAppData);
    /**
     * Observer.
     */
    get observer(): EnhancedEventEmitter<RtpObserverObserverEvents>;
    /**
     * Close the RtpObserver.
     */
    close(): void;
    /**
     * Router was closed.
     *
     * @private
     */
    routerClosed(): void;
    /**
     * Pause the RtpObserver.
     */
    pause(): Promise<void>;
    /**
     * Resume the RtpObserver.
     */
    resume(): Promise<void>;
    /**
     * Add a Producer to the RtpObserver.
     */
    addProducer({ producerId }: RtpObserverAddRemoveProducerOptions): Promise<void>;
    /**
     * Remove a Producer from the RtpObserver.
     */
    removeProducer({ producerId }: RtpObserverAddRemoveProducerOptions): Promise<void>;
}
//# sourceMappingURL=RtpObserver.d.ts.map