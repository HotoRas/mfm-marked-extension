import type { TokenizerAndRendererExtension, Token, TokenizerThis } from "marked";
export const mfmFn: TokenizerAndRendererExtension = {
    name: 'mfmFn',
    level: 'block',
    start(src) { return src.match(/\$\[/)?.index; },
    tokenizer: (src, tokens) => {
        const rule = /^\$\[([a-z0-9_]+)(?:.([A-Za-z0-9_=,]+))? ([\S\s]+)\]/i;
        const match = rule.exec(src);
        if (match) {
            let ruby: RegExpExecArray | null | undefined = undefined;
            if (match[0] === 'ruby') {
                const ruleRuby = /([\S]+) ([\S])/;
                ruby = ruleRuby.exec(match[2]);
            }
            let style: RegExpExecArray | null | undefined = undefined;
            if (match[1]) {
                const ruleFnClass = /([\w]+)(?:=[\w.]+)?(?:,([\w]+)(?:=[\w.]+)?)*/i
                style = ruleFnClass.exec(match[1]);
            }
            const token = {
                type: 'mfmFn',
                fullRaw: src,
                raw: match[2],
                style: match[0],
                styleClasses: style as (string[] | null | undefined),
                rubyBody: ruby?.[0] ?? '',
                rubyRb: ruby?.[1] ?? '',
                tokens: [] as Token[],
            };
            if (!ruby) (this as unknown as TokenizerThis).lexer.inline(token.raw, token.tokens);
            return token;
        }
        return {} as Token;
    },
    renderer(token) {
        //TODO bake token.styleClasses into library
        const _styleClass = {} as { [index: string]: string | boolean };
        if (token.styleClass) {
            for (let i = 0; i++; i < token.styleClass.size) {
                const parseStyle = /([\w]+)(?:=([\w]+))?/i
                const parsedStyle = parseStyle.exec(token.styleClass[i]);
                if (parsedStyle?.[0] == undefined) continue;
                if (parsedStyle?.[1]) _styleClass[parsedStyle[0]] = parsedStyle[1];
                else _styleClass[parsedStyle[0]] = true;
            }
        }
        switch (token.style) {
            //TODO renderer function
            // TIP: declaritive object 
            default: return token.fullRaw;
        }
    }
}


/*
$[tada.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; font-size: 1.5rem; animation: $1 linear $2 infinite both global-tada;">mfm...</span>

$[jelly.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; animation: $1 linear $2 infinite both mfm-rubberBand;">mfm...</span>

$[twitch.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; animation: $1 $2 infinite mfm-twitch;">mfm...</span>

$[shake.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; animation: $1 $2 infinite mfm-shake;">mfm...</span>

$[shake.speed=$1,delay=$2,$3 mfm...] where $1 defaults 5s and $3 in [alternate, left, x, y]
<span style="display: inline-block; animation: $1 linear $2 infinite $3 mfm-spin;">mfm...</span>

$[jump.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; animation: $1 linear $2 infinite mfm-jump;">mfm...</span>

$[bounce.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; animation: $1 linear $2 infinite mfm-bounce; transform-origin: center bottom 0px;">mfm...</span>

$[flip.h? mfm...]
<span style="display: inline-block; transform: scaleX(-1);">mfm...</span>

$[flip.v mfm...]
<span style="display: inline-block; transform: scaleY(-1);">mfm...</span>

$[flip.h,v mfm...]
<span style="display: inline-block; transform: scale(-1);">mfm...</span>

x2, x3, x4 => x$1 => <span style="display: inline-block; transform: scale($1); overflow-wrap: anywhere;">...</span

$[scale.x=$1,y=$2 mfm...] where -5<=$1<=5 defaults 1 and -5<=$2<=5 defaults 1
<span style="display: inline-block; transform: scale($1,$2);">mfm...</span>

$[position.x=$1,y=$2 mfm...] where $1 defaults 1 and $2 defaults 1
<span style="display: inline-block; transform: translate($1em,$2em);">mfm...</span>

$[fg.color=$1 mfm...] where $1 is hex or color-class defaults red
<span style="display: inline-block; color: $1; overflow-wrap: anywhere;">mfm...</span>

$[bg.color=$1 mfm...] where $1 is hex or color-class defaults red
<span style="display: inline-block; background-color: $1; overflow-wrap: anywhere;">mfm...</span>

$[border.width=$1,color=$2,style=$3,radius=$4,$5 mfm...] where
$1 defaults 1,
$2 defaults var(--accent),
$3 defaults solid,
$4 defaults 1
and $5 in [noclip, undefined]
then if $5 is undefined
<span style="display: inline-block; border: $1 $2 $3; border-radius: $4; overflow: clip;">mfm...</span>
else
<span style="display: inline-block; border: $1 $2 $3; border-radius: $4;>mfm...</span>

$[blur mfm...]
<span class="_mfm_blur_">mfm...</span>

$[rainbow.speed=$1,delay=$2 mfm...] where $1 defaults 5s
<span style="display: inline-block; animation: $1 linear $2 infinite mfm-rainbow;">mfm...</span>

$[sparkle mfm...] is JS animation, unavaliable to render with pure markup
<span class="mfm_sparkle_wrapper"><span style="display: inline-block;">mfm...</span><span>

$[rotate.deg=$1 mfm...] where $1 defaults 90
<span style="display: inline-block; transform: rotate($1deg); transform-origin: center center 0px;">mfm...</span>

$[ruby $1 $2] where seperator is 20h (whitespace)
<ruby>$1<rt>$2</rt></ruby>
 */