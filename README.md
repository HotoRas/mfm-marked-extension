# mfm-marked-extension

An MFM parser as for an extension of markdown,
written with TypeScript.

MFM Copyright (C) syuilo and Misskey project

## Install

`npm i mfm-marked-extension`

## Usage

```mjs
// 1: Apply each of rules seperatedly
import { marked } from "marked";
import { markedMfmFn, markedMfmMention } from "mfm-marked-extension";

marked.use({extensions: [markedMfmFn, markedMfmMention]});

marked.parse('$[tada hello!]');
// <p><span style="display: inline-block; font-size: 1.5rem; animation: 5s linear infinite both global-tada;">hello!</span></p>
```

```mjs
// 2: Auto-implement all the rules at once
import { mfm4marked } from "mfm-marked-extension";

const marked = mfm4marked.marked();
// use this as of 'marked'

// if cjs, you can use like this:
// const marked = (await require('mfm-marked-extension')).mfm4marked.marked();
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