Code sample for my [Sharing Code in TypeScript and Project References](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/).

To address the import path issue, I looked into [TypeScript paths](https://www.typescriptlang.org/tsconfig/#paths) to create a mapping that shortens the import path and hides the project structure. The problem is that the TS compiler doesn’t modify emitted JavaScript code[^6], so Node.js requires additional runtime support to resolve modules.

There are a few workaround solutions, such as loaders and executers, which I’ll explain here. Bundlers are discussed in the next section. Unfortunately, Node.js [Subpath imports](https://nodejs.org/api/packages.html#subpath-imports) don’t work here because they require all source files to be under the same package ([example](https://github.com/ArthurHub/ts-project-reference/tree/main/ex-2-esm-paths-alias-imports)).

**Executers** (see [example](https://github.com/ArthurHub/ts-project-reference/tree/main/4-esm-paths-alias-tsx))

Another approach is to avoid Node.js's lack of support for TS paths by using executors that transpile TS code at runtime, thus managing module resolution within TypeScript. There are [several options](https://github.com/privatenumber/ts-runtime-comparison?tab=readme-ov-file) available. I, like [others](https://gist.github.com/ggemre/83219067c5fc0623e92e086e45fe4e8e), found [tsx](https://tsx.is/) the fastest and simplest. Running `tsx` is as easy as `tsx src/main.ts`, with no compilation required, and it points directly to the TS code.

However, running transpilation at runtime in production seems excessive to me (though [not everyone agrees](https://www.reddit.com/r/node/comments/16lvmr0/do_you_transpile_typescript_in_server_contexts/)). It’s excellent for development since it’s very fast, but for production, we’re back to square one.

Here are changes from the previous option to use `paths`:

```json
// main app tsconfig.json
{
  "compilerOptions": {
    ...
    "baseUrl": "./src", // needed to define the root of relative paths
    "paths": {
      "@libs/*": ["../../libs/src/*"] // path mappings with wildcards
    }
  }
}
```

```typescript
// main.ts
import { logMessage } from '@libs/common.js'; // nice and clean import
logMessage();
```
