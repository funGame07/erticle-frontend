
function useLocalStorage() {
  function set(key, val){
    localStorage.setItem(key, JSON.stringify({
        val,
        expiry: null
    }))
  }
}

export default useLocalStorage