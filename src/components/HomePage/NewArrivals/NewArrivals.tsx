import React from "react"

const NewArrivals = () => {
  return (
    <>
      <h1 className="mb-6 text-center text-4xl text-white">Bestsellers</h1>
      {/* {loading && (
        <div className="flex h-96 items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )} */}
      {/* {!loading && !error && ( */}
      <>
        <div className="mx-auto grid h-fit max-w-screen-xl grid-flow-col grid-cols-1 grid-rows-6 gap-y-6 px-4 lg:grid-cols-2 lg:grid-rows-3">
          <>{}</>
        </div>
        <div className="flex items-center justify-center">
          <button className="btn btn-primary btn-wide mb-3 mt-6 text-white">
            Explore more
          </button>
        </div>
      </>
      {/* )} */}
    </>
  )
}

export default NewArrivals
