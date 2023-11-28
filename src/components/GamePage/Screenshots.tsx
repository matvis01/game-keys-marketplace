import { Screenshot } from "../../types/gameType"

function Screenshots({ screenshots }: { screenshots: Screenshot[] }) {
  return (
    <div className=" w-1/2 justify-center">
      <div className="carousel ">
        {screenshots.map((screenshot, index) => {
          return (
            <div
              id={screenshot.id.toString()}
              className="carousel-item  aspect-video w-full object-cover"
            >
              <img key={index} src={screenshot.image} className="w-full" />
            </div>
          )
        })}
      </div>
      <div className="flex w-full justify-center gap-2 py-2 ">
        {screenshots.map((screenshot, index) => {
          return (
            <a href={"#" + screenshot.id.toString()} className="btn btn-xs">
              {index + 1}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Screenshots
