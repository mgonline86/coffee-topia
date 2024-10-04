import { Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";

const imagesPath = "img/carousel/";
const imgExt = ".webp";

const images = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function HeroSection() {
  return (
    <Carousel indicators className={styles.heroCarousel}>
      {images.map((image) => (
        <Carousel.Item key={image} as={Link} to={"/products"}>
          <Image
            src={imagesPath + image + imgExt}
            alt={`Slide ${image}`}
            fluid
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
