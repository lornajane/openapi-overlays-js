The maintainers file is instructions for maintainers on operating the project.
Especially useful for things that don't need to be done often!

## Releasing a package version

1. Update `package.json` with the new version number, and merge this change to the main branch.

2. Tag the main branch with the new version `git tag -a v0.1.0 -m "Release version 0.1.0"`.

3. Push the tag to the repo: `git push origin v0.1.0`.

4. Publish to npm: `npm publish`.
