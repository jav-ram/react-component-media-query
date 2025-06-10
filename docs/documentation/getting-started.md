---
outline: deep
---

# Getting Started

Add a developer friendly solution for container media queries [react-component-media-query](https://github.com/jav-ram/react-component-media-query).

## Install

### install with npm
```bash
npm install react-component-media-query
```

### install with yarn
```bash
yarn add react-component-media-query
```

## Basic usage

Creating the provider or media container for hearing resizes.

```javascript
const ref = useRef(null);
return (
  <div>
    <MediaContainer ref={ref} as={Grid} container>
      <Item id='item' />
    </MediaContainer>
  </div>
)
```

Inside child to subscribe to changes

```javascript
const { width } = useContext(MediaContainerContext);
```

