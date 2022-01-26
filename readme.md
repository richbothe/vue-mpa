
# Custom Vue 3 Multi Page Application Project

This project features:

> * Webpack 5 (requires Node.js v14.15.5 or later)
> * Bootstrap 5
> * VueJs 3

*Src: https://developpaper.com/building-multi-page-programs-using-webpack/*

***

## Getting started

1. Run `npm install` to install the project dependencies.

2. Run `npm run build` to create a production build.

3. Run `npm run start` to start the project in development mode.

***

## Adding pages

1. Copy the `boilerplate` folder located in /src/pages.
2. Rename the copied folder to the name of the new page.
3. Inside the new folder, open App.vue and:
    > - Set the `<h1>` to the name of the page.
    >
    > - Change the `name` option value in the export default {} object to the name of the page.
4. Stop the dev server if running, then run `npm run build` to generate the file in dist.
5. Restart the dev server `npm run start`.

***
## Notes
The use of Vue components, assets and aliases should all work as expected.