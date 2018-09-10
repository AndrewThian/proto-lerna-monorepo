## Using typescript with yarn-workspaces ##

Directory structure:
```
├── README.md
├── package.json
├── packages
│   ├── common
│   │   ├── lib
│   │   │   ├── index.d.ts
│   │   │   ├── index.js
│   │   │   └── index.js.map
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts
│   │   └── tsconfig.json
│   └── server
│       ├── dist
│       │   ├── index.d.ts
│       │   ├── index.js
│       │   └── index.js.map
│       ├── package.json
│       ├── src
│       │   └── index.ts
│       └── tsconfig.json
├── tsconfig.json
└── yarn.lock
```

Previously on `yarn-workspaces` we spoke how defining workspaces in our `package.json` will instruct `yarn` to symlink each defined package within our `packages/*` directory under a project scope(`@<project-scope>/`).

Which then we can reference the added dependencies in our package.json. Then in our individual packages, we are able to call `require("@<project-scope>/package")` on which ever package we might want to include.

This is fantastic! We now have way to manage multiple dependecies in our project as local-self-defined modules.

However, we need an additional level of complexity by including typescript.

## Including a typescript build process ##

We define the similar project structure in each package under the workspaces with an addition `tsconfig.json` file as well as include typescript as a `devDependency` within our `common/package.json`:

```json
{
  "name": "@yarn-workspaces-typescript/common",
  "version": "1.0.0",
  "main": "lib/index",
  "typings": "lib/index",
  "license": "MIT",
  "private": true,
  "devDependencies": {
    "@types/node": "^10.9.4", // <- here
    "typescript": "^3.0.3" // <- here
  },
  "scripts":{
    "clean": "rm -rf ./lib",
    "build": "tsc",
    "build:clean": "npm run clean && tsc",
    "build:watch": "tsc --watch"
  }
}
```

After which we define our `common` package as a dependency within our `server/package.json`.

```json
{
  "name": "@yarn-workspaces-typescript/server",
  "version": "1.0.0",
  "license": "MIT",
  "main": "index.js",
  "private": true,
  "dependencies": {
    "@yarn-workspaces-typescript/common": "1.0.0" // <- here
  },
  "devDependencies": {
    "@types/node": "^10.9.4",
    "ts-node": "^7.0.1",
    "typescript": "^3.0.3"
  },
  "scripts": {
    "start": "ts-node src/index.ts",
    "build": "tsc"
  }
}
```

## Aside knowledge ##

> I figured out that when requiring a dependency from another package(common/package)
> We have to define the "main" and "types" attributes in the package.json

```json
{
    ...
    "main": "lib/index",
    "typings": "lib/index",
    ...
}
```

The reason we have to do this is because when the folder gets hoisted(symlinked) into the parent `node_modules` directory, the entire folder structure goes too. Which means we need a flag for `yarn` to find our code's entry point.

> Another point is that when defining typescript dependecies within our individual package.json, there will be a 
> node_modules folder created with an addition symlink to direct the `tsserver` and `tsc` back to the parent root.

```
node_modules/
└── bin
    ├── tsc -> ../../../../node_modules/typescript/bin/tsc
    └── tsserver -> ../../../../node_modules/typescript/bin/tsservertsserver -> ../../../../node_modules/typescript/bin/tsserver
```

I think this [article](https://medium.com/trabe/monorepo-setup-with-lerna-and-yarn-workspaces-5d747d7c0e91) explains it very well. It states that there are several limitations when using `lerna` and `yarn` but since we are using purely `yarn` here, it also applies to us:

> Packages must declare its devDependencies locally if they want to use binaries in their npm scripts. 
> Otherwise you need to use ../.. and may end having some path related problems.

## Typescript configuration ##

Our configuration for typescript:

```json
// ./package.json
{
    "compilerOptions": {
      "sourceMap": true,
      "removeComments": true,
  
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "noImplicitThis": true,
      "alwaysStrict": true,
  
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true
    }
}
// common/tsconfig.json && server/tsconfig.json
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "moduleResolution": "node",
        "rootDir": "src",
        "outDir": "lib",
        "declaration": true
    }
}
```

We have compiler options to compile into modules using `commonjs` and the modulesResolution of `node`. 

## Conclusion ##

This implementation is very suited for server side code base but unfortunately we need some sort of bundler/rollup for our front-end codebase.