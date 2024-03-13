import { ref, onBeforeUnmount } from 'vue'

const useNetwork = () => {
  const online = ref(true)

  const updateNetWork = () => {
    online.value = navigator.onLine
  }

  window.addEventListener('online', updateNetWork)
  window.addEventListener('offline', updateNetWork)

  onBeforeUnmount(() => {
    window.removeEventListener('online', updateNetWork)
    window.removeEventListener('offline', updateNetWork)
  })
  return { online }
}

export { useNetwork }
