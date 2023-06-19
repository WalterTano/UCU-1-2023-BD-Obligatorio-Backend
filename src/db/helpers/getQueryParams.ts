import { ParsedQs } from 'qs';
import { Result } from '../../types/result';
import { isString } from '../../helpers/isString';

export function getNumericQueryParam(v: string | string[] | ParsedQs | ParsedQs[] | undefined, msg: string): Result<number | undefined> {
    const strRes = getStringQueryParam(v, msg);
    if (!strRes.success) {
        return strRes;
    }

    if (strRes.data === undefined) {
        return { success: true, data: undefined };
    }

    const num = parseInt(strRes.data);
    if (isNaN(num)) {
        return { success: false, errorMessage: msg };
    }

    return { success: true, data: num };
}

export function getNumericArrayQueryParam(v: string | string[] | ParsedQs | ParsedQs[] | undefined, msg: string): Result<number[] | undefined> {
    const strRes = getStringArrayQueryParam(v, msg);
    if (!strRes.success) {
        return strRes;
    }

    if (strRes.data === undefined) {
        return { success: true, data: undefined };
    }

    const nums = strRes.data.map(v => parseInt(v));
    if (nums.some(isNaN)) {
        return { success: false, errorMessage: msg };
    }

    return { success: true, data: nums };
}

export function getStringQueryParam(v: string | string[] | ParsedQs | ParsedQs[] | undefined, msg: string): Result<string | undefined> {
    if (v === undefined) {
        return { success: true, data: undefined };
    }
    
    if (typeof v !== "string") {
        return { success: false, errorMessage: msg };
    }

    return { success: true, data: v };
}

export function getStringArrayQueryParam(v: string | string[] | ParsedQs | ParsedQs[] | undefined, msg: string): Result<string[] | undefined> {
    // undefined
    if (v === undefined) {
        return { success: true, data: undefined };
    }

    // string
    if (typeof v === "string") {
        return { success: true, data: [v] };
    }

    // ParsedQs
    if (!Array.isArray(v)) {
        return { success: false, errorMessage: msg };
    }

    const v2: (string | ParsedQs)[] = v;

    // string[]
    if (v2.every(isString)) {
        return { success: true, data: v2 };
    }

    // ParsedQs[]
    return { success: false, errorMessage: msg };
}