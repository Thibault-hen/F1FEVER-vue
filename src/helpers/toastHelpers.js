import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export function useToastHelpers() {
  const success = (text) => {
    toast.success(text, {
      theme: 'auto',
      type: 'default',
      autoClose: 3000,
      position: 'top-center',
      dangerouslyHTMLString: true
    })
  }

  const error = (text) => {
    toast.error(text, {
      theme: 'auto',
      type: 'default',
      autoClose: 3000,
      position: 'top-center',
      dangerouslyHTMLString: true
    })
  }

  return { success, error }
}
