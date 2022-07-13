import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide} from "swiper/react";
// import "./styles.css";
import { Autoplay, Pagination   } from "swiper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



export default function Carousel2() {

    const {AllBigEvents} = useSelector(state => state)

  return (
    <>
    <Swiper
    autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={true}
      centeredSlides={true}
      slidesPerView={3}
      spaceBetween={30}
      Autoplay={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >

{    AllBigEvents?.map((e) => {return(
                 <SwiperSlide>
                     <Link style={{ textDecoration: "none" }} to={`/detail/${e.id}`}>
                  <img  alt='' src={e.performerImage}/>
                        </Link>
                  </SwiperSlide>
              )})
            }
      {/* <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide> */}
    </Swiper>
  </>
  )
}
