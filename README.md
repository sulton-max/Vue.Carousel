# Vue Carousel

This is demo of creating Vue Carousel component from scratch that includes following featurs

- Reusable Carousel
- Navigation Controls
- Looping Option
- Automatic Sliding
- Indicators

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

Basically carousel is container for elements that overflows the container and with scrolling to the right distance we
can imitate carousel effect

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

These are step-by-step examples of creating carousel from scratch. Note that I didn't cover things like how to use
scrolling, how to import component / types, you can open the source code and check with your version to follow along

Basic first steps that's not covered in this repo :

- Initialize empty Vue project
- Install tailwind css and tailwind configuration
- Remove any unnecessary components and styles
- Add common styles to main.css ( you can find it from **src/assets/main.css** )

### Creating reusable carousel

It's better to create reusable carousel, not just for images, so it can be used with anything. We use slot for this and
pass anything as carousel content as long as we don't wrap those collection of elements

- Create `HorizontalCarousel.vue` with slot and wrapper around it
- Bind any passed attributes to slot
- Wrapper must be flex and

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

<horizontal-carousel>
    <img v-for="(image, index) in listing.images" :key="index"
         class="object-cover aspect-square"
         loading="eager"
         alt="Listing image"
         :src="image">
</horizontal-carousel>
```

### Computing scroll distance

For navigation actions work correctly, we need to compute correct distance of scrolling, to do that we need to get first
child of scroll container and retrieve width value from it

- Add ref to carousel container

```HTML
<!-- Carousel content -->
<div ref="carouselContainer" class="flex no-scrollbar overflow-x-scroll">
    <slot v-bind="$attrs"/>
</div>
```

- Create ref variable for carousel container

```Typescript
const carouselContainer = ref<HTMLDivElement>();
```

- Create callback in props so that parents call recalculate distance whenever carousel content source changes

```Typescript
export class Action {
    public callBack: () => void;
}

export class NotificationSource extends Action {}
```

```HTML

<script setup lang="ts">

    const props = defineProps({
        onSourceChanged: {
            type: Object as () => Action,
            required: false
        }
    });
</script>
```

- Bind callback to image loading event

```HTML

<horizontal-carousel
        :on-source-changed="sourceChangedNotificationSource"
        :loop-to-start="true">
    <img v-for="(image, index) in listing.images" :key="index"
         class="object-cover aspect-square"
         loading="eager"
         alt="Listing image"
         @load="() => sourceChangedNotificationSource.callBack()"
         :src="image">
</horizontal-carousel>
```

- Add distance recalculation logic inside horizontal carousel and add as callback when mounted

```Typescript
onMounted(() => {
    props.onSourceChanged.callBack = recalculateItemDistance;
});

const recalculateItemDistance = () => {
    if (!carouselContainer.value) return;

    recalculatingDistance.value = true;
    moveDistance.value = documentService.getChildWidth(carouselContainer.value);
    recalculatingDistance.value = false;
};
```

### Navigation controls

- Create next and previous button components
- Add variables that indicates if carousel can scroll to the left / right and method to calculate that

```Typescript
const canMovePrev = ref<boolean>(true);
const canMoveNext = ref<boolean>(true);

const computeCanMove = () => {
    canMovePrev.value = documentService.canScrollLeft(carouselContainer.value!);
    canMoveNext.value = documentService.canScrollRight(carouselContainer.value!);
};
```

- Now use document service's scroll functionalities to move carousel for prev / next actions

```Typescript
const onMovePrev = () => {
    if (!carouselContainer.value || recalculatingDistance.value) return;

    documentService.scrollLeft(carouselContainer.value, moveDistance.value);
    computeCanMove();
};

const onMoveNext = () => {
    if (!carouselContainer.value || recalculatingDistance.value) return;
    
    documentService.scrollRight(carouselContainer.value, moveDistance.value);
    computeCanMove();
}
```

**Note** : `DocumentService` is my approach of creating clean components where no direct JQuery and other magic stuff is
used inside Typescript code, I really don't like accessing UI elements` attributes everywhere inside normal logic

- Add prev / next actions and bind to event handlers

```HTML

<template>

    <div class="relative">

        <!-- Carousel content -->
        <div ref="carouselContainer" class="flex no-scrollbar overflow-x-scroll">
            <slot v-bind="$attrs"/>
        </div>

        <!-- Carousel actions -->
        <div class="absolute-center flex items-center w-full justify-between px-2">
            <previous-button @click="onMovePrev"/>
            <next-button @click="onMoveNext"/>
        </div>

    </div>

</template>
```

### Looping

In order to loop carousel items, we need to go to the scroll beginning when scroll right action is executed and there's
no space to scroll right and go to the end of the container when navigate to the left action executed but there's no
space to navigate left

- Add looping option to props

```Typescript
const props = defineProps({
    loopToStart: {
        type: Boolean,
        required: false,
        default: false
    }
});
```

- Update navigation event handlers accordingly to the logic

```Typescript
const onMovePrev = () => {
    if (!carouselContainer.value || recalculatingDistance.value) return;

    if (!documentService.canScrollLeft(carouselContainer.value) && props.loopToStart) {
        documentService.scrollToEnd(carouselContainer.value);
    } else {
        documentService.scrollLeft(carouselContainer.value, moveDistance.value);
        computeCanMove();
    }
};

const onMoveNext = () => {
    if (!carouselContainer.value || recalculatingDistance.value) return;

    if (!documentService.canScrollRight(carouselContainer.value) && props.loopToStart) {
        documentService.scrollToBeginning(carouselContainer.value);
    } else {
        documentService.scrollRight(carouselContainer.value, moveDistance.value);
        computeCanMove();
    }
}
```

### Autoplay

Autoplay is a really fun feature, it gives both interactive and animated design vibes, it's basically timeout function
with executing scrolling

- Add autoplay configurations to props

```Typescript
const props = defineProps({
    autoPlay: {
        type: Boolean,
        required: false,
        default: false
    },
    autoPlayInterval: {
        type: Number,
        required: false,
        default: 2000
    }
});
```

- Set interval function if autoplay is set

```Typescript
onMounted(() => {
    props.onSourceChanged.callBack = recalculateItemDistance;
    setAutoPlay();
});

onUnmounted(() => {
    removeAutoPlay();
});

watch(() => props.autoPlay, () => {
    if (props.autoPlay) {
        setAutoPlay();
    } else {
        removeAutoPlay();
    }
});

const setAutoPlay = () => {
    // Set autoplay interval
    if (props.autoPlay) {
        autoPlayInterval.value = props.autoPlayInterval > 0 ? props.autoPlayInterval : 2000;
        autoPlayIntervalId.value = documentService.setInterval(() => onMoveNext(), autoPlayInterval.value);;
    }
}

const removeAutoPlay = () => {
    if (autoPlayIntervalId.value > 0) {
        documentService.clearInterval(autoPlayIntervalId.value);
    }
}
```

### License

[MIT License](LICENSE)ß