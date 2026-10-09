---
title: Configuration
description: Theme options available under the aube key.
weight: 20
group: Introduction
---
## Colors

```yaml
aube:
  colors:
    primary: '#d43900'
```

## Logo and font

```yaml
aube:
  logo: images/logo.svg
  font:
    family: Inter
```

:::info
Set `font.family` to an empty value to use the system font stack and avoid loading Google Fonts.
:::

## Color mode

```yaml
aube:
  color_mode:
    enabled: true
    default: auto
```

## Footer

```yaml
aube:
  footer:
    text: 'Code released under the MIT license.'
    columns:
      - title: Links
        links:
          - { name: Docs, url: docs }
```

:::warning
Theme options are only defaults: your site configuration always wins.
:::
