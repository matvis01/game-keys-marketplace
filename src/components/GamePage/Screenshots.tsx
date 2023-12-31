import { Screenshot } from "../../types/gameType"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import "swiper/css/pagination"
import "swiper/css"
import "swiper/css/navigation"

function Screenshots({ screenshots }: { screenshots: Screenshot[] }) {
  return (
    <div className="w-full justify-center lg:w-1/2">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {screenshots.map((screenshot, index) => (
          <SwiperSlide key={index}>
            <img src={screenshot.image} alt={screenshot.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Screenshots
