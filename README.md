# Ripple Effect

This package adds material style ripple effect to HTML element.

## Installation

### browser
```
<script src="https://unpkg.com/@hugy/ripple-effect@1.0/dist/browser/index.js"></script>
```

### Webpack

```
npm install @hugy/ripple-effect
```

## Usage

### Browser

```
const el = document.getElementById("id");
const rippleEffect = new window.RippleEffect(el)
```

### Webpack

```
import RippleEffect from "@hugy/ripple-effect"

const el = document.getElementById("id");
const rippleEffect = new RippleEffect(el);
```
Note: CSS position of target element must be one of these (relative, absolute, fixed, sticky).

## properties

#### bounded (type: boolean)

Whether the ripple effect can be visible outside of the target element. Default value is true.

#### opacity (type: number)
Opacity of the ripple effect. Must be between 0 and 1. Default is 0.2.

#### color (type: string)
Color of the ripple effect. Default is "currentColor" (text color of target element).

#### enterDuration (type: number)
Animation Duration in milliseconds for expanding ripple effect from the contact point. Default is 400ms.

#### exitDuration (type: number)
Animation Duration in milliseconds for fading out the expanded ripple effect. Default is 200ms.

## Methods

#### launch(x: number, y: number, r?: number): void
Launch a new ripple effect. This method automatically is called when a user clicks on the target element. This method can be trigger manually. x and y are required arguments, they define the position of the ripple effect to expand from. r is optional argument, the size of the ripple effect.