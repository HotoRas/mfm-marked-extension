import type { MarkedToken, Tokens as MarkedTokens } from 'marked';

export type TokenNotMarked = (
    MfmTokens.Search |
    MfmTokens.Center |
    MfmTokens.Emoji |
    MfmTokens.Mention |
    MfmTokens.Fn
);
export type MfmMarkedToken = (TokenNotMarked | MarkedToken);

export type Token = (MfmMarkedToken | MarkedTokens.Generic);

export declare namespace MfmTokens {
    interface Search {
        type: 'search';
        raw: string;
        text: string;
    }
    interface Center {
        type: 'center';
        raw: string;
        text: string;
        tokens: Token[];
    }
    interface Emoji {
        type: 'emoji';
        raw: string;
        url: string; // :emoji_nAm2@instance.url: -> parse()
    }
    interface Mention {
        type: 'mention';
        raw: string;
        text: string;
        host: string;
    }
    interface Fn {
        type: 'mfmFunction';
        raw: string;
        function: {
            name: string;
            args: Record<string, string|true>;
        };
        tokens: Token[];
    }
}