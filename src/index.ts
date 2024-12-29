import { Marked } from 'marked';
import {
    mfmFn as markedMfmFn,
    mfmMention as markedMfmMention,
} from './utils/renderer';
import {
    mfmFnToken as markedMfmFnParser,
    mfmMentionToken as markedMfmMentionParser,
} from './utils/token';

export namespace mfm4marked {
    export function marked(): Marked {
        return new Marked({extensions: [markedMfmFn, markedMfmMention]});
    }

    export function parse(src: string): string | Promise<string> {
        const marked = new Marked({extensions: [markedMfmFn, markedMfmMention]});
        return marked.parse(src);
    }
}

export {
    markedMfmFn,
    markedMfmMention,
    markedMfmFnParser,
    markedMfmMentionParser,
};