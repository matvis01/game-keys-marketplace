import React from "react"
import useContractFunctions from "@/hooks/useContractFunctions"

interface ConfirmDeleteModalProps {
  id: string
  onDelete: () => void
}

const ConfirmDeleteModal = ({ id, onDelete }: ConfirmDeleteModalProps) => {
  const { cancelListing } = useContractFunctions()

  const closeModal = () => {
    if (document)
      (
        document.getElementById("delete_listing_modal") as HTMLFormElement
      ).close()
    onDelete()
  }

  const onConfirm = () => {
    //cancelListing(id)
    closeModal()
    onDelete()
  }

  return (
    <dialog id="delete_listing_modal" className="modal">
      <div className="modal-box w-9/12 max-w-5xl sm:w-6/12 lg:w-4/12 xl:w-3/12">
        <h3 className="text-center text-xl font-bold">Delete Listing</h3>
        <p className="py-4 text-center">
          Are you sure you want to delete this listing?
        </p>
        <div className="flex items-end justify-center gap-2">
          <button
            className="w-18 btn btn-error btn-md text-white"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="w-18 btn btn-neutral btn-md text-white"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="btn btn-ghost btn-sm absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>close</button>
      </form>
    </dialog>
  )
}

export default ConfirmDeleteModal
