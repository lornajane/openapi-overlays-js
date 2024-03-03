# Update `info.description`

A common task, to update a description in an OpenAPI document.
This is useful to add a meaningful description to a generated OpenAPI file, or to adjust a description to match a transformed OpenAPI document (perhaps after doing some overlay-powered surgery).

> [!TIP]
> Overlays operate on objects, not single primitive fields such as strings.
> So to update the `info.description`, target `info` and update `description` within it.

## Overlay

An overlay that targets the `info` section and updates it with a new multiline Markdown `description` field.

```yaml
overlay: 1.0.0
info:
  title: Overlay to update the description
  version: 0.1.0
actions:
- target: $.info
  update:
    description: >-
      A meaningful description for your API helps users to understand how to
      get started with your platform. Description fields support Markdown and
      the `>-` notation at the start makes this multiline Markdown.

      You can link to your [project README](https://github.com/lornajane/openapi-overlays-js)
      or other resources from here as well.
```

## OpenAPI

Simplest OpenAPI file I can think of:

```yaml
openapi: 3.1.0
info:
  title: Example API
  version: 1.0.0
paths:
  /example:
    get:
      responses:
        '200':
          description: A simple example response
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
```

## Updated OpenAPI

After overlaying:

```yaml
openapi: 3.1.0
info:
  title: Example API
  version: 1.0.0
  description: >-
    A meaningful description for your API helps users to understand how to get
    started with your platform. Description fields support Markdown and the `>-`
    notation at the start makes this multiline Markdown.

    You can link to your [project
    README](https://github.com/lornajane/openapi-overlays-js) or other resources
    from here as well.
paths:
  /example:
    get:
      responses:
        '200':
          description: A simple example response
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
```
