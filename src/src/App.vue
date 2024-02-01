<template>

    <!-- Content -->
    <div class="h-screen w-screen flex flex-col items-center justify-center">
        <h5 class="mt-20 mb-10 text-white opacity-60">Carousel component in action</h5>
        <listing-card :listing="listing" class="w-72"/>
    </div>

</template>
<script setup lang="ts">
import ListingCard from "@/modules/listings/components/ListingCard.vue";
import {Listing} from "@/modules/listings/models/Listing";

const listing: Listing = {
    name: "Provi dela Vinci, Italy",
    pricePerNight: 1245,
    rating: 4.99,
    location: "5135 kilometres away",
    dates: "Jan 5-7",
    images: [
        new URL('./assets/images/img.png', import.meta.url).href,
        new URL('./assets/images/img_1.png', import.meta.url).href,
        new URL('./assets/images/img_2.png', import.meta.url).href,
        new URL('./assets/images/img_3.png', import.meta.url).href,

    ]
};

</script>