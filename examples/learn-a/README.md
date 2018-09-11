## Monorepos with Lerna ##

Just using `lerna` for monorepos. We globally install `lerna` with yarn(*to lead into the yarn-workspaces usage*).

In our referenced tutorial, the author is using `lerna@2.9.0` which supports using `lerna add <package>` with the `--hoist` flag. However, as of `3.3.0` the `--hoist` flag is scope to only `lerna bootstrap`.

**Adding external dependency**
as of `3.3.0` there are 3 options:

Option 1:
> 1. use `lerna add <package>`(optional with a `--scoped` flag to specific projects)
> 2. `lerna bootstrap --hoist` to hoist all dependencies.

Option 2:
> 1. if hoisting `npm i <dependency>` in root
> 2. `lerna bootstrap` in root.

Option 3:
> 1. edit target package.json, adding the dependency (if hoisting just copy the line from modified root package.json)
> 2. Run `lerna bootstrap` in root.


**Removing external dependency**
- Edit target package.json, removing dependency directly.
- Run `lerna bootstrap` in the root of the monorepo.

## References ##

lerna's author comments on how to [add/remove](https://github.com/lerna/lerna/issues/1229#issuecomment-360575720) external dependencies

Currently following along with this [example](https://codeburst.io/monorepos-by-example-part-1-3a883b49047e)