Code sample for my [Sharing Code in TypeScript and Project References](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/).

To address the import path issue, I looked into [TypeScript paths](https://www.typescriptlang.org/tsconfig/#paths) to create a mapping that shortens the import path and hides the project structure. The problem is that the TS compiler doesn’t modify emitted JavaScript code[^6], so Node.js requires additional runtime support to resolve modules.

There are a few workaround solutions, such as loaders and executers, which I’ll explain here. Bundlers are discussed in the next section. Unfortunately, Node.js [Subpath imports](https://nodejs.org/api/packages.html#subpath-imports) don’t work here because they require all source files to be under the same package ([example](https://github.com/ArthurHub/ts-project-reference/tree/main/ex-2-esm-paths-alias-imports)).

**Custom loader** (see [example](https://github.com/ArthurHub/ts-project-reference/tree/main/4-esm-paths-alias))

This approach handles path aliasing at runtime. It corrects the relative path using configuration in `package.json` (like [esm-module-alias](https://www.npmjs.com/package/esm-module-alias)), parsing `tsconfig.json` (like [ts-paths-esm-loader](https://www.npmjs.com/package/ts-paths-esm-loader)), or a [custom loader](https://github.com/ArthurHub/ts-project-reference/tree/main/ex-3-esm-custom-loader) to allow custom handling.

To use a custom loader, specify it to Node.js with: `node --loader=ts-paths-esm-loader --no-warnings`. The warning adds to my unease about this solution.

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
