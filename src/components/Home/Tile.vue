<template>
    <div class="tile-container">
        <div class="top-container" :class="{ 'top-container-12hour': props.is24Hour }">
            {{ mainData }}
        </div>
        <div v-if="showTopFlip" class="top-flip">
            {{ topFlipNumber }}
        </div>

        <div class="bottom-container" :class="{ 'bottom-container-12hour': props.is24Hour }">
            {{ bottomNumber }}
        </div>
        <div v-if="showBottomFlip" class="bottom-flip">
            {{ mainData }}
        </div>
    </div>

</template>





<script setup>

import { reactive, ref } from 'vue';
import { watch } from 'vue';
import { useStore } from 'vuex';
const props = defineProps(['is24Hour', 'mainData'])


const store = useStore()
let showTopFlip = ref(false)
let showBottomFlip = ref(false)

let topFlipNumber = ref(0)
let bottomNumber = ref(0)
const showFlip = reactive({ showTopFlip, showBottomFlip, bottomNumber, topFlipNumber })
if (props.mainData === "A" || props.mainData === "P" || props.mainData === "M") {
    showFlip.topFlipNumber = props.mainData
    showFlip.bottomNumber = props.mainData
}

watch(() => props.mainData, (newValue, oldValue) => {

    showFlip.showTopFlip = true
    showFlip.showBottomFlip = true

    showFlip.topFlipNumber = oldValue
    showFlip.bottomNumber = oldValue

    setTimeout(() => {
        showFlip.showTopFlip = false
        showFlip.bottomFlipNumber = newValue
        showFlip.bottomNumber = newValue
    }, 250)
    setTimeout(() => {
        showFlip.showBottomFlip = false
    }, 500)
})

</script>

<style scoped>
.tile-container {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    color: var(--main-text);
}


.top-container,
.top-flip {
    background-color: var(--top-half);
}



.bottom-container,
.bottom-flip {
    background-color: var(--bottom-half);
    display: flex;
    align-items: flex-end;
}


.top-flip,
.bottom-flip {
    height: 50%;
    width: 100%;
    position: absolute;
    left: 0;

}

.top-flip {
    position: absolute;
    top: 0;
    width: 100%;
    animation: flip-down 250ms ease-in;
    transform-origin: bottom;
}

.bottom-flip {
    position: absolute;
    bottom: 0;
    width: 100%;
    animation: flip-up 250ms ease-out 250ms;
    transform-origin: top;
    transform: rotateX(90deg);
}

@keyframes flip-down {
    100% {
        transform: rotateX(-90deg);
    }
}

@keyframes flip-up {
    100% {
        transform: rotateX(0deg);
    }
}

.top-container,
.bottom-container,
.top-flip,
.bottom-flip {

    height: v-bind('`${store.state.clockSize}px`');
    font-size:v-bind('`${store.state.clockSize}px`');
    padding: v-bind('`${store.state.clockSize / 2}px`');
    line-height: 1;
    overflow: hidden;
    border-radius: 5px;
}

.top-container-12hour,
.bottom-container-12hour,
.top-flip-12hour,
.bottom-flip-12hour {

    height: 20px !important;
    font-size: 20px !important;
    padding: 10px 5px !important;
    line-height: 1;
    overflow: hidden;
    border-radius: 5px !important;
}
</style>