"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebRtcServer = void 0;
const Logger_1 = require("./Logger");
const EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
const utils = require("./utils");
const request_1 = require("./fbs/request");
const FbsWorker = require("./fbs/worker");
const FbsWebRtcServer = require("./fbs/web-rtc-server");
const logger = new Logger_1.Logger('WebRtcServer');
class WebRtcServer extends EnhancedEventEmitter_1.EnhancedEventEmitter {
    // Internal data.
    #internal;
    // Channel instance.
    #channel;
    // Closed flag.
    #closed = false;
    // Custom app data.
    #appData;
    // Transports map.
    #webRtcTransports = new Map();
    // Observer instance.
    #observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
    /**
     * @private
     */
    constructor({ internal, channel, appData }) {
        super();
        logger.debug('constructor()');
        this.#internal = internal;
        this.#channel = channel;
        this.#appData = appData || {};
    }
    /**
     * WebRtcServer id.
     */
    get id() {
        return this.#internal.webRtcServerId;
    }
    /**
     * Whether the WebRtcServer is closed.
     */
    get closed() {
        return this.#closed;
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
    get webRtcTransportsForTesting() {
        return this.#webRtcTransports;
    }
    /**
     * Close the WebRtcServer.
     */
    close() {
        if (this.#closed) {
            return;
        }
        logger.debug('close()');
        this.#closed = true;
        // Build the request.
        const requestOffset = new FbsWorker.CloseWebRtcServerRequestT(this.#internal.webRtcServerId).pack(this.#channel.bufferBuilder);
        this.#channel.request(request_1.Method.WORKER_WEBRTCSERVER_CLOSE, request_1.Body.Worker_CloseWebRtcServerRequest, requestOffset)
            .catch(() => { });
        // Close every WebRtcTransport.
        for (const webRtcTransport of this.#webRtcTransports.values()) {
            webRtcTransport.listenServerClosed();
            // Emit observer event.
            this.#observer.safeEmit('webrtctransportunhandled', webRtcTransport);
        }
        this.#webRtcTransports.clear();
        this.emit('@close');
        // Emit observer event.
        this.#observer.safeEmit('close');
    }
    /**
     * Worker was closed.
     *
     * @private
     */
    workerClosed() {
        if (this.#closed) {
            return;
        }
        logger.debug('workerClosed()');
        this.#closed = true;
        // NOTE: No need to close WebRtcTransports since they are closed by their
        // respective Router parents.
        this.#webRtcTransports.clear();
        this.safeEmit('workerclose');
        // Emit observer event.
        this.#observer.safeEmit('close');
    }
    /**
     * Dump WebRtcServer.
     */
    async dump() {
        logger.debug('dump()');
        const response = await this.#channel.request(request_1.Method.WEBRTCSERVER_DUMP, undefined, undefined, this.#internal.webRtcServerId);
        /* Decode Response. */
        const dump = new FbsWebRtcServer.DumpResponse();
        response.body(dump);
        return parseWebRtcServerDump(dump);
    }
    /**
     * @private
     */
    handleWebRtcTransport(webRtcTransport) {
        this.#webRtcTransports.set(webRtcTransport.id, webRtcTransport);
        // Emit observer event.
        this.#observer.safeEmit('webrtctransporthandled', webRtcTransport);
        webRtcTransport.on('@close', () => {
            this.#webRtcTransports.delete(webRtcTransport.id);
            // Emit observer event.
            this.#observer.safeEmit('webrtctransportunhandled', webRtcTransport);
        });
    }
}
exports.WebRtcServer = WebRtcServer;
function parseIpPort(binary) {
    return {
        ip: binary.ip(),
        port: binary.port()
    };
}
function parseIceUserNameFragment(binary) {
    return {
        localIceUsernameFragment: binary.localIceUsernameFragment(),
        webRtcTransportId: binary.webRtcTransportId()
    };
}
function parseTupleHash(binary) {
    return {
        tupleHash: Number(binary.tupleHash()),
        webRtcTransportId: binary.webRtcTransportId()
    };
}
function parseWebRtcServerDump(data) {
    return {
        id: data.id(),
        udpSockets: utils.parseVector(data, 'udpSockets', parseIpPort),
        tcpServers: utils.parseVector(data, 'tcpServers', parseIpPort),
        webRtcTransportIds: utils.parseVector(data, 'webRtcTransportIds'),
        localIceUsernameFragments: utils.parseVector(data, 'localIceUsernameFragments', parseIceUserNameFragment),
        tupleHashes: utils.parseVector(data, 'tupleHashes', parseTupleHash)
    };
}
