# Iconito
SVG icon management for React

## Intro
Iconito lets you store your SVG icons in a single definition file as symbols so you can use them with references.

## Getting started

### Installation  
`npm i iconito`

### Configuration
Icon definitions are stored as symbols in a single SVG file. You have two options to pass the desired path of the definitions to the configuration.  
Add either `.iconitorc` file in the root of your project  
```json
{
  "definitions": "src/assets/icons/icon-definitions.svg"
}
```

Or add a field in your `package.json`
```json
"iconito": {
  "definitions": "src/assets/icons/icon-definitions.svg"
}
```

## Usage

### Adding icons

Add icons to the definitions with
```sh
npx iconito add ~/path/to/icon.svg icon-name
```

Or directly calling the script
```sh
./node_modules/.bin/iconito add ~/path/to/icon.svg icon-name
```

It will optimize the svg file with [SVGO](https://github.com/svg/svgo), strip the colors by default and add an `id` to the symbol
so it can be referenced later with  
```<use href={`#${icon}`} />```

The definitions file will end up with something like this
```xml
<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
  <symbol viewBox="0 0 24 24" id="icon-name"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/></symbol>
</svg>
```

By default Iconito will replace the colors of the icon with `currentColor`, so you can apply a color with CSS. It will take the nearest `color` (text color).
If you want to preserve original colors, pass `--keepColors` while adding the icon.

### Initialization

For the icon symbols to be available in DOM, you should pass the contents of the file to the `initIcons` function. Getting the contents of the definition file depends on your build system/bundler.  
If you are using Parcel, you can import the file with `bundle-text`.
```js
import iconDefinitions from 'bundle-text:./assets/icons/icon-definitions.svg';
```

And for webpack
```js
import iconDefinitions from 'raw-loader!./assets/icons/icon-definitions.svg';
```

And then
```js
import { initIcons } from 'iconito';

initIcons(iconDefinitions);
```

### Using icons in React
You can use the provdided `Icon` component

```jsx
import { Icon } from 'iconito';

<Icon 
  icon="icon-name"
  size={20}
  className="mr-1" />
```

Or if you prefer:
```xml
<svg>
  <use href={`#${iconName}`} />
</svg>
```
