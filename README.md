Code sample for my [Sharing Code in TypeScript and Project References](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/).

### tl;dr

- Strategies for sharing code and how they integrate within the TypeScript ecosystem.
- [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html) enable code sharing across multiple TypeScript projects within a single codebase (monorepo), offering modularization, dependency management, and incremental builds.
- The [simple](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/#3-esm) use of Project References is straightforward but can result in cumbersome import paths like `../../../../../libs/dist/data-access/loader/common.js`, which expose the project's internal folder structure.
- This post explores solutions to the import path issue, balancing complexity and elegance:
  - [TypeScript `paths` aliasing](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/#4-esm-with-paths-aliases) adds complexity by requiring extra tooling for runtime import resolution.
  - [Bundlers](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/#5-esm-with-bundler), while somewhat cumbersome, largely resolve these issues and provide production deployment tools.
  - [`npm workspaces`](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/#6-esm-with-npm-workspaces) mimic external `npm` dependencies using symlinks in `node_modules`, addressing import paths without aliasing or extra tooling and enabling package export management for better modularization.
- In conclusion, TypeScript [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html) combined with [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) provide an optimal solution for multi-project code sharing within a single codebase in TypeScript.

[...continue reading](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/)
