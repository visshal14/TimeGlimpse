<template>
    <a href="/">
        <img src="../../assets/logo.png" alt="logo" class="logo" />
        <h1>Time Glimpse</h1>
    </a>
    <button @click="openSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 448 512">
            <path
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>

    </button>

</template>
<script setup>
import { useStore } from 'vuex';
const store = useStore();
function openSidebar() {
    store.commit('changeIsSideBarOpen', true)
}
</script>


<style scoped>
a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    height: 50px;

    position: fixed;
    top: 10px;
    left: 10px;
    color: white;
    text-decoration: none;

}

h1 {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    color: var(--top-half);
}

.logo {
    height: 100%;
    object-fit: contain;
}

button {
    top: 20px;
    right: 20px;
    position: fixed;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    margin: 0;
    border-radius: 5px;
}

svg {
    fill: var(--top-half);
}

button:hover {
    background-color: rgba(255, 255, 255, 0.4);
}
</style>