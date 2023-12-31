import { ProducerType } from './Producer';
import { Type as FbsRtpParametersType } from './fbs/rtp-parameters';
/**
 * Clones the given value.
 */
export declare function clone<T>(value: T): T;
/**
 * Generates a random UUID v4.
 */
export declare function generateUUIDv4(): string;
/**
 * Generates a random positive integer.
 */
export declare function generateRandomNumber(): number;
/**
 * Get the flatbuffers RtpParameters type for a given Producer.
 */
export declare function getRtpParametersType(producerType: ProducerType, pipe: boolean): FbsRtpParametersType;
/**
 * Parse flatbuffers vector into an array of the given type.
 */
export declare function parseVector<Type>(binary: any, methodName: string, parseFn?: (binary2: any) => Type): Type[];
/**
 * Parse flatbuffers vector of StringString into the corresponding array.
 */
export declare function parseStringStringVector(binary: any, methodName: string): {
    key: string;
    value: string;
}[];
/**
 * Parse flatbuffers vector of StringUint8 into the corresponding array.
 */
export declare function parseStringUint8Vector(binary: any, methodName: string): {
    key: string;
    value: number;
}[];
/**
 * Parse flatbuffers vector of Uint16String into the corresponding array.
 */
export declare function parseUint16StringVector(binary: any, methodName: string): {
    key: number;
    value: string;
}[];
/**
 * Parse flatbuffers vector of Uint32String into the corresponding array.
 */
export declare function parseUint32StringVector(binary: any, methodName: string): {
    key: number;
    value: string;
}[];
/**
 * Parse flatbuffers vector of StringStringArray into the corresponding array.
 */
export declare function parseStringStringArrayVector(binary: any, methodName: string): {
    key: string;
    values: string[];
}[];
//# sourceMappingURL=utils.d.ts.map