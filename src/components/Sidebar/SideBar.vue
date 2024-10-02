<template>

    <div class="sidebar-main">
        <button class="btn-selection close" @click="closeSideBar">
            <img src="../../assets/hamburger.svg" alt="close" />
        </button>

        <ClockFormat />
        <ClockSizePanel />
        <ColorPanel />
        <BackgroundSelector />
    </div>

</template>

<script setup>
import { useStore } from 'vuex';
import { BackgroundSelector, ColorPanel, ClockSizePanel, ClockFormat } from '@/Index/ComponentIndex';

const props = defineProps(['isDateShow', 'isSideBar'])
const store = useStore()
function closeSideBar() {
    store.commit('changeIsSideBarOpen', false)
}


</script>



<style scoped>
.sidebar-main {
    position: fixed;
    width: 300px;
    visibility: v-bind('`${store.state.isSideBarOpen ? "visible" : "hidden"}`');
    top: 0;
    right: 0;
    height: 100%;
    overflow-y: scroll;
    background-color: #000000;
    padding: 60px 20px;
}

.sidebar-main::-webkit-scrollbar {
    display: none;
}







.btn-selection {
    background-color: #575757;
    color: white;
    border: 1px solid white;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}





.close {
    background-color: transparent;
    border: none;
    width: fit-content;
    position: absolute;
    top: 20px;
    right: 20px;
}

.close img {
    height: 20px;
    width: 20px;
}

.close:hover {
    background-color: rgba(255, 255, 255, 0.4);
}
</style>