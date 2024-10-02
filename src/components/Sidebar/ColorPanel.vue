<template>
    <h1 class="main-heading">Color</h1>
    <div class="section-div">
        <div class="color-change-div">
            <label class="color-change-heading" for="background-color-input">Background</label>
            <input :value="store.state.backgroundColor" type="color" @change="backgroundColorChange"
                id="background-color-input">
        </div>
        <div class="color-change-div">
            <label class="color-change-heading" for="text-color-input">Text Color</label>
            <input :value="store.state.textColor" type="color" @change="textColorChange" id="text-color-input">
        </div>
        <div class="color-change-div">
            <label class="color-change-heading" for="top-flip-color-input">Top Flip</label>
            <input :value="store.state.topFlipColor" type="color" @change="topFlipColorChange"
                id="top-flip-color-input">
        </div>
        <div class="color-change-div">
            <label class="color-change-heading" for="bottom-flip-color-input">Bottom Flip</label>
            <input :value="store.state.bottonFlipColor" type="color" @change="bottomFlipColorChange"
                id="bottom-flip-color-input">
        </div>
        <button @click="resetColors" class="btn-selection load-more">Reset</button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { addDataToLocalStorage, getDataFromLocalStorage } from "../../assets/localStorage"


const store = useStore()
const defaultColors = {
    backgroundColor: "#161515",
    textColor: "#000000",
    topFlipColor: "#D9D9D9",
    bottomFlipColor: "#C3C3C3"
}


onMounted(() => {


    store.commit("changeBackgroundColor", getDataFromLocalStorage("backgroundColor") ? getDataFromLocalStorage("backgroundColor") : defaultColors.backgroundColor)
    store.commit("changeTextColor", getDataFromLocalStorage("textColor") ? getDataFromLocalStorage("textColor") : defaultColors.textColor)
    store.commit("changeTopFlipColor", getDataFromLocalStorage("topFlipColor") ? getDataFromLocalStorage("topFlipColor") : defaultColors.topFlipColor)
    store.commit("changeBottonFlipColor", getDataFromLocalStorage("bottomFlipColor") ? getDataFromLocalStorage("bottomFlipColor") : defaultColors.bottomFlipColor)


    document.documentElement.style.setProperty('--main-background', store.state.backgroundColor);
    document.documentElement.style.setProperty('--main-text', store.state.textColor);
    document.documentElement.style.setProperty('--top-half', store.state.topFlipColor);
    document.documentElement.style.setProperty('--bottom-half', store.state.bottonFlipColor);


})


function backgroundColorChange(e) {
    store.commit("changeBackgroundColor", e.target.value)
    addDataToLocalStorage("backgroundColor", e.target.value)
    addDataToLocalStorage("currentBackgroundImage", null)
    document.documentElement.style.setProperty('--main-background', e.target.value);
}
function textColorChange(e) {
    store.commit("changeTextColor", e.target.value)
    addDataToLocalStorage("textColor", e.target.value)
    document.documentElement.style.setProperty('--main-text', e.target.value);

}
function topFlipColorChange(e) {
    store.commit("changeTopFlipColor", e.target.value)
    addDataToLocalStorage("topFlipColor", e.target.value)
    document.documentElement.style.setProperty('--top-half', e.target.value);
}
function bottomFlipColorChange(e) {
    store.commit("changeBottonFlipColor", e.target.value)
    addDataToLocalStorage("bottomFlipColor", e.target.value)
    document.documentElement.style.setProperty('--bottom-half', e.target.value);

}
function resetColors() {
    document.documentElement.style.setProperty('--main-background', defaultColors.backgroundColor);
    document.documentElement.style.setProperty('--main-text', defaultColors.textColor);
    document.documentElement.style.setProperty('--top-half', defaultColors.topFlipColor);
    document.documentElement.style.setProperty('--bottom-half', defaultColors.bottomFlipColor);
    store.commit("changeBackgroundColor", defaultColors.backgroundColor)
    store.commit("changeTextColor", defaultColors.textColor)
    store.commit("changeTopFlipColor", defaultColors.topFlipColor)
    store.commit("changeBottonFlipColor", defaultColors.bottomFlipColor)

    addDataToLocalStorage("backgroundColor", defaultColors.backgroundColor)
    addDataToLocalStorage("textColor", defaultColors.textColor)
    addDataToLocalStorage("topFlipColor", defaultColors.topFlipColor)
    addDataToLocalStorage("bottomFlipColor", defaultColors.bottomFlipColor)
}
</script>

<style scoped>
.main-heading {
    color: white;
    font-size: 20px;
    margin-bottom: 20px;
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
</style>
