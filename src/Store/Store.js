import { createStore } from 'vuex'


const store = createStore({
    state() {
        return {
            isSideBarOpen: false,
            clockFormat: 'AM',
            clockSize: 20,
            backgroundColor: "#161515",
            textColor: "#000000",
            topFlipColor: "#D9D9D9",
            bottonFlipColor: "#C3C3C3",
            resetColor: "",
            clockStyle: "solid",
            is24Hour: false,
            showDate: false
        }
    },
    mutations: {
        changeIsSideBarOpen(state, value) {
            state.isSideBarOpen = value
        },
        changeClockFormat(state, value) {
            state.clockFormat = value
        },
        changeClockSize(state, value) {
            state.clockSize = value
        },
        changeBackgroundColor(state, value) {
            state.backgroundColor = value
        },
        changeTextColor(state, value) {
            state.textColor = value
        },
        changeTopFlipColor(state, value) {
            state.topFlipColor = value
        },
        changeBottonFlipColor(state, value) {
            state.bottonFlipColor = value
        },
        changeResetColor(state, value) {
            state.resetColor = value
        },
        changeClockStyle(state, value) {
            state.clockStyle = value
        },
        changeIs24Hour(state, value) {
            state.is24Hour = value
        },
        changeShowDate(state) {
            state.showDate = !state.showDate
        }
    }
})

export default store


// @clock-format="changeClockFormat" @show-date="changeShowDate" @clock-style="changeStyle"
// @increase-clock - size="increaseClockSize" @decrease-clock - size="decreaseClockSize" : isDateShow = "showDate"
// : isSideBar = "isSideBarOpen" @close-sidebar="closeSideBar"
// 
// 
// 
// 