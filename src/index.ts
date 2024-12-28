import { Marked } from 'marked';
import { mfmFn as markedMfm } from './utils/renderer';
import { mfmFnToken as markedMfmParser } from './utils/token';

export namespace mfm4marked {
    export function marked(): Marked {
        return new Marked({extensions: [markedMfm]});
    }

    export function parse(src: string): string | Promise<string> {
        const marked = new Marked({extensions: [markedMfm]});
        return marked.parse(src);
    }
}

export { markedMfm, markedMfmParser };