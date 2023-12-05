import React from "react"

const ConfirmDeleteModal = () => {
  const closeModal = () => {
    if (document)
      (
        document.getElementById("delete_listing_modal") as HTMLFormElement
      ).close()
  }

  return (
    <dialog id="delete_listing_modal" className="modal">
      <div className="modal-box w-3/12 max-w-5xl">
        <h3 className="text-center text-xl font-bold">Delete Listing</h3>
        <p className="py-4 text-center">
          Are you sure you want to delete this listing?
        </p>
        <div className="flex items-end justify-center gap-2">
          <button
            className="w-18 btn btn-error btn-md text-white"
            onClick={() => {
              console.log("DODAĆ USUWANIE LISTINGU TUTAJ")
            }}
          >
            Delete
          </button>
          <button
            className="w-18 btn btn-neutral btn-md text-white"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
        <button
          className="btn btn-ghost btn-sm absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default ConfirmDeleteModal
