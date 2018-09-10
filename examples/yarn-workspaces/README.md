## Pure Yarn workspace ##

Directory structure:
```
├── README.md
├── package.json
├── packages
│   ├── common
│   │   ├── index.js
│   │   └── package.json
│   └── server
│       ├── index.js
│       └── package.json
└── yarn.lock
```

**Steps:**
1. we define a workspace via package.json:

```json
# ./package.json
{
    "private": true,
    "workspaces": [
        "packages/*"
    ]
}
```

2. define package name with `@package-name/subpackge` scope:

```json
{
  "name": "@proto-lerna-monorepo/common",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

3. define dependencies in requiring package by `@package-name/subpackage` naming structure:

```json
{
  "name": "@proto-lerna-monorepo/server",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@proto-lerna-monorepo/common": "1.0.0"
  }
}
```

4. running `yarn install` now automatically symlinks the the subpackages as a dependency in parent `node_modules` via hoisting of dependencies:

```
./@proto-lerna-monorepo
├── common -> ../../packages/common
└── server -> ../../packages/server
```

5. Any external dependencies also get hoisted up to the parent `node_modules`

## References ##

- following ben awad's [youtube](https://www.youtube.com/watch?v=G8KXFWftCg0&t=1s) tutorial
- and his respective github like for the [examples](https://github.com/benawad/yarn-workspaces-example)