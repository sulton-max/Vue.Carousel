# Vue Carousel
 
This is demo of creating Vue Carousel component from scratch that includes following featurs
- Reusable Carousel
- Navigation Controls
- Indicators
- Automatic Sliding
- Looping Option

***

A carousel component, often used in web development, is a sliding or rotating set of items, typically images or cards,
that users can navigate. Essential features for a carousel include:

- Reusable Carousel: ability to use with any content
- Responsive Design: Adapts to various screen sizes.
- Navigation Controls: Arrows or buttons for previous/next navigation.
- Indicators: Dots or bars indicating the current slide among the total.
- Automatic Sliding: Option to auto-rotate through items with a configurable delay.
- Touch and Swipe Support: For mobile users to swipe through items.
- Accessibility: Keyboard navigation and ARIA attributes for screen readers.
- Looping Option: Infinite loop where the last slide transitions back to the first.
- Lazy Loading: Loading images only as needed to improve performance.


TODO : Carousel in action gif


## How it works

***

## Running this demo

### Requirements
- VS Code or WebStorm
- Node.js version 20

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

## How it is created ?

These are step-by-step examples of creating carousel from scratch

Basic first steps that's not covered in this repo : 
- Initialize empty Vue project
- Install tailwind css and tailwind configuration

### Creating generic carousel

It's better to create generic carousel, not just for images, so it can be used with anything. We use slot for this and
pass anything as carousel content as long as we don't wrap those collection of elements

```HTML
<template>

    <div class="relative">

        <!-- Carousel content -->
        <div class="flex no-scrollbar overflow-x-scroll">
            <slot v-bind="$attrs"/>
        </div>
        
    </div>

</template>
```
***HorizontalCarousel.vue***

Using in a parent component: 

```HTML
<template>

    <div class="relative">

        <!-- Carousel content -->
        <div class="flex no-scrollbar overflow-x-scroll">
            <slot v-bind="$attrs"/>
        </div>
        
    </div>

</template>
```


### Computing scroll distance

### Navigation controls

### Autoplay

### Indicators

***

### License

[MIT License](LICENSE)ß