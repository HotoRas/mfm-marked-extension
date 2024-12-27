export namespace mfmFnToken {
    function parseTime(timeText: string): string {
        if(timeText.endsWith('s')) return timeText.replace('s', '');
        if(timeText.endsWith('m')) return (Number(timeText.replace('m', '')) * 60).toString();
        return '5';
    }

    export function parseSpeedDelay(_class: string, raw: string, isLinear: boolean, style?: {[index: string]: string | boolean}, additionalOptions?: string, additionalAnimationParam?: string): string {
        let speed: number; let delay: number | undefined;
        speed = style?.['speed'] && style['speed'] !== true 
            ? Number(parseTime(style['speed'])) : 5;
        delay = style?.['delay'] && style['delay'] !== true
            ? Number(parseTime(style['delay'])) : undefined;
        
        return `<span style="display: inline-block; ${additionalOptions} animation: ${speed} ${isLinear ? 'linear' : ''} ${delay} infinite ${additionalAnimationParam} ${_class};">${raw}</span>`;
    }
    
    export function tada(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('global-tada', raw, true, style, 'font-size: 1.5rem;', 'both');
    }

    export function jelly(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('mfm-rubberBand', raw, true, style);
    }

    export function twitch(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('mfm-twitch', raw, false, style);
    }

    export function shake(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('mfm-shake', raw, false, style);
    }

    export function spin(raw: string, style?: {[index: string]: string | boolean}): string {
        let opt: string | undefined;
        if (style) {
            if (style['alternate']) opt = 'alternate';
            if (style['left']) opt = 'left';
            if (style['x']) opt = 'x';
            if (style['y']) opt = 'y';
        }
        return parseSpeedDelay('mfm-spin', raw, true, style, undefined, opt);
    }

    export function jump(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('mfm-jump', raw, true, style);
    }

    export function bounce(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('mfm-bounce', raw, true, style, 'transform-origin: center bottom 0px;');
    }

    export function rainbow(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('mfm-rainbow', raw, true, style);
    }

    export function flip(raw: string, style?: {[index: string]: string | boolean}): string {
        let mode: string;
        if (style?.['h'] && style?.['y']) mode = 'scale';
        else if (!style || style?.['h']) mode = 'scaleX';
        else mode = 'scaleY';

        return `<span style="display: inline-block; transform: ${mode}(-1);">${raw}</span>`;
    }

    export function xN(raw: string, times: number): string {
        return `<span style="display: inline-block; transform: scaleX(${times}); overflow-wrap: anywhere;">${raw}</span>`;
    }

    export function scale(raw: string, style?: {[index: string]: string | boolean}): string {
        // truncate
        let x: number;
        if (!style?.['x']) x = 1; else try {
            x = Number(style['x']);
        } catch {
            x = 1;
        }
        if (x < -5) x = -5;
        if (x > 5) x = 5;
        let y: number;
        if (!style?.['y']) y = 1; else try {
            y = Number(style['y']);
        } catch {
            y = 1;
        }
        if (y < -5) y = -5;
        if (y > 5) y = 5;

        return `<span style="display: inline-block; transform: scale(${x}, ${y});">${raw}</span>`
    }

    export function color(raw: string, isFg: boolean, style?: {[index: string]: string | boolean}): string {
        return `<span style="display: inline-block; ${isFg ? '' : 'background-'}color: ${style?.['color'] ?? 'red'}; overflow-wrap: anywhere;>${raw}</span>`
    }

    export function border(raw: string, style?: {[index: string]: string | boolean}): string {
        return `<span style="display: inline-block; border: ${style?.['width'] ?? 1} ${style?.['color'] ?? `var(--accent)`} ${style?.['style'] ?? 'solid'} ${style?.['radius'] ?? 1};${style?.['noclip'] ? ' overflow: clip;' : ''};>${raw}</span>`;
    }

    export function blur(raw: string): string { return `<span class="_mfm_blur_">${raw}</span>`; }

    export function rotate(raw: string, style?: {[index: string]: string | boolean}): string {
        return `<span style="display: inline-block; transform: rotate(${style?.['deg'] ?? 90}deg); transform-origin: center center 0px;">${raw}</span>`;
    }

    export function ruby(rbMain: string, rbRb: string): string {
        return `<ruby>${rbMain}<rt>${rbRb}</rt></ruby>`;
    }
};