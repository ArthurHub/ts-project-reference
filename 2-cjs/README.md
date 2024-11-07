Code sample for my [Sharing Code in TypeScript and Project References](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/).

If we don't want to use the `main` field in favor of a full path, we introduce some import awkwardness. The import must use the relative path to the `outDir` location rather than the TS source files. Initially, this was confusing, but it’s how it works because: (1) when Node.js executes, it only sees the relative location of the output files, and (2) the TS transpilation process doesn’t alter import statements. Both the TS compiler and VSCode understand this and function correctly.

For completeness, here are the `package.json` and `main.ts` files while the `tsconfig.json`s remain unchanged from the previous option:

```json
// common library package.json
{
  "name": "libs" // no "main" field
}
```

```typescript
// main.ts
// import { logMessage } from '../../libs/src/common'; // Cannot find module error
import { logMessage } from '../../libs/dist/common'; // import path points to outDir of the library
logMessage();
```
