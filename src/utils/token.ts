/**
 * Token parser namespace for MFM Fn
 */
export namespace mfmFnToken {
    function parseTime(timeText: string): string {
        if(timeText.endsWith('s')) return timeText.replace('s', '');
        if(timeText.endsWith('m')) return (Number(timeText.replace('m', '')) * 60).toString();
        return '5';
    }

    /**
     * Parse the MFM animation using speed and delay as its parameters
     * @param _class MFM animation class to be rendered. Can be extended with CSS.
     * @param raw RAW internal value
     * @param isLinear If the animation should be linear, let it `true`. Otherwise `false`.
     * @param style Animation parameters be set. \
     * Only `speed` and `delay` are parsed in here, so you should parse externally if you want others be accepted.
     * @param additionalOptions Additional CSS style options will be in here.
     * @param additionalAnimationParam Additional CSS animation parameters be set here.
     */
    export function parseSpeedDelay(_class: string, raw: string, isLinear: boolean, style?: {[index: string]: string | boolean}, additionalOptions?: string, additionalAnimationParam?: string): string {
        let speed: number; let delay: number | undefined;
        speed = style?.['speed'] && style['speed'] !== true 
            ? Number(parseTime(style['speed'])) : 5;
        delay = style?.['delay'] && style['delay'] !== true
            ? Number(parseTime(style['delay'])) : undefined;
        
        return `<span style="display: inline-block; ${additionalOptions} animation: ${speed}s ${isLinear ? 'linear' : ''} ${delay ? `${delay}s` : ''} infinite ${additionalAnimationParam} ${_class};">${raw}</span>`;
    }
    
    /**
     * MFM $[tada]
     * @param raw Internal raw value.
     * @param style Animation parameters.
     */
    export function tada(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('global-tada', raw, true, style, 'font-size: 1.5rem;', 'both');
    }

    /**
     * MFM $[jelly]
     * @param raw Internal raw value.
     * @param style Animation parameters.
     */
    export function jelly(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('mfm-rubberBand', raw, true, style);
    }

    /**
     * MFM $[twitch]
     * @param raw Internal raw value.
     * @param style Animation parameters.
     */
    export function twitch(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('mfm-twitch', raw, false, style);
    }

    /**
     * MFM $[shake]
     * @param raw Internal raw value.
     * @param style Animation parameters.
     */
    export function shake(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('mfm-shake', raw, false, style);
    }

    /**
     * MFM $[spin]
     * @param raw Internal raw value.
     * @param style Animation parameters.
     */
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

    /**
     * MFM $[jump]
     * @param raw Internal raw value.
     * @param style Animation parameters.
     */
    export function jump(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('mfm-jump', raw, true, style);
    }

    /**
     * MFM $[bounce]
     * @param raw Internal raw value.
     * @param style Animation parameters.
     */
    export function bounce(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('mfm-bounce', raw, true, style, 'transform-origin: center bottom 0px;');
    }

    /**
     * MFM $[rainbow]
     * @param raw Internal raw value.
     * @param style Animation parameters.
     */
    export function rainbow(raw: string, style?: {[index: string]: string | boolean}): string {
        return parseSpeedDelay('mfm-rainbow', raw, true, style);
    }

    /**
     * MFM $[flip]
     * @param raw Internal raw value.
     * @param style Animation parameters.
     */
    export function flip(raw: string, style?: {[index: string]: string | boolean}): string {
        let mode: string;
        if (style?.['h'] && style?.['y']) mode = 'scale';
        else if (!style || style?.['h']) mode = 'scaleX';
        else mode = 'scaleY';

        return `<span style="display: inline-block; transform: ${mode}(-1);">${raw}</span>`;
    }

    /**
     * MFM $[x2], $[x3], $[x4]
     * @param raw Internal raw value.
     * @param times set this in {2..4}
     */
    export function xN(raw: string, times: number): string {
        return `<span class="mfm-x${times}">${raw}</span>`;
    }

    /**
     * MFM $[scale]
     * @param raw Internal raw value.
     * @param style Scale value. Should be `string`, but should be able to parse into Number.
     * ```ts
     * { x: string, y: string }
     * ```
     * Floats are accepted. Must be in between -5 and 5.
     */
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

    /**
     * MFM $[fg] and $[bg]
     * @param raw Internal raw value.
     * @param isFg `true` if $[fg], `false` if $[bg]
     * @param style Color set. Value must be in CSS. \
     * Casting `rgb()` or `rgba()` is accepted in this function, but doesn't in actual MFM.
     * ```ts
     * { color: string }
     * ```
     */
    export function color(raw: string, isFg: boolean, style?: {[index: string]: string | boolean}): string {
        return `<span style="display: inline-block; ${isFg ? '' : 'background-'}color: ${style?.['color'] ?? 'red'}; overflow-wrap: anywhere;>${raw}</span>`
    }

    /**
     * MFM $[border]
     * @param raw Internal raw value.
     * @param style CSS Border style value set. If `noclip`, additional `overflow: clip;` is accepted.
     * ```ts
     * { width: string, color: string, style: string, radius: string, noclip: boolean }
     * // border: width color style radius;
     * ```
     */
    export function border(raw: string, style?: {[index: string]: string | boolean}): string {
        return `<span style="display: inline-block; border: ${style?.['width'] ?? 1} ${style?.['color'] ?? `var(--accent)`} ${style?.['style'] ?? 'solid'} ${style?.['radius'] ?? 1};${style?.['noclip'] ? ' overflow: clip;' : ''}">${raw}</span>`;
    }

    /**
     * MFM $[blur]
     * @param raw Internal raw value.
     */
    export function blur(raw: string): string { return `<span class="_mfm_blur_">${raw}</span>`; }

    /**
     * MFM $[rotate]
     * @param raw Internal raw value.
     * @param style Transform options. `deg` should be string, but the value must be number. \
     * Float-style is accepted.
     * ```ts
     * { deg: string }
     * ```
     */
    export function rotate(raw: string, style?: {[index: string]: string | boolean}): string {
        return `<span style="display: inline-block; transform: rotate(${style?.['deg'] ?? 90}deg); transform-origin: center center 0px;">${raw}</span>`;
    }

    /**
     * MFM $[ruby]
     * @param rbMain Main content that be ruby-ed
     * @param rbRt Content of ruby, the RubyText(`<rt>`)
     */
    export function ruby(rbMain: string, rbRt: string): string {
        return `<ruby>${rbMain}<rt>${rbRt}</rt></ruby>`;
    }
};

/**
 * Token parser namespace for MFM mention
 */
export namespace mfmMentionToken {
    /**
     * MFM `@mention`. Since outta instance, instance URI should be provided.
     * @param account Account name of the fediverse ID.
     * @param instance Instance URI of the fediverse.
     */
    export function mentionFediverse(account: string, instance: string): string {
        return `<a href="https://${instance}/${account}" title="@${account}@{instance}">@${account}<span style="opacity: 0.7; &:hover { opacity: 0.85; }">@${instance}</span></a>`
    }
}