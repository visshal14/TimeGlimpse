export function addDataToLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}
export function getDataFromLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key))
}