import { Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";

const imagesPath = "/img/carousel/";
const imgExt = ".webp";

const images = [
  {
    img: "1",
    url: "/products?q=Dolce+Vita",
  },
  {
    img: "2",
    url: "/products?q=Lavazza",
  },
  {
    img: "3",
    url: "/products?brands=Nespresso+-+Daniel%27s",
  },
  {
    img: "4",
    url: "/products/bristot-nespresso-compatible-bundle-of-3",
  },
];

export default function HeroSection() {
  return (
    <Carousel indicators className={styles.heroCarousel}>
      {images.map(({ img, url }) => (
        <Carousel.Item key={img} as={Link} to={url}>
          <Image src={imagesPath + img + imgExt} alt={`Slide ${img}`} fluid />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
