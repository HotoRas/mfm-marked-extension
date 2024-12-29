import type { TokenizerAndRendererExtension, Token, TokenizerThis } from "marked";
import { mfmFnToken, mfmMentionToken } from "./token";

/**
 * MFM class Fn ($[...]) tokenizer and renderer
 */
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
            case 'tada': return mfmFnToken.tada(token.raw, _styleClass);
            case 'jelly': return mfmFnToken.jelly(token.raw, _styleClass);
            case 'twitch': return mfmFnToken.twitch(token.raw, _styleClass);
            case 'shake': return mfmFnToken.shake(token.raw, _styleClass);
            case 'spin': return mfmFnToken.spin(token.raw, _styleClass);
            case 'jump': return mfmFnToken.jump(token.raw, _styleClass);
            case 'bounce': return mfmFnToken.bounce(token.raw, _styleClass);
            case 'rainbow': return mfmFnToken.rainbow(token.raw, _styleClass);
            case 'flip': return mfmFnToken.flip(token.raw, _styleClass);
            case 'x2': return mfmFnToken.xN(token.raw, 2);
            case 'x3': return mfmFnToken.xN(token.raw, 3);
            case 'x4': return mfmFnToken.xN(token.raw, 4);
            case 'scale': return mfmFnToken.scale(token.raw, _styleClass);
            case 'fg': return mfmFnToken.color(token.raw, true, _styleClass);
            case 'bg': return mfmFnToken.color(token.raw, false, _styleClass);
            case 'border': return mfmFnToken.border(token.raw, _styleClass);
            case 'blur': return mfmFnToken.blur(token.raw);
            case 'rotate': return mfmFnToken.rotate(token.raw, _styleClass);
            case 'ruby': return mfmFnToken.ruby(token.rubyBody, token.rubyRb);
            default: return token.fullRaw;
        }

        // not executed but
        return token.fullRaw;
    }
}

/**
 * MFM class `@mention` tokenizer and renderer
 */
export const mfmMention: TokenizerAndRendererExtension = {
    name: 'mfmMention',
    level: 'inline',
    start(src) { return src.match(/@/)?.index; },
    tokenizer: (src, tokens) => {
        const rule = /^@([a-z0-9._-]+)@([a-z0-9._-]+)/;
        const match = rule.exec(src);
        if (match) {
            const token = {
                type: 'mfmMention',
                raw: src,
                userId: match[0],
                userInstance: match[1],
            };
            return token;
        }
        return {} as Token;
    },
    renderer(token) {
        return mfmMentionToken.mentionFediverse(token.userId, token.userInstance);
    }
}