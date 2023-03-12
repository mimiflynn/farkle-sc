# Angular Farkle Scorecard

## `ng` and NPM Workspaces

In order to use the local `ng` command from the root of the repository, the workspace must be specified:

```
npm run ng -w @fsc/angular add @ngrx/store@latest
```

## NGRX

In addition to porting the React version of Farkle Scorecard to Angular, I added global state management using [NGRX](https://ngrx.io/). After this port is finished, I'll refactor the React app to share the state logic used here.
