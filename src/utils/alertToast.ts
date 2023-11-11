import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const toastifySuccess = (description: string, autoClose: number) => {
  toast.success(description, {
    position: "bottom-right",
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  })
}

export const toastifyError = (description: string, autoClose: number) => {
  toast.error(description, {
    position: "bottom-right",
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  })
}
