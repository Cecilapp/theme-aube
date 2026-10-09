---
title: Getting started
description: Install Cecil and enable the Aube theme.
weight: 10
group: Introduction
---
## Requirements

Cecil requires **PHP 8.1+**.

## Installation

Download the Phar and create a new site:

```bash
curl -LO https://cecil.app/cecil.phar
php cecil.phar new:site
```

## Enable the theme

```bash
composer require cecil/theme-aube
```

Then add `aube` to the `theme` section of your configuration:

```yaml
theme:
  - aube
```

:::tip
Run `php cecil.phar serve` to preview your site locally.
:::

## Next steps

Read the [configuration](configuration.md) page to customize colors, logo and footer.
