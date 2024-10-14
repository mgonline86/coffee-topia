import { IdCard, Mail, MapPinHouseIcon, Phone, SquareUser } from "lucide-react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

export default function ProfilePage() {
  const user = {
    name: "Mohamed Ali",
    email: "mohamed_ali@gmail.com",
    image: "img/cartoon.png",
    phone: "01013760783",
    address: "125 Roshdy, abuquir st,alexandria",
    orders: [],
  };
  return (
    <Container>
      <Row>
        <Col xs={12} md={6} className="mt-4 mb-3" >
          {user?.image ? (
            <Image className="rounded-5"
              xs={12}
              md={6}
              width={500}
              height={400}
              src={user.image}
              alt={user.name}
            />
          ) : (
            <SquareUser size={400} />
          )}
        </Col>
        <Col xs={12} md={6} className="my-5">
          <p className="fs-4"> <IdCard className="me-2" />
            <span className="fw-bold me-2">Name:</span>
            {user.name}
          </p>
          <p className="fs-4"> <Mail className="me-2"/>
            <span className="fw-bold me-2">Email:</span>
            {user.email}
          </p>
          <p className="fs-4"> <Phone className="me-2"/>
            <span className="fw-bold me-2">Phone:</span>
            {user.phone}
          </p>
          <p className="fs-4"> <MapPinHouseIcon className="me-2" />
            <span className="fw-bold me-2">Address:</span>
            {user.address}
          </p>
          
        </Col>
      </Row>
    </Container>
  );
}
