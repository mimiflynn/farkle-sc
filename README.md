# Farkle Scorecard

An easy to use scorecard for Farkle so you never need to find pen and paper again.

## Getting Started

This monorepo uses [NPM Workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces?v=true) to run a React or Angular version of the app that share a game logic package. NPM Workspaces requires version 7 and above.

From project root:

```
npm install
```

### React

```
npm run start -w @fsc/react
```

#### Generating Components and Pages

### Angular

```
npm run start -w @fsc/angular
```

#### Generating Components and Pages

```
npm run ng generate component components/<new component name> -w @fsc/angular
```

```
npm run ng generate component pages/<new page name> -w @fsc/angular
```
