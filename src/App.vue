<template>
    <div class="wrapper">
        <Header v-if="isHeader" />
        <router-view />
        <Footer></Footer>
    </div>

</template>
<script setup>
import { onMounted, ref } from 'vue'
import { Footer, Header } from './Index/ComponentIndex';
let isHeader = ref(false)


onMounted(() => {
    window.addEventListener("mousemove", headerShow)
})

function headerShow() {
    isHeader.value = true
    setTimeout(() => {
        isHeader.value = false
    }, 5000)
}


</script>

<style scoped>
.wrapper {
    width: 100%;
    overflow-x: hidden;
}
</style>

<!-- <script setup>
import Header from "./components/Header.vue"
import Tile from './components/Tile.vue'
import SideBar from './components/SideBar.vue'
import Footer from "./components/Footer.vue"


import { onMounted, onUnmounted, ref } from 'vue'
import { reactive } from 'vue'
import { addDataToLocalStorage, getDataFromLocalStorage } from "./assets/localStorage"
import Home from "./components/Home.vue"

const is24Hour = ref(false)
const showDate = ref(false)
const clockStyle = ref("solid")
const isSideBarOpen = ref(false)


const clockSize = ref(20)

let hours = ref(0)
let minutes = ref(0)
let seconds = ref(0)
let clockFormat = ref('AM')
let isHeader = ref(false)
// let isFullScreen = ref(false)

onMounted(() => {
    toggleTimeFormat()
    window.addEventListener("resize", windowSizeChange);
    windowSizeChange({ target: window })
    window.addEventListener("mousemove", headerShow)
    getDataFromLocalStorage("clockStyle") === "glassmorphism" ? clockStyle.value = "glassmorphism" : clockStyle.value = "solid"
    getDataFromLocalStorage("clockformat") === "24-hour" ? is24Hour.value = true : is24Hour.value = false
    getDataFromLocalStorage("showDate") ? showDate.value = true : showDate.value = false
})
onUnmounted(() => {
    window.removeEventListener("resize", windowSizeChange);
})

function headerShow() {
    isHeader.value = true
    setTimeout(() => {
        isHeader.value = false
    }, 5000)
}



function windowSizeChange(e) {
    if (e.target.innerWidth < 400) {
        clockSize.value = 20
    } else if (e.target.innerWidth < 500) {
        clockSize.value = 25
    } else if (e.target.innerWidth < 600) {
        clockSize.value = 30
    } else if (e.target.innerWidth < 800) {
        clockSize.value = 35
    } else if (e.target.innerWidth < 1000) {
        clockSize.value = 50
    } else {
        clockSize.value = 80
    }
}

const newSecond = reactive({ seconds, minutes, hours, clockFormat, clockSize })


function closeSideBar() {
    isSideBarOpen.value = false
}
function openSideBar() {
    isSideBarOpen.value = true
}

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

function changeStyle(n) {
    addDataToLocalStorage("clockStyle", n)
    clockStyle.value = n
}

function changeClockFormat(n) {
    addDataToLocalStorage("clockformat", n ? "24-hour" : "12-hour")
    is24Hour.value = n
}
function changeShowDate() {
    addDataToLocalStorage("showDate", !showDate.value)
    showDate.value = !showDate.value
}

function increaseClockSize() {
    clockSize.value += 10
}
function decreaseClockSize() {
    if (clockSize.value <= 20) return
    clockSize.value -= 10
}

// function enterExitFullScreen() {
//     console.log("full screen")
//     isFullScreen.value = !isFullScreen.value
//     if (element.requestFullscreen) {
//         element.requestFullscreen();
//     } else if (element.mozRequestFullScreen) {
//         element.mozRequestFullScreen();
//     } else if (element.webkitRequestFullscreen) {
//         element.webkitRequestFullscreen();
//     } else if (element.msRequestFullscreen) {
//         element.msRequestFullscreen();
//     }
// }

</script> -->

<!-- <style scoped>
.wrapper {

    display: flex;
    justify-content: space-between;
    min-width: 100vw;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
}

body::-webkit-scrollbar {
    display: none;
}

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
    height: v-bind('`${clockSize * 2}px`');

}

.tiles-div.separator-div div {
    width: 10px;
    height: 10px;
    background-color: var(--top-half);
    border-radius: 50%;
}

.full-screen-btn {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--top-half);
    opacity: 0.2;
    color: var(--text-color);
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
}
</style> -->