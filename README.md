# mfm-marked-extension

An MFM parser as for an extension of markdown,
written with TypeScript.

MFM Copyright (C) syuilo and Misskey project

## Install

`npm i mfm-marked-extension`

## Usage

```mjs
import { marked } from "marked";
import { markedMfm } from "mfm-marked-extension";

marked.use({extensions: [markedMfm]});

marked.parse('$[tada hello!]');
// <p><span style="display: inline-block; font-size: 1.5rem; animation: 5s linear infinite both global-tada;">hello!</span></p>
```

```mjs
import { mfm4marked } from "mfm-marked-extension";

const marked = mfm4marked.marked();
// use this as of 'marked';
```

## Develop

1. Clone the repository
2. Install packages:
  - npm: `npm i`
  - pnpm: `pnpm i`
3. Build components
  - `npm run build`
  - `pnpm build`

## License

This software is released under the MIT License.