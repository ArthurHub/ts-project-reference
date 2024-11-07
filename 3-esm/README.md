Code sample for my [Sharing Code in TypeScript and Project References](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/).

ESM ([ECMAScript Modules](https://tc39.es/ecma262/#sec-modules)) is the standard, future module system and offers significant advantages[^5]. Therefore, I wanted to focus on making it work correctly. It mostly requires small changes, but it’s essential to configure everything accurately to ensure all packages use the correct module type and module resolution method. Similar to CJS, the relative paths to the library’s output folder are awkward and can quickly get out of hand: `../../../../../libs/dist/data-access/loader/common.js`. They also require updates if the project structure changes. Still, this setup is simple, needs no additional tooling, and works effectively.

For completeness, here are the `package.json`, `tsconfig.json`, and `main.ts` files:

```json
// common library package.json
{
  "name": "libs",
  "type": "module" // define the package as ESM
}
```

```json
// common library tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16", // latest stable module spec
    "moduleResolution": "Node16",
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
    "target": "ES2022",
    "module": "Node16", // latest stable module spec
    "moduleResolution": "Node16",
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
import { logMessage } from '../../libs/dist/common.js';
logMessage();
```
