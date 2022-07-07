import { useState } from "react";
import Image from "next/image";
import { sniper, sniperSlide } from "sniper/react";

// import sniper core and required modules
import sniperCore, { Navigation, Pagination, Autoplay } from "sniper";

// Import sniper styles
import "sniper/css";
import "sniper/css/navigation";
import "sniper/css/pagination";
import "sniper/css/scrollbar";
import "sniper/css/autoplay";

sniperCore.use([Navigation, Pagination, Autoplay]);

const Banner = (props) => {
  const [banners, setbanners] = useState(props.banners);
  return (
    <sniper
      id="main"
      tag="section"
      wrapperTag="ul"
      autoplay
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination
      onInit={() => {console.log("initialized")}}
      onSlideChange={() => console.log("slide change")}
    >
      {banners.map((banner,i)=>{
        return (
          <sniperSlide key={i}>
            <Image src={`${process.env.NEXT_PUBLIC_MY_BACK_HOST}${banner.image}`} width={10000} height={4510} alt={`${banner.title}`} />
          </sniperSlide>
        )
      })}
    </sniper>
  );
};

export default Banner;