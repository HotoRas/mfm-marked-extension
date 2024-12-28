export declare namespace mfmFnToken {
    function parseTime(timeText: string): string;

    export function parseSpeedDelay(_class: string, raw: string, isLinear: boolean, style?: {[index: string]: string | boolean}, additionalOptions?: string, additionalAnimationParam?: string): string;
    
    export function tada(raw: string, style?: {[index: string]: string | boolean}): string;

    export function jelly(raw: string, style?: {[index: string]: string | boolean}): string;

    export function twitch(raw: string, style?: {[index: string]: string | boolean}): string;

    export function shake(raw: string, style?: {[index: string]: string | boolean}): string;

    export function spin(raw: string, style?: {[index: string]: string | boolean}): string;

    export function jump(raw: string, style?: {[index: string]: string | boolean}): string;

    export function bounce(raw: string, style?: {[index: string]: string | boolean}): string;

    export function rainbow(raw: string, style?: {[index: string]: string | boolean}): string;

    export function flip(raw: string, style?: {[index: string]: string | boolean}): string;

    export function xN(raw: string, times: number): string;

    export function scale(raw: string, style?: {[index: string]: string | boolean}): string;

    export function color(raw: string, isFg: boolean, style?: {[index: string]: string | boolean}): string;

    export function border(raw: string, style?: {[index: string]: string | boolean}): string;

    export function blur(raw: string): string;

    export function rotate(raw: string, style?: {[index: string]: string | boolean}): string;

    export function ruby(rbMain: string, rbRb: string): string;
}

export {};