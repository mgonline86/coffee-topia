import { IdCard, Mail, MapPinHouseIcon, Phone, User2Icon } from "lucide-react";
import { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  });

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Row>
        <Col
          xs={12}
          md={6}
          className="mt-4 mb-3 d-flex justify-content-md-center"
        >
          {user?.image ? (
            <Image
              className="rounded-5"
              xs={12}
              md={6}
              width={400}
              height={400}
              src={user.image}
              alt={user.name}
              fluid
            />
          ) : (
            <User2Icon
              size={400}
              strokeWidth={0.25}
              className="img-fluid border border-3 border-dark rounded-5"
              style={{ objectFit: "contain" }}
            />
          )}
        </Col>
        <Col xs={12} md={6} className={`my-3 my-md-5 ${styles.textSize}`}>
          <p className="fs-4">
            <IdCard className="me-2" />
            <span className="fw-bold me-2">Name:</span>
            {user.name}
          </p>
          <p className="fs-4">
            <Mail className="me-2" />
            <span className="fw-bold me-2">Email:</span>
            {user.email}
          </p>
          <p className="fs-4">
            <Phone className="me-2" />
            <span className="fw-bold me-2">Phone:</span>
            {user.phone}
          </p>
          <p className="fs-4">
            <MapPinHouseIcon className="me-2" />
            <span className="fw-bold me-2">Address:</span>
            {user.address}
          </p>
        </Col>
      </Row>
    </Container>
  );
}
