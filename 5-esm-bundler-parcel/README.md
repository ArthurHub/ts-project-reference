Code sample for my [Sharing Code in TypeScript and Project References](https://theartofdev.com/2024/11/07/sharing-code-in-typescript-and-project-references/).

Another option to resolve paths alias issues in Node.js is to bypass it entirely by bundling the TS files into a single `bundle.js` file. At runtime, all code will be in the single bundle, eliminating the need for import resolutions. With bundler support, the TS `paths` configuration works without extra complexity. I found [Parcel](https://parceljs.org/) to be the easiest, zero-config bundler with excellent TypeScript support.

Using a bundler is a solid solution to the paths aliasing problem. Moreover, bundlers offer [additional benefits](https://parceljs.org/features/production/) and are often needed for production anyway. However, after testing multiple tools to handle `paths` and observing how infrequently they worked out-of-the-box, I suspect bundling is only a partial solution, as similar issues might still arise with other tools like testing and linting.

To use Parcel, install it and run it on the source entry point TS file:

```bash
npm install -D parcel
parcel build src/main.ts --dist-dir bundle
```
