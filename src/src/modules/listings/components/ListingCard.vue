<template>

    <!--Listing card-->
    <div
        class="flex flex-col items-start justify-start gap-2 relative theme-bg-primary rounded-lg theme-border hover-shadow-zero">

        <!--Listing header-->
        <div class="w-full overflow-hidden rounded-t-lg">

            <horizontal-carousel
                :on-source-changed="sourceChangedNotificationSource"
                :loop-to-start="true">
                <img ref="imageElements" v-for="(image, index) in listing.images" :key="index"
                     class="object-cover aspect-square"
                     loading="eager"
                     alt="Listing image"
                     @load="onSourceChanged"
                     :src="image">
            </horizontal-carousel>

            <!--Like button-->
            <button class="absolute top-4 right-4">
                <svg class="stroke-bgColorPrimary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
                     aria-hidden="true"
                     role="presentation" focusable="false"
                     style="display: block; fill: rgba(0, 0, 0, 0.5); height: 22px; width: 22px;  stroke-width: 2; overflow: visible;">
                    <path
                        d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
                </svg>
            </button>
        </div>

        <!--Listing details-->
        <div class="flex w-full justify-between pt-1 p-4">

            <div class="flex flex-col relative w-full">
                <h5 class="font-medium theme-text-primary">Provi dela Vinci, Italy</h5>
                <p class="text-sm text-textSecondary theme-text-secondary">5135 kilometres away</p>
                <p class="text-sm text-textSecondary theme-text-secondary">Jan 5-7</p>
                <h5 class="mt-3 theme-text-primary">
                    <strong class="font-medium">$1,245</strong> night
                </h5>
            </div>

            <!--Rating-->
            <div class="">
                <div class="flex items-center justify-center gap-1 theme-text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation"
                         focusable="false"
                         style="display: block; height: 12px; width: 12px; fill: currentcolor;">
                        <path fill-rule="evenodd"
                              d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path>
                    </svg>
                    <p>4.99</p>
                </div>
            </div>

        </div>

    </div>

</template>
<script setup lang="ts">
import HorizontalCarousel from "@/common/components/HorizontalCarousel.vue";
import {onMounted, type PropType, ref, watch} from "vue";
import type {Listing} from "@/modules/listings/models/Listing";
import {type Action, NotificationSource} from "@/infrastructure/models/Callback";

const sourceChangedNotificationSource = ref<NotificationSource>(new NotificationSource());

const props = defineProps({
    listing: {
        type: Object as PropType<Listing>,
        required: true
    }
});

const onSourceChanged = () => {
    sourceChangedNotificationSource.value.callBack();
};

// const images = ref<Array<string>>([]);
//
// const test = [
//     new URL('./assets/images/img_4.png', import.meta.url).href,
//     new URL('./assets/images/img_5.png', import.meta.url).href,
//     new URL('./assets/images/img_6.png', import.meta.url).href,
//     new URL('./assets/images/img_7.png', import.meta.url).href,
// ];
//
// const testB = ref<boolean>(false);
//
// onMounted(() => {
//     setInterval(() => {
//         if(testB.value) {
//             images.value = props.listing.images;
//             testB.value = !testB.value;
//         } else {
//             images.value = test;
//             testB.value = !testB.value;
//         }
//         console.log('updating images');
//     }, 2000);
// });

</script>