<template>

    <div class="relative">

        <!-- Carousel content -->
        <div ref="carouselContainer" class="flex no-scrollbar overflow-x-scroll">
            <slot v-bind="$attrs"/>
        </div>

        <!-- Carousel actions -->
        <div
            class="absolute-center flex items-center w-full justify-between px-2">
            <previous-button @click="onMovePrev"/>
            <next-button @click="onMoveNext"/>
        </div>

    </div>

</template>

<script setup lang="ts">

import {onMounted, type PropType, ref} from "vue";
import {DocumentService} from "@/infrastructure/services/DocumentService";
import type {Action} from "@/infrastructure/models/Callback";
import PreviousButton from "@/common/components/PreviousButton.vue";
import NextButton from "@/common/components/NextButton.vue";

const documentService = new DocumentService();
const carouselContainer = ref<HTMLDivElement>();

const canMovePrev = ref<boolean>(true);
const canMoveNext = ref<boolean>(true);

const recalculatingDistance = ref<boolean>(true);
const moveDistance = ref<number>();

const props = defineProps({
    onSourceChanged: {
        type: Object as () => Action,
        required: false
    },
    autoPlay: {
        type: Boolean,
        required: false,
        default: false
    },
    autoPlayInterval: {
        type: Number,
        required: false,
        default: 2000
    },
    loopToStart: {
        type: Boolean,
        required: false,
        default: false
    }
});

onMounted(() => {
    props.onSourceChanged.callBack = recalculateItemDistance;
});

const computeCanMove = () => {
    canMovePrev.value = documentService.canScrollLeft(carouselContainer.value!);
    canMoveNext.value = documentService.canScrollRight(carouselContainer.value!);
};

/*
 * Recalculates distance to scroll when items changed
 */
const recalculateItemDistance = () => {
    if (!carouselContainer.value) return;

    recalculatingDistance.value = true;
    moveDistance.value = documentService.getChildWidth(carouselContainer.value);
    recalculatingDistance.value = false;
};

/*
 * Moves carousel to previous item
 */
const onMovePrev = () => {
    if (!carouselContainer.value || recalculatingDistance.value) return;

    if (!documentService.canScrollLeft(carouselContainer.value) && props.loopToStart) {
        documentService.scrollToEnd(carouselContainer.value);
    } else {
        documentService.scrollLeft(carouselContainer.value, moveDistance.value);
        computeCanMove();
    }
};

/*
 * Moves carousel to next item
 */
const onMoveNext = () => {
    if (!carouselContainer.value || recalculatingDistance.value) return;

    if (!documentService.canScrollRight(carouselContainer.value) && props.loopToStart) {
        documentService.scrollToBeginning(carouselContainer.value);
    } else {
        documentService.scrollRight(carouselContainer.value, moveDistance.value);
        computeCanMove();
    }
}

</script>