<template>

    <div class="sidebar-main">

        <button class="btn-selection close" @click="$emit('closeSidebar')">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 384 512">
                <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
        </button>

        <!-- <h1 class="main-heading">Styles</h1>
        <div class="section-div">
            <button class="btn-selection" @click="$emit('clockStyle', 'glassmorphism')">Glassmorphism</button>
            <button class="btn-selection" @click="$emit('clockStyle', 'solid')">Solid Color</button>
        </div> -->
        <h1 class="main-heading">Clock Format</h1>
        <div class="section-div">
            <button class="btn-selection" @click="$emit('clockFormat', true)">24 Hour</button>
            <button class="btn-selection" @click="$emit('clockFormat', false)">12 hour</button>
        </div>
        <!-- <div class="section-div">
            <label class="main-heading" for="show-date-input">Show Date</label>
            <input type="checkbox" :checked="props.isDateShow" @change="$emit('showDate')" id='show-date-input'>
        </div> -->
        <div class="section-div">
            <h1 class="main-heading">Clock Size</h1>
            <div class="clock-size-div">
                <button @click="$emit('increaseClockSize')" class="btn-selection clock-size-button">+</button>
                <button @click="$emit('decreaseClockSize')" class="btn-selection clock-size-button">-</button>
            </div>
        </div>

        <h1 class="main-heading">Color</h1>
        <div class="section-div">
            <div class="color-change-div">
                <label class="color-change-heading" for="background-color-input">Background</label>
                <input :value="currentBackgroundColor" type="color" @change="backgroundColorChange"
                    id="background-color-input">
            </div>
            <div class="color-change-div">
                <label class="color-change-heading" for="text-color-input">Text Color</label>
                <input :value="currentTextColor" type="color" @change="textColorChange" id="text-color-input">
            </div>
            <div class="color-change-div">
                <label class="color-change-heading" for="top-flip-color-input">Top Flip</label>
                <input :value="currentTopFlipColor" type="color" @change="topFlipColorChange" id="top-flip-color-input">
            </div>
            <div class="color-change-div">
                <label class="color-change-heading" for="bottom-flip-color-input">Bottom Flip</label>
                <input :value="currentBottomFlipColor" type="color" @change="bottomFlipColorChange"
                    id="bottom-flip-color-input">
            </div>
            <button @click="resetColors" class="btn-selection load-more">Reset</button>
        </div>
        <h1 class="main-heading">Background</h1>
        <div class="section-div">

            <img @click="newBackground" class="background-image imported" v-for="n in importedBackground"
                v-bind:src="`${n}`" alt="" />
            <img @click="newBackground" class="background-image" v-for="n in backgroundCount"
                v-bind:src="`https://drive.google.com/thumbnail?id=${BackgroundMain.Background[n - 1]?.split('/')[5]}&export=download`"
                alt="" />

            <button @click="loadMore" class="btn-selection load-more">Load More</button>
            <button @click="addBackground" class="btn-selection">Add</button>
            <input type="file" accept="image/*" @change="onChangeImageUpload" ref="imageUpload" style="display: none" />
            <button @click="removeBackground" class="btn-selection">Remove</button>

        </div>
    </div>

</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import Background from '../assets/background.json'
import { addDataToLocalStorage, getDataFromLocalStorage } from "../assets/localStorage"

const props = defineProps(['isDateShow', 'isSideBar'])

const backgroundCount = ref(4)
const importedBackground = ref([])
const imageUpload = ref(null)
const currentBackgroundColor = ref(" #161515")
const currentTextColor = ref("#000000")
const currentTopFlipColor = ref("#D9D9D9")
const currentBottomFlipColor = ref("#C3C3C3")

const BackgroundMain = reactive({ Background })


const defaultColors = {
    backgroundColor: "#161515",
    textColor: "#000000",
    topFlipColor: "#D9D9D9",
    bottomFlipColor: "#C3C3C3"
}



onMounted(() => {

    fetchJsonFile()

    getDataFromLocalStorage("backgroundColor") ? currentBackgroundColor.value = getDataFromLocalStorage("backgroundColor") : currentBackgroundColor.value = defaultColors.backgroundColor
    getDataFromLocalStorage("textColor") ? currentTextColor.value = getDataFromLocalStorage("textColor") : currentTextColor.value = defaultColors.textColor
    getDataFromLocalStorage("topFlipColor") ? currentTopFlipColor.value = getDataFromLocalStorage("topFlipColor") : currentTopFlipColor.value = defaultColors.topFlipColor
    getDataFromLocalStorage("bottomFlipColor") ? currentBottomFlipColor.value = getDataFromLocalStorage("bottomFlipColor") : currentBottomFlipColor.value = defaultColors.bottomFlipColor
    getDataFromLocalStorage("addedBackground") ? importedBackground.value = getDataFromLocalStorage("addedBackground") : importedBackground.value = []
    getDataFromLocalStorage("currentBackgroundImage") ? newBackground({ target: { src: getDataFromLocalStorage("currentBackgroundImage") } }) : document.documentElement.style.setProperty('--main-background', currentBackgroundColor.value);
    document.documentElement.style.setProperty('--main-text', currentTextColor.value);
    document.documentElement.style.setProperty('--top-half', currentTopFlipColor.value);
    document.documentElement.style.setProperty('--bottom-half', currentBottomFlipColor.value);
})


