# Overlays for OpenAPI

This NodeJS library is an implementation of the in-progress [OpenAPI Overlays Specification](https://github.com/OAI/Overlay-Specification/blob/main/versions/1.0.0.md).

## About Overlays

Overlays are a way to extend or enhance an existing [OpenAPI description](https://www.openapis.org/) by adding, updating or removing fields. For example:

* The OpenAPI description lives in the codebase, but your tech writers need to add examples and information before documentation is produced.
* Your organisation uses OpenAPI but it's generated from code, and needs amendments or additions to be useful to users.
* You're using other tools such as API client generators, that can make use of additional context added to the API description, such as tags to remove certain endpoints, which aren't in the main API description file.

**By using Overlays to describe and apply the changes, when the API description is updated, the same changes can instantly be re-applied.**

## Installation

Install the `overlayjs` command from [npm](https://npmjs.com) with the following command:

```text
npm install -g openapi-overlays-js
```

The `-g` switch installs it globally so you can use the command from anywhere on your system.

> **Pro-tip:** use `node index.js` from the root of the project if you're using the bleeding edge of the project or working on a branch.

## Usage

Example: `overlayjs --openapi openapi.yml --overlay add-sparkle.yaml`

Use `overlayjs --help` to see the usage information.

See [docs/examples](https://github.com/lornajane/openapi-overlays-js/docs/examples/index.md) for more examples.

## Project status

:warning: Project status: alpha

This project is very much at an alpha stage but feedback, comments and questions are all very welcome as issues on this repository - and pull requests are also gratefully received. It would be excellent to hear what problem this tool can solve, and how you get on with it. Bonus points if you can share examples (working or broken) of what you tried.
