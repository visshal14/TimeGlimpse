<template>
    <div class="section-div">
        <h1 class="main-heading">Clock Size</h1>
        <div class="clock-size-div">
            <button @click="increaseClockSize" class="btn-selection clock-size-button">+</button>
            <button @click="decreaseClockSize" class="btn-selection clock-size-button">-</button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore()
function increaseClockSize() {
    store.commit('changeClockSize', store.state.clockSize + 10)
}
function decreaseClockSize() {
    if (store.clockSize <= 20) return
    store.commit('changeClockSize', store.state.clockSize - 10)
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



.clock-size-button {
    width: 35px;
    height: 35px;
    font-size: 20px;
}



.clock-size-div {
    display: flex;
    gap: 10px
}
</style>