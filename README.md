# React Component Media Query

A lightweight utility that tracks container dimensions (similar to CSS Container Queries) but exposes them to JavaScript, enabling dynamic logic based on container size changes. Unlike pure CSS Container Queries—which only handle styles—this gives you the power to modify React state, swap components, or adjust props when containers resize. While there's a slight performance tradeoff versus CSS-only solutions, it unlocks responsive behaviors that go beyond what CSS can do alone.

In essence, this is a "JavaScript Container Query" solution that bridges the gap between CSS containment and stateful application logic. Monitor container resize events and trigger precise callbacks—perfect for scenarios requiring more than stylistic changes.

## Features
* **Container Dimension Tracking** - Access real-time width/height measurements
* **Performance-Focused Observation** - Smart ResizeObserver management with configurable debouncing
* **Viewport-Aware Updates** - Optional intersection offsets to preemptively update near-viewport elements
* **React Hook Support** - Simplified integration via useContainerQuery hook
* **CSS Variable Sync** - Optional synchronization with CSS custom properties

# Project Focus
While performance optimization remains a consideration, the primary goals of this project are:

* Developer Experience
* Intuitive API design
* Seamless React integration
* Comprehensive TypeScript support
* Functional Flexibility
* Support for complex responsive logic beyond CSS capabilities
* Progressive Enhancement
* Clean observation lifecycle management

## Features

* Easy access to container dimensions.
* Update only elements on sight.
* Offset triggered intersection to update also elements outside a define range of the view port.
* Hook registration that allows easy use.

## Installation

...

## Basic Usage

...