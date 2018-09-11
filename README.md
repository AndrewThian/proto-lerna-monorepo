## Sharing core/adjacent libs with other packages ##

We currently have a large repo that needs refactoring. Trying to maintain a multiple repos in our case is proving to slightly tedious as everyone rathers all the code be stored in a single location for ease of access.

However, we must not give up good practices of dealing with larger repos. Thus, I've embarkded on a small crusade into understanding how monorepos work in the wild. Examples and case studies of "good" monorepo systems are:

- [babel](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)
- [react](https://github.com/facebook/react/tree/master/packages)
- [angular](https://github.com/angular/angular/tree/master/modules)

Their reasoning behind such design is as such *according to babel's monorepo design doc*:
**Pros:**
- Single lint, build, test and release process
- Easy to coordinate changes across modules
- single place to report issues
- easier to setup a dev environment
- test across modules are run together which finds bugs that touch multiple modules easier(I reckon our current architecture would greatly appreciate this.)

**Cons:**
- More intimidating codebase
- larger repo(considering we check in our assets as well, there will be a time where we exceed the github softcap and require git LFS to manage our work)
- ??? (anything else?)

## Using yarn workspaces with lerna? Is that a good thing ##

Well, Dan Abramov seems to think so because it handles hoisting of dependencies much better. Can check out his twitter thread [here](https://twitter.com/dan_abramov/status/951931842273398784)

We can use workspaces feature(yarn) with or without Lerna. When both `yarn` and `lerna` are used together, Lerna delegates the dependencies management to Yarn. 

## What this github does ## 

Basically to serve as a POC with lerna and yarn. 

This repo has currently 3 seperate examples on how each POC works:

- `learn-a` a pure lerna implementation to serve as a start point. It has `lerna`, `jest` and some `webpack` as rollup.

- `yarn-workspace` is a pure yarn workspace exploration and example project on what yarn-workspaces and how to work with them.
    - `yarn-worksapce-typescript` is a typescript example implementation of the previous `yarn-workspace` directory. A good idea to read `yarn-workspace` first.