# Material theming

[Official theming guide](https://material.angular.io/guide/theming).

## Styling

### Rules

- In custom themed elements if using background-color, font color must be contrast of it.

  ```scss
  @use '~@angular/material/core/theming/theming';

  .mat-expansion-panel {
    background-color: theming.get-color-from-palette($primary-palette, 100);
    color: theming.get-contrast-color-from-palette($primary-palette, 100);
    // bad
    // color: white
  }
  ```

Dark and light themes used in this example. Theme applying based on the body class:

```css
body.light-theme {
  background: black;
}

body.dark-theme {
  background: white;
}
```

### Mixins

There are 2 mixins to easy insert css into `dark / light` theme

[\_mixins.scss](./src/_mixins.scss)

```scss
@mixin inside-light-theme {
  body.light-theme {
    @content;
  }
}

@mixin inside-dark-theme {
  body.dark-theme {
    @content;
  }
}
```

Usage:

```scss
@include body.light-theme {
  background: black;
}

@include inside-dark-theme {
  background: white;
}
```

### Helpers

[\_helpers.scss](./src/_helpers.scss) contains `set-ground` function to replace `background / foreground` styles of [material](https://material.angular.io/). I used it to change material's foreground text `color` property to custom.

Requires 3 arguments: `$theme, 'ground-name', (scss map with properties)`.
Properties taken from `foreground / background` of material. Check it here: [./node_modules/@angular/material/core/theming/\_palette.scss](./node_modules/@angular/material/core/theming/_palette.scss) => `$light-theme-foreground-palette`.

Usage:

[\_theming.scss](./src/_theming.scss)

```scss
$theme: helpers.set-ground(
  $theme,
  "foreground",
  (
    text: $primary-text,
  )
);
```

### Creating custom themes

[\_theming\_.scss](./src/_theming_.scss)

#### 1. Create custom `primary`, `accent`, `warn` palettes

[Material tool to get colors](https://material.io/resources/color)

```scss
$primary-colors: (
  100: #baafa9,
  500: #a89583,
  700: #887569,
  contrast: (
    100: #887569,
    500: black,
    700: #baafa9,
  ),
);
```

> 100, 500, 700 - default hue for material.  
> contrast - font color to use on it colors.

#### 2. Define palette with material `define-palette` function

```scss
//                                                     ↓ optional ↓
$primary-palette: mat.define-palette($primary-colors, 500, 100, 700);
$accent-palette: mat.define-palette($accent-colors);
// The warn palette is optional (defaults to red).
$warn-palette: mat.define-palette($warn-colors);
```

> For each palette, you can optionally specify a default, lighter, and darker hue.
> Default hues: 500, 100, 700

#### 3. Create material theme

Create the theme object. A theme consists of configurations for individual theming systems such as [color](https://material.angular.io/guide/theming). or [typography](https://material.angular.io/guide/typography).

```scss
$light-theme: mat.define-light-theme(
  (
    color: (
      primary: $primary-palette,
      accent: $accent-palette,
      warn: $warn-palette,
    ),
    // typography: $custom-typography,
  )
);

// change default material's background and foreground
// with custom function
$light-theme: helpers.set-ground(
  $light-theme,
  "foreground",
  (
    text: #887569,
  )
);
```

#### 4. Use material theme inside your app:

[styles.scss](./src/styles.scss)

Material's `all-component-themes` receives our custom theme. Function applies theming into our app.

```scss
@use '~@angular/material' as mat;
@use './theming' as custom-theming;
@use './mixins' as mixins;

// Include the common styles for Angular Material.
@include mat.core();

// Include theme styles for core and each component used in your app.
// Alternatively, you can import and @include the theme mixins for each component.
@include mixins.inside-light-theme {
  @include mat.all-component-themes(custom-theming.$light-theme);
}

@include mixins.inside-dark-theme {
  @include mat.all-component-themes(custom-theming.$dark-theme);
}

// Non-theme based styles
* {
  box-sizing: border-box;
}

// relocated from index.html for save modularity
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
```

### Theming custom components

[Official way to theming custom components](https://material.angular.io/guide/theming-your-components). This way is about `@include` all component's styles as `mixins` inside main `styles.scss` file. It's ok, but we are using other way to keep modularity.

In our case, we might:

1. Get theme config with `get-color-config` material function.
2. Get palette with scss's `map` helpers.
3. Get color from palette with scss's `map`, passing hue.

> Component's ViewEncapsulation must be set to None

[sidenav.component.scss](./src/app/sidenav/sidenav.component.scss)

```scss
@use 'sass:map';
@use '~@angular/material/core/theming/theming';

@use '../../mixins' as mixins;
@use '../../theming' as custom-theming;

$dark-config: theming.get-color-config(custom-theming.$dark-theme);
$light-config: theming.get-color-config(custom-theming.$light-theme);

@include mixins.inside-light-theme {
  $primary: map.get($light-config, primary);

  .mat-drawer {
    // with scss get from object function
    background-color: map.get($primary, 700);
  }
}

@include mixins.inside-dark-theme {
  $primary: map.get($dark-config, primary);

  .mat-drawer {
    // with material helper function
    background-color: theming.get-color-from-palette($primary, 700);
  }
}

.mat-toolbar.mat-primary {
  z-index: 2;
}
```
