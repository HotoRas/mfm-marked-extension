import { Marked } from 'marked';
import { mfmFn } from './utils/renderer';
import { mfmFnToken } from './utils/token';

export namespace markedMfm {
    export function marked(): Marked {
        return new Marked({extensions: [mfmFn]});
    }

    export function parse(src: string): string | Promise<string> {
        const marked = new Marked({extensions: [mfmFn]});
        return marked.parse(src);
    }
}

export { mfmFn, mfmFnToken };