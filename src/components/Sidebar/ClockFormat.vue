<template>
    <h1 class="main-heading">Clock Format</h1>
    <div class="section-div">
        <button class="btn-selection" @click="changeClockFormat(true)">24 Hour</button>
        <button class="btn-selection" @click="changeClockFormat(false)">12 hour</button>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { addDataToLocalStorage } from "../../assets/localStorage"

const store = useStore()
function changeClockFormat(n) {
    addDataToLocalStorage("clockformat", n ? "24-hour" : "12-hour")
    store.commit('changeIs24Hour', n)
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
</style>