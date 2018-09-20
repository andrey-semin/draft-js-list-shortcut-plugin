# Draft.js List Shortcut Plugin

*This is a plugin for the [`draft-js-plugins-editor`](https://www.draft-js-plugins.com/), a plugin system that sits on top of Draft.js.*

This plugin provides the functionality to start a working with a list with a shortcut - you can press `*{space}` to start unordered list or `1.{space}` to start ordered one.

![demo](https://github.com/andrey-semin/draft-js-list-shortcut-plugin/raw/master/preview.gif)

## Usage
```sh
npm i --save draft-js-list-shortcut-plugin
```

then import the plugin creator function and create an instance of the plugin

```js
import createListShortcutPlugin from 'draft-js-list-shortcut-plugin'
const listShortcutPlugin = createListShortcutPlugin()
```

The plugin now can then be passed into a `draft-js-plugins-editor` component:

```js
import createListShortcutPlugin from 'draft-js-list-shortcut-plugin'
import Editor from 'draft-js-plugins-editor'

const listShortcutPlugin = createListShortcutPlugin()
const plugins = [listShortcutPlugin]

<Editor plugins={plugins} />
```