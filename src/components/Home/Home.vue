<template>
    <div class="main-container">
        <div class="time-container">
            <div class="tiles-div">
                <Tile v-bind:mainData="`${Math.floor(hours / 10)}`" />
                <Tile v-bind:mainData="`${Math.floor(hours % 10)}`" />
            </div>
            <div class="tiles-div separator-div">
                <div>

                </div>
                <div>

                </div>
            </div>
            <div class="tiles-div">
                <Tile v-bind:mainData="`${Math.floor(minutes / 10)}`" />
                <Tile v-bind:mainData="`${Math.floor(minutes % 10)}`" />
            </div>
            <div class="tiles-div separator-div">
                <div>

                </div>
                <div>

                </div>
            </div>
            <div class="tiles-div">
                <Tile v-bind:mainData="`${Math.floor(seconds / 10)}`" />
                <Tile v-bind:mainData="`${Math.floor(seconds % 10)}`" />
            </div>
            <div v-if="!is24Hour" class="tiles-div">
                <Tile is24Hour="is24Hour" v-bind:mainData="`${clockFormat[0]}`" />
                <Tile is24Hour="is24Hour" v-bind:mainData="`${clockFormat[1]}`" />
            </div>
        </div>
        <SideBar />
        <!-- <button v-if="isHeader" @click="enterExitFullScreen" class="full-screen-btn">{{ isFullScreen ?
            'Exit Full Screen' : 'Enter Full Screen' }}</button> -->
    </div>


</template>

<script setup>
import { SideBar, Tile } from '../../Index/ComponentIndex'

import { onMounted, onUnmounted, ref, computed } from 'vue'
import { reactive } from 'vue'
import { getDataFromLocalStorage } from "../../assets/localStorage"
import { useStore } from 'vuex'



const store = useStore()

const is24Hour = computed(() => store.state.is24Hour)

let hours = ref(0)
let minutes = ref(0)
let seconds = ref(0)
let clockFormat = ref(store.state.clockFormat)

onMounted(() => {
    toggleTimeFormat()
    window.addEventListener("resize", windowSizeChange);
    windowSizeChange({ target: window })
    getDataFromLocalStorage("clockStyle") === "glassmorphism" ?
        store.commit('changeClockStyle', "glassmorphism") : store.commit('changeClockStyle', "solid")

    getDataFromLocalStorage("clockformat") === "24-hour" ?
        store.commit('changeIs24Hour', true) : store.commit('changeIs24Hour', false)

    getDataFromLocalStorage("showDate") ?
        store.commit('changeShowDate', true) : store.commit('changeShowDate', false)

})
onUnmounted(() => {
    window.removeEventListener("resize", windowSizeChange);
})


function windowSizeChange(e) {
    if (e.target.innerWidth < 400) {
        store.commit('changeClockSize', 20)
    } else if (e.target.innerWidth < 500) {
        store.commit('changeClockSize', 25)
    } else if (e.target.innerWidth < 600) {
        store.commit('changeClockSize', 30)
    } else if (e.target.innerWidth < 800) {
        store.commit('changeClockSize', 35)
    } else if (e.target.innerWidth < 1000) {
        store.commit('changeClockSize', 40)
    } else {
        store.commit('changeClockSize', 80)
    }
}

const newSecond = reactive({ seconds, minutes, hours, clockFormat })


function toggleTimeFormat() {
    setInterval(() => {
        newSecond.hours = is24Hour.value ? new Date().getHours() : changeTimeFormat();
        newSecond.minutes = new Date().getMinutes();
        newSecond.seconds = new Date().getSeconds();
    }, 250)
}


function changeTimeFormat() {
    let date = new Date();
    let hours = date.getHours();
    newSecond.clockFormat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours
}


</script>

<style scoped>
.main-container {
    display: flex;
    justify-content: space-between;
    min-width: 100vw;
    min-height: 100vh;
    height: 100%;
    width: 100%;
    flex-direction: column;
    padding: 20px;
    justify-content: center;
    align-items: center;
}

.time-container {
    max-width: 100%;
    width: fit-content;
    max-height: 100%;
    height: fit-content;
    display: flex;
    gap: 10px;
    align-items: flex-end;
}

.tiles-div {
    display: flex;
    gap: 5px;
}

.tiles-div.separator-div {

    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: v-bind('`${store.state.clockSize * 2}px`');

}

.tiles-div.separator-div div {
    width: 10px;
    height: 10px;
    background-color: var(--top-half);
    border-radius: 50%;
}
</style>