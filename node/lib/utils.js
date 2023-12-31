"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStringStringArrayVector = exports.parseUint32StringVector = exports.parseUint16StringVector = exports.parseStringUint8Vector = exports.parseStringStringVector = exports.parseVector = exports.getRtpParametersType = exports.generateRandomNumber = exports.generateUUIDv4 = exports.clone = void 0;
const node_crypto_1 = require("node:crypto");
const rtp_parameters_1 = require("./fbs/rtp-parameters");
/**
 * Clones the given value.
 */
function clone(value) {
    if (value === undefined) {
        return undefined;
    }
    else if (Number.isNaN(value)) {
        return NaN;
    }
    else if (typeof structuredClone === 'function') {
        // Available in Node >= 18.
        return structuredClone(value);
    }
    else {
        return JSON.parse(JSON.stringify(value));
    }
}
exports.clone = clone;
/**
 * Generates a random UUID v4.
 */
function generateUUIDv4() {
    return (0, node_crypto_1.randomUUID)();
}
exports.generateUUIDv4 = generateUUIDv4;
/**
 * Generates a random positive integer.
 */
function generateRandomNumber() {
    return (0, node_crypto_1.randomInt)(100_000_000, 999_999_999);
}
exports.generateRandomNumber = generateRandomNumber;
/**
 * Get the flatbuffers RtpParameters type for a given Producer.
 */
function getRtpParametersType(producerType, pipe) {
    if (pipe) {
        return rtp_parameters_1.Type.PIPE;
    }
    switch (producerType) {
        case 'simple':
            return rtp_parameters_1.Type.SIMPLE;
        case 'simulcast':
            return rtp_parameters_1.Type.SIMULCAST;
        case 'svc':
            return rtp_parameters_1.Type.SVC;
    }
}
exports.getRtpParametersType = getRtpParametersType;
/**
 * Parse flatbuffers vector into an array of the given type.
 */
function parseVector(binary, methodName, parseFn) {
    const array = [];
    for (let i = 0; i < binary[`${methodName}Length`](); ++i) {
        if (parseFn) {
            array.push(parseFn(binary[methodName](i)));
        }
        else {
            array.push(binary[methodName](i));
        }
    }
    return array;
}
exports.parseVector = parseVector;
/**
 * Parse flatbuffers vector of StringString into the corresponding array.
 */
function parseStringStringVector(binary, methodName) {
    const array = [];
    for (let i = 0; i < binary[`${methodName}Length`](); ++i) {
        const kv = binary[methodName](i);
        array.push({ key: kv.key(), value: kv.value() });
    }
    return array;
}
exports.parseStringStringVector = parseStringStringVector;
/**
 * Parse flatbuffers vector of StringUint8 into the corresponding array.
 */
function parseStringUint8Vector(binary, methodName) {
    const array = [];
    for (let i = 0; i < binary[`${methodName}Length`](); ++i) {
        const kv = binary[methodName](i);
        array.push({ key: kv.key(), value: kv.value() });
    }
    return array;
}
exports.parseStringUint8Vector = parseStringUint8Vector;
/**
 * Parse flatbuffers vector of Uint16String into the corresponding array.
 */
function parseUint16StringVector(binary, methodName) {
    const array = [];
    for (let i = 0; i < binary[`${methodName}Length`](); ++i) {
        const kv = binary[methodName](i);
        array.push({ key: kv.key(), value: kv.value() });
    }
    return array;
}
exports.parseUint16StringVector = parseUint16StringVector;
/**
 * Parse flatbuffers vector of Uint32String into the corresponding array.
 */
function parseUint32StringVector(binary, methodName) {
    const array = [];
    for (let i = 0; i < binary[`${methodName}Length`](); ++i) {
        const kv = binary[methodName](i);
        array.push({ key: kv.key(), value: kv.value() });
    }
    return array;
}
exports.parseUint32StringVector = parseUint32StringVector;
/**
 * Parse flatbuffers vector of StringStringArray into the corresponding array.
 */
function parseStringStringArrayVector(binary, methodName) {
    const array = [];
    for (let i = 0; i < binary[`${methodName}Length`](); ++i) {
        const kv = binary[methodName](i);
        const values = [];
        for (let i2 = 0; i2 < kv.valuesLength(); ++i2) {
            values.push(kv.values(i2));
        }
        array.push({ key: kv.key(), values });
    }
    return array;
}
exports.parseStringStringArrayVector = parseStringStringArrayVector;
