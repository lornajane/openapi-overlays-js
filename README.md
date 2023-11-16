# Overlays for OpenAPI

This NodeJS library is an implementation of the in-progress [OpenAPI Overlays Specification](https://github.com/OAI/Overlay-Specification/blob/main/versions/1.0.0.md).

## About Overlays

Overlays are a way to extend or enhance an existing [OpenAPI description](https://www.openapis.org/) by adding, updating or removing fields. For example:

* The OpenAPI description lives in the codebase, but your tech writers need to add examples and information before documentation is produced.
* Your organisation uses OpenAPI but it's generated from code, and needs amendments or additions to be useful to users.
* You're using other tools such as API client generators, that can make use of additional context added to the API description, such as tags to remove certain endpoints, which aren't in the main API description file.

**By using Overlays to describe and apply the changes, when the API description is updated, the same changes can instantly be re-applied.**

## Installation

This project isn't published as a package yet, so:

* Clone this repo
* Run `npm install` to get the dependencies
* Run `npm install -g` to get `overlayjs` as a command

> **Pro-tip:** you can also use `node index.js` from the root of the project if you don't want to install a global command.

## Usage

Example: `overlayjs --openapi openapi.yml --overlay add-sparkle.yaml`

Use `overlayjs --help` to see the usage information.

## Project status

This project is very much at idea stage but feedback, comments and questions are all very welcome as issues on this repository - and pull requests are also gratefully received. It would be excellent to hear what problem this tool can solve, and how you get on with it. Bonus points if you can share examples (working or broken) of what you tried.

:warning: please be aware that absolutely anything may change at any time, it would probably be safest to pin to a specific commit for now.
