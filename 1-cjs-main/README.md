Code sample for my [Sharing Code in TypeScript and Project References](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/).

The simplest setup, with all basics needed for TS project references. However, the import relative path exposes the project structure, and with deeper file trees, this results in cumbersome imports like `../../../../../../libs`.  
Note: `tsc` needs a `--build` flag to handle project references during the build, enabling it to track and build referenced packages if required.

For completeness, here are the `package.json`, `tsconfig.json`, and `main.ts` files:

```json
// common library package.json
{
  "name": "libs",
  "main": "dist/common.js" // for folder dependency
}
```

```json
// common library tsconfig.json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true // marks the package as project reference for tsc
  }
}
```

```json
// main app tsconfig.json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "references": [
    {
      "path": "../libs" // reference for tsc on the common library
    }
  ]
}
```

```typescript
// main.ts
import { logMessage } from '../../libs';
logMessage();
```
