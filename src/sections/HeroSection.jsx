import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const imagesPath = "img/carousel/";
const imgExt = ".webp";

const images = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const directionButtons = (direction) => {
  return (
    <div className="p-2 bg-dark rounded-circle" style={{ width: "3rem", height: "3rem" }}>
        <span
          aria-hidden="true"
          className={`carousel-control-${direction}-icon`}
        ></span>
    </div>
  );
};

export default function HeroSection() {
  return (
    <Carousel
      indicators
      nextIcon={directionButtons("next")}
      prevIcon={directionButtons("prev")}
    >
      {images.map((image) => (
        <Carousel.Item key={image} as={Link} to={"/products"}>
          <img src={imagesPath + image + imgExt} alt={`Slide ${image}`} className="d-block w-100" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
