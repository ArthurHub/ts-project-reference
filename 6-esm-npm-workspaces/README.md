Code sample for my [Sharing Code in TypeScript and Project References](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/).

`npm workspaces` is a set of features in the `npm` CLI that supports managing multiple packages within a single, top-level root package. This setup automatically links packages defined in the root `package.json` when running `npm install`. Practically, workspaces place the `node_modules` folder at the root, creating symlinks to all workspace packages.

The resulting folder tree has `node_modules` at the root, with symlinks to the workspace packages:

```
.
├── node_modules
│   ├── libs -> ../libs  (symlink)
│   └── main -> ../main  (symlink)
├── package.json
├── package-lock.json
├── libs
│   ├── src
│   ├── package.json
│   └── tsconfig.json
├── main
│   ├── src
│   ├── package.json
│   └── tsconfig.json
```

This setup allows dependent packages to be imported as regular "node modules," without the need for path aliasing or additional tools. Additionally, the [exports](https://nodejs.org/docs/latest/api/packages.html#main-entry-point-export) field in `package.json` can control code available for import, preventing access to "package-internal" code.

Note: TS project references are still useful for instructing the TS compiler to build referenced packages in the correct order and for build performance with declaration files and incremental builds.

For completeness, here are the `package.json`, `tsconfig.json`, and `main.ts` files:

```json
// common library package.json
{
  "name": "libs",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    "./*": "./dist/*" // package export controls
  }
}
```

```json
// common library tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true
  }
}
```

```json
// main app package.json
{
  "name": "main",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "libs": "1.0.0" // dependency on the common library
  }
}
```

```json
// main app tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
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

```json
// root workspace package.json
{
  "private": true, // must be private
  "name": "root-workspace",
  "workspaces": ["libs", "main"] // the packages to combine in the workspace
}
```

```typescript
// main.ts
import { logMessage } from 'libs/common.js'; // clean import, no aliasing required
logMessage();
```