function onChangeImageUpload() {
    const file = imageUpload.value.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
        importedBackground.value.push(e.target.result)
        newBackground({ target: { src: e.target.result } })
        addDataToLocalStorage("currentBackgroundImage", e.target.result)
        addDataToLocalStorage("addedBackground", importedBackground.value)

    }
    reader.readAsDataURL(file)
}

function loadMore() {
    if (backgroundCount.value >= BackgroundMain.Background.length) return
    else if (backgroundCount.value + 4 >= BackgroundMain.Background.length) backgroundCount.value = BackgroundMain.Background.length
    else backgroundCount.value += 4
}
function addBackground() {
    imageUpload.value.click()

}
function newBackground(e) {
    addDataToLocalStorage("currentBackgroundImage", e.target.src)
    const data = `url('${e.target.src}') no-repeat`
    document.documentElement.style.setProperty('--main-background', data);
}
function removeBackground() {
    addDataToLocalStorage("currentBackgroundImage", null)
    document.documentElement.style.setProperty('--main-background', currentBackgroundColor.value);
}
function backgroundColorChange(e) {
    currentBackgroundColor.value = e.target.value
    addDataToLocalStorage("backgroundColor", e.target.value)
    addDataToLocalStorage("currentBackgroundImage", null)
    document.documentElement.style.setProperty('--main-background', e.target.value);
}
function textColorChange(e) {
    currentTextColor.value = e.target.value
    addDataToLocalStorage("textColor", e.target.value)
    document.documentElement.style.setProperty('--main-text', e.target.value);

}
function topFlipColorChange(e) {
    currentTopFlipColor.value = e.target.value
    addDataToLocalStorage("topFlipColor", e.target.value)
    document.documentElement.style.setProperty('--top-half', e.target.value);
}
function bottomFlipColorChange(e) {
    currentBottomFlipColor.value = e.target.value
    addDataToLocalStorage("bottomFlipColor", e.target.value)
    document.documentElement.style.setProperty('--bottom-half', e.target.value);

}
function resetColors() {
    document.documentElement.style.setProperty('--main-background', defaultColors.backgroundColor);
    document.documentElement.style.setProperty('--main-text', defaultColors.textColor);
    document.documentElement.style.setProperty('--top-half', defaultColors.topFlipColor);
    document.documentElement.style.setProperty('--bottom-half', defaultColors.bottomFlipColor);

    currentBackgroundColor.value = defaultColors.backgroundColor
    currentTextColor.value = defaultColors.textColor
    currentTopFlipColor.value = defaultColors.topFlipColor
    currentBottomFlipColor.value = defaultColors.bottomFlipColor

    addDataToLocalStorage("backgroundColor", defaultColors.backgroundColor)
    addDataToLocalStorage("textColor", defaultColors.textColor)
    addDataToLocalStorage("topFlipColor", defaultColors.topFlipColor)
    addDataToLocalStorage("bottomFlipColor", defaultColors.bottomFlipColor)
}


async function fetchJsonFile() {
    try {

        const response = await fetch("https://res.cloudinary.com/dwnoofnah/raw/upload/v1721328026/timeglimpse_background.json");

        if (!response.ok) {
            throw new Error('Failed to fetch JSON file');
        }
        const data = await response.json();
        BackgroundMain.Background = data


    } catch (error) {
        console.error(error);
        return null;
    }
}


</script>



<style scoped>
.sidebar-main {
    position: fixed;
    width: 300px;
    visibility: v-bind('`${props.isSideBar ? "visible" : "hidden"}`');
    top: 0;
    right: 0;
    height: 100%;
    overflow-y: scroll;
    background-color: #000000;
    padding: 60px 20px;
}



.main-heading {
    color: white;
    font-size: 20px;
    margin-bottom: 20px;
}

.section-div .main-heading {
    margin-bottom: 0;
}

.section-div {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
}

.btn-selection {
    background-color: #575757;
    color: white;
    border: 1px solid white;
    padding: 10px;
    width: calc(50% - 5px);
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin: 10px 0; */
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.btn-selection.load-more {
    width: 100%;
}

.clock-size-button {
    width: 35px;
    height: 35px;
    font-size: 20px;
}

.close {
    background-color: transparent;
    border: none;
    width: fit-content;
    /* float: right; */
    position: absolute;
    top: 20px;
    right: 20px;
}

.close svg {
    fill: white;
}

.color-change-div {
    width: calc(50% - 5px);
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
}

.color-change-div input {
    width: 20px;
    height: 20px;
    cursor: pointer
}

.color-change-div input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
}

.color-change-div input[type="color"]::-webkit-color-swatch {
    border: none;
}

.color-change-heading {
    color: white;
    font-size: 12px;
    /* margin-bottom: 20px; */
}

.section-div .background-image {
    width: calc(50% - 5px);
    height: 70px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 5px;
}

.clock-size-div {
    display: flex;
    gap: 10px
}
</style>