"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTraceEventData = exports.Consumer = void 0;
const Logger_1 = require("./Logger");
const EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
const RtpParameters_1 = require("./RtpParameters");
const RtpStream_1 = require("./RtpStream");
const utils = require("./utils");
const notification_1 = require("./fbs/notification");
const common_1 = require("./fbs/common");
const FbsRequest = require("./fbs/request");
const FbsTransport = require("./fbs/transport");
const FbsConsumer = require("./fbs/consumer");
const FbsConsumerTraceInfo = require("./fbs/consumer/trace-info");
const rtp_parameters_1 = require("./fbs/rtp-parameters");
const FbsRtpParameters = require("./fbs/rtp-parameters");
const logger = new Logger_1.Logger('Consumer');
class Consumer extends EnhancedEventEmitter_1.EnhancedEventEmitter {
    // Internal data.
    #internal;
    // Consumer data.
    #data;
    // Channel instance.
    #channel;
    // Closed flag.
    #closed = false;
    // Custom app data.
    #appData;
    // Paused flag.
    #paused = false;
    // Associated Producer paused flag.
    #producerPaused = false;
    // Current priority.
    #priority = 1;
    // Current score.
    #score;
    // Preferred layers.
    #preferredLayers;
    // Curent layers.
    #currentLayers;
    // Observer instance.
    #observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
    /**
     * @private
     */
    constructor({ internal, data, channel, appData, paused, producerPaused, score = { score: 10, producerScore: 10, producerScores: [] }, preferredLayers }) {
        super();
        logger.debug('constructor()');
        this.#internal = internal;
        this.#data = data;
        this.#channel = channel;
        this.#paused = paused;
        this.#producerPaused = producerPaused;
        this.#score = score;
        this.#preferredLayers = preferredLayers;
        this.#appData = appData || {};
        this.handleWorkerNotifications();
    }
    /**
     * Consumer id.
     */
    get id() {
        return this.#internal.consumerId;
    }
    /**
     * Associated Producer id.
     */
    get producerId() {
        return this.#data.producerId;
    }
    /**
     * Whether the Consumer is closed.
     */
    get closed() {
        return this.#closed;
    }
    /**
     * Media kind.
     */
    get kind() {
        return this.#data.kind;
    }
    /**
     * RTP parameters.
     */
    get rtpParameters() {
        return this.#data.rtpParameters;
    }
    /**
     * Consumer type.
     */
    get type() {
        return this.#data.type;
    }
    /**
     * Whether the Consumer is paused.
     */
    get paused() {
        return this.#paused;
    }
    /**
     * Whether the associate Producer is paused.
     */
    get producerPaused() {
        return this.#producerPaused;
    }
    /**
     * Current priority.
     */
    get priority() {
        return this.#priority;
    }
    /**
     * Consumer score.
     */
    get score() {
        return this.#score;
    }
    /**
     * Preferred video layers.
     */
    get preferredLayers() {
        return this.#preferredLayers;
    }
    /**
     * Current video layers.
     */
    get currentLayers() {
        return this.#currentLayers;
    }
    /**
     * App custom data.
     */
    get appData() {
        return this.#appData;
    }
    /**
     * App custom data setter.
     */
    set appData(appData) {
        this.#appData = appData;
    }
    /**
     * Observer.
     */
    get observer() {
        return this.#observer;
    }
    /**
     * @private
     * Just for testing purposes.
     */
    get channelForTesting() {
        return this.#channel;
    }
    /**
     * Close the Consumer.
     */
    close() {
        if (this.#closed) {
            return;
        }
        logger.debug('close()');
        this.#closed = true;
        // Remove notification subscriptions.
        this.#channel.removeAllListeners(this.#internal.consumerId);
        /* Build Request. */
        const requestOffset = new FbsTransport.CloseConsumerRequestT(this.#internal.consumerId).pack(this.#channel.bufferBuilder);
        this.#channel.request(FbsRequest.Method.TRANSPORT_CLOSE_CONSUMER, FbsRequest.Body.Transport_CloseConsumerRequest, requestOffset, this.#internal.transportId).catch(() => { });
        this.emit('@close');
        // Emit observer event.
        this.#observer.safeEmit('close');
    }
    /**
     * Transport was closed.
     *
     * @private
     */
    transportClosed() {
        if (this.#closed) {
            return;
        }
        logger.debug('transportClosed()');
        this.#closed = true;
        // Remove notification subscriptions.
        this.#channel.removeAllListeners(this.#internal.consumerId);
        this.safeEmit('transportclose');
        // Emit observer event.
        this.#observer.safeEmit('close');
    }
    /**
     * Dump Consumer.
     */
    async dump() {
        logger.debug('dump()');
        const response = await this.#channel.request(FbsRequest.Method.CONSUMER_DUMP, undefined, undefined, this.#internal.consumerId);
        /* Decode Response. */
        const data = new FbsConsumer.DumpResponse();
        response.body(data);
        return parseConsumerDumpResponse(data);
    }
    /**
     * Get Consumer stats.
     */
    async getStats() {
        logger.debug('getStats()');
        const response = await this.#channel.request(FbsRequest.Method.CONSUMER_GET_STATS, undefined, undefined, this.#internal.consumerId);
        /* Decode Response. */
        const data = new FbsConsumer.GetStatsResponse();
        response.body(data);
        return parseConsumerStats(data);
    }
    /**
     * Pause the Consumer.
     */
    async pause() {
        logger.debug('pause()');
        const wasPaused = this.#paused || this.#producerPaused;
        await this.#channel.request(FbsRequest.Method.CONSUMER_PAUSE, undefined, undefined, this.#internal.consumerId);
        this.#paused = true;
        // Emit observer event.
        if (!wasPaused) {
            this.#observer.safeEmit('pause');
        }
    }
    /**
     * Resume the Consumer.
     */
    async resume() {
        logger.debug('resume()');
        const wasPaused = this.#paused || this.#producerPaused;
        await this.#channel.request(FbsRequest.Method.CONSUMER_RESUME, undefined, undefined, this.#internal.consumerId);
        this.#paused = false;
        // Emit observer event.
        if (wasPaused && !this.#producerPaused) {
            this.#observer.safeEmit('resume');
        }
    }
    /**
     * Set preferred video layers.
     */
    async setPreferredLayers({ spatialLayer, temporalLayer }) {
        logger.debug('setPreferredLayers()');
        if (typeof spatialLayer !== 'number') {
            throw new TypeError('spatialLayer must be a number');
        }
        if (temporalLayer && typeof temporalLayer !== 'number') {
            throw new TypeError('if given, temporalLayer must be a number');
        }
        const builder = this.#channel.bufferBuilder;
        const preferredLayersOffset = FbsConsumer.ConsumerLayers.createConsumerLayers(builder, spatialLayer, temporalLayer !== undefined ? temporalLayer : null);
        const requestOffset = FbsConsumer.SetPreferredLayersRequest.createSetPreferredLayersRequest(builder, preferredLayersOffset);
        const response = await this.#channel.request(FbsRequest.Method.CONSUMER_SET_PREFERRED_LAYERS, FbsRequest.Body.Consumer_SetPreferredLayersRequest, requestOffset, this.#internal.consumerId);
        /* Decode Response. */
        const data = new FbsConsumer.SetPreferredLayersResponse();
        let preferredLayers;
        // Response is empty for non Simulcast Consumers.
        if (response.body(data)) {
            const status = data.unpack();
            if (status.preferredLayers) {
                preferredLayers =
                    {
                        spatialLayer: status.preferredLayers.spatialLayer,
                        temporalLayer: status.preferredLayers.temporalLayer !== null ?
                            status.preferredLayers.temporalLayer :
                            undefined
                    };
            }
        }
        this.#preferredLayers = preferredLayers;
    }
    /**
     * Set priority.
     */
    async setPriority(priority) {
        logger.debug('setPriority()');
        if (typeof priority !== 'number' || priority < 0) {
            throw new TypeError('priority must be a positive number');
        }
        const requestOffset = FbsConsumer.SetPriorityRequest.createSetPriorityRequest(this.#channel.bufferBuilder, priority);
        const response = await this.#channel.request(FbsRequest.Method.CONSUMER_SET_PRIORITY, FbsRequest.Body.Consumer_SetPriorityRequest, requestOffset, this.#internal.consumerId);
        const data = new FbsConsumer.SetPriorityResponse();
        response.body(data);
        const status = data.unpack();
        this.#priority = status.priority;
    }
    /**
     * Unset priority.
     */
    async unsetPriority() {
        logger.debug('unsetPriority()');
        await this.setPriority(1);
    }
    /**
     * Request a key frame to the Producer.
     */
    async requestKeyFrame() {
        logger.debug('requestKeyFrame()');
        await this.#channel.request(FbsRequest.Method.CONSUMER_REQUEST_KEY_FRAME, undefined, undefined, this.#internal.consumerId);
    }
    /**
     * Enable 'trace' event.
     */
    async enableTraceEvent(types = []) {
        logger.debug('enableTraceEvent()');
        if (!Array.isArray(types)) {
            throw new TypeError('types must be an array');
        }
        if (types.find((type) => typeof type !== 'string')) {
            throw new TypeError('every type must be a string');
        }
        // Convert event types.
        const fbsEventTypes = [];
        for (const eventType of types) {
            try {
                fbsEventTypes.push(consumerTraceEventTypeToFbs(eventType));
            }
            catch (error) {
                logger.warn('enableTraceEvent() | [error:${error}]');
            }
        }
        /* Build Request. */
        const requestOffset = new FbsConsumer.EnableTraceEventRequestT(fbsEventTypes).pack(this.#channel.bufferBuilder);
        await this.#channel.request(FbsRequest.Method.CONSUMER_ENABLE_TRACE_EVENT, FbsRequest.Body.Consumer_EnableTraceEventRequest, requestOffset, this.#internal.consumerId);
    }
    handleWorkerNotifications() {
        this.#channel.on(this.#internal.consumerId, (event, data) => {
            switch (event) {
                case notification_1.Event.CONSUMER_PRODUCER_CLOSE:
                    {
                        if (this.#closed) {
                            break;
                        }
                        this.#closed = true;
                        // Remove notification subscriptions.
                        this.#channel.removeAllListeners(this.#internal.consumerId);
                        this.emit('@producerclose');
                        this.safeEmit('producerclose');
                        // Emit observer event.
                        this.#observer.safeEmit('close');
                        break;
                    }
                case notification_1.Event.CONSUMER_PRODUCER_PAUSE:
                    {
                        if (this.#producerPaused) {
                            break;
                        }
                        const wasPaused = this.#paused || this.#producerPaused;
                        this.#producerPaused = true;
                        this.safeEmit('producerpause');
                        // Emit observer event.
                        if (!wasPaused) {
                            this.#observer.safeEmit('pause');
                        }
                        break;
                    }
                case notification_1.Event.CONSUMER_PRODUCER_RESUME:
                    {
                        if (!this.#producerPaused) {
                            break;
                        }
                        const wasPaused = this.#paused || this.#producerPaused;
                        this.#producerPaused = false;
                        this.safeEmit('producerresume');
                        // Emit observer event.
                        if (wasPaused && !this.#paused) {
                            this.#observer.safeEmit('resume');
                        }
                        break;
                    }
                case notification_1.Event.CONSUMER_SCORE:
                    {
                        const notification = new FbsConsumer.ScoreNotification();
                        data.body(notification);
                        const score = notification.score().unpack();
                        this.#score = score;
                        this.safeEmit('score', score);
                        // Emit observer event.
                        this.#observer.safeEmit('score', score);
                        break;
                    }
                case notification_1.Event.CONSUMER_LAYERS_CHANGE:
                    {
                        const notification = new FbsConsumer.LayersChangeNotification();
                        data.body(notification);
                        const layers = notification.layers() ?
                            parseConsumerLayers(notification.layers()) :
                            undefined;
                        this.#currentLayers = layers;
                        this.safeEmit('layerschange', layers);
                        // Emit observer event.
                        this.#observer.safeEmit('layerschange', layers);
                        break;
                    }
                case notification_1.Event.CONSUMER_TRACE:
                    {
                        const notification = new FbsConsumer.TraceNotification();
                        data.body(notification);
                        const trace = parseTraceEventData(notification);
                        this.safeEmit('trace', trace);
                        // Emit observer event.
                        this.observer.safeEmit('trace', trace);
                        this.safeEmit('trace', trace);
                        // Emit observer event.
                        this.#observer.safeEmit('trace', trace);
                        break;
                    }
                case notification_1.Event.CONSUMER_RTP:
                    {
                        if (this.#closed) {
                            break;
                        }
                        const notification = new FbsConsumer.RtpNotification();
                        data.body(notification);
                        this.safeEmit('rtp', Buffer.from(notification.dataArray()));
                        break;
                    }
                default:
                    {
                        logger.error('ignoring unknown event "%s"', event);
                    }
            }
        });
    }
}
exports.Consumer = Consumer;
function parseTraceEventData(trace) {
    let info;
    if (trace.infoType() !== FbsConsumer.TraceInfo.NONE) {
        const accessor = trace.info.bind(trace);
        info = FbsConsumerTraceInfo.unionToTraceInfo(trace.infoType(), accessor);
        trace.info(info);
    }
    return {
        type: consumerTraceEventTypeFromFbs(trace.type()),
        timestamp: Number(trace.timestamp()),
        direction: trace.direction() === common_1.TraceDirection.DIRECTION_IN ? 'in' : 'out',
        info: info ? info.unpack() : undefined
    };
}
exports.parseTraceEventData = parseTraceEventData;
function consumerTraceEventTypeToFbs(eventType) {
    switch (eventType) {
        case 'keyframe':
            return FbsConsumer.TraceEventType.KEYFRAME;
        case 'fir':
            return FbsConsumer.TraceEventType.FIR;
        case 'nack':
            return FbsConsumer.TraceEventType.NACK;
        case 'pli':
            return FbsConsumer.TraceEventType.PLI;
        case 'rtp':
            return FbsConsumer.TraceEventType.RTP;
        default:
            throw new TypeError(`invalid ConsumerTraceEventType: ${eventType}`);
    }
}
function consumerTraceEventTypeFromFbs(traceType) {
    switch (traceType) {
        case FbsConsumer.TraceEventType.KEYFRAME:
            return 'keyframe';
        case FbsConsumer.TraceEventType.FIR:
            return 'fir';
        case FbsConsumer.TraceEventType.NACK:
            return 'nack';
        case FbsConsumer.TraceEventType.PLI:
            return 'pli';
        case FbsConsumer.TraceEventType.RTP:
            return 'rtp';
        default:
            throw new TypeError(`invalid FbsConsumer.TraceEventType: ${traceType}`);
    }
}
function parseConsumerLayers(data) {
    const spatialLayer = data.spatialLayer();
    const temporalLayer = data.temporalLayer() !== null ? data.temporalLayer() : undefined;
    return {
        spatialLayer,
        temporalLayer
    };
}
function parseRtpStreamParameters(data) {
    return {
        encodingIdx: data.encodingIdx(),
        ssrc: data.ssrc(),
        payloadType: data.payloadType(),
        mimeType: data.mimeType(),
        clockRate: data.clockRate(),
        rid: data.rid().length > 0 ? data.rid() : undefined,
        cname: data.cname(),
        rtxSsrc: data.rtxSsrc() !== null ? data.rtxSsrc() : undefined,
        rtxPayloadType: data.rtxPayloadType() !== null ? data.rtxPayloadType() : undefined,
        useNack: data.useNack(),
        usePli: data.usePli(),
        useFir: data.useFir(),
        useInBandFec: data.useInBandFec(),
        useDtx: data.useDtx(),
        spatialLayers: data.spatialLayers(),
        temporalLayers: data.temporalLayers()
    };
}
function parseRtxStreamParameters(data) {
    return {
        ssrc: data.ssrc(),
        payloadType: data.payloadType(),
        mimeType: data.mimeType(),
        clockRate: data.clockRate(),
        rrid: data.rrid().length > 0 ? data.rrid() : undefined,
        cname: data.cname()
    };
}
function parseRtxStream(data) {
    const params = parseRtxStreamParameters(data.params());
    return {
        params
    };
}
function parseRtpStream(data) {
    const params = parseRtpStreamParameters(data.params());
    let rtxStream;
    if (data.rtxStream()) {
        rtxStream = parseRtxStream(data.rtxStream());
    }
    return {
        params,
        score: data.score(),
        rtxStream
    };
}
function parseBaseConsumerDump(data) {
    return {
        id: data.id(),
        producerId: data.producerId(),
        kind: data.kind() === FbsRtpParameters.MediaKind.AUDIO ?
            'audio' :
            'video',
        rtpParameters: (0, RtpParameters_1.parseRtpParameters)(data.rtpParameters()),
        consumableRtpEncodings: data.consumableRtpEncodingsLength() > 0 ?
            utils.parseVector(data, 'consumableRtpEncodings', RtpParameters_1.parseRtpEncodingParameters) :
            undefined,
        traceEventTypes: utils.parseVector(data, 'traceEventTypes', consumerTraceEventTypeFromFbs),
        supportedCodecPayloadTypes: utils.parseVector(data, 'supportedCodecPayloadTypes'),
        paused: data.paused(),
        producerPaused: data.producerPaused(),
        priority: data.priority()
    };
}
function parseSimpleConsumerDump(data) {
    const base = parseBaseConsumerDump(data.base());
    const rtpStream = parseRtpStream(data.rtpStreams(0));
    return {
        ...base,
        type: 'simple',
        rtpStream
    };
}
function parseSimulcastConsumerDump(data) {
    const base = parseBaseConsumerDump(data.base());
    const rtpStream = parseRtpStream(data.rtpStreams(0));
    return {
        ...base,
        type: 'simulcast',
        rtpStream,
        preferredSpatialLayer: data.preferredSpatialLayer(),
        targetSpatialLayer: data.targetSpatialLayer(),
        currentSpatialLayer: data.currentSpatialLayer(),
        preferredTemporalLayer: data.preferredTemporalLayer(),
        targetTemporalLayer: data.targetTemporalLayer(),
        currentTemporalLayer: data.currentTemporalLayer()
    };
}
function parseSvcConsumerDump(data) {
    const dump = parseSimulcastConsumerDump(data);
    dump.type = 'svc';
    return dump;
}
function parsePipeConsumerDump(data) {
    const base = parseBaseConsumerDump(data.base());
    const rtpStreams = utils.parseVector(data, 'rtpStreams', parseRtpStream);
    return {
        ...base,
        type: 'pipe',
        rtpStreams
    };
}
function parseConsumerDumpResponse(data) {
    const type = data.data().base().type();
    switch (type) {
        case rtp_parameters_1.Type.SIMPLE:
            {
                const dump = new FbsConsumer.ConsumerDump();
                data.data(dump);
                return parseSimpleConsumerDump(dump);
            }
        case rtp_parameters_1.Type.SIMULCAST:
            {
                const dump = new FbsConsumer.ConsumerDump();
                data.data(dump);
                return parseSimulcastConsumerDump(dump);
            }
        case rtp_parameters_1.Type.SVC:
            {
                const dump = new FbsConsumer.ConsumerDump();
                data.data(dump);
                return parseSvcConsumerDump(dump);
            }
        case rtp_parameters_1.Type.PIPE:
            {
                const dump = new FbsConsumer.ConsumerDump();
                data.data(dump);
                return parsePipeConsumerDump(dump);
            }
        default:
            {
                throw new TypeError(`invalid Consumer type: ${type}`);
            }
    }
}
function parseConsumerStats(binary) {
    return utils.parseVector(binary, 'stats', RtpStream_1.parseRtpStreamStats);
}
