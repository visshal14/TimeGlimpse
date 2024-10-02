<template>
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
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { addDataToLocalStorage, getDataFromLocalStorage } from "../../assets/localStorage"
import Background from '../../assets/background.json'

const BackgroundMain = reactive({ Background })
const importedBackground = ref([])
const backgroundCount = ref(4)
const imageUpload = ref(null)
const store = useStore()


onMounted(() => {

    fetchJsonFile()
    getDataFromLocalStorage("addedBackground") ? importedBackground.value = getDataFromLocalStorage("addedBackground") : importedBackground.value = []
    getDataFromLocalStorage("currentBackgroundImage") ? newBackground({ target: { src: getDataFromLocalStorage("currentBackgroundImage") } }) : document.documentElement.style.setProperty('--main-background', store.state.backgroundColor);

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
function removeBackground() {
    addDataToLocalStorage("currentBackgroundImage", null)
    document.documentElement.style.setProperty('--main-background', store.state.backgroundColor);
}
</script>


<style scoped>
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


.section-div .background-image {
    width: calc(50% - 5px);
    height: 70px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 5px;
}
</style>