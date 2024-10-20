import {
  BanIcon,
  CheckCheckIcon,
  HourglassIcon,
  IdCard,
  Mail,
  MapPinHouseIcon,
  Phone,
  User2Icon,
} from "lucide-react";
import { useEffect } from "react";
import { Badge, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import OrderDetailsModal from "../components/OrderDetailsModal";
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

  const orderStatus = (status) => {
    switch (status) {
      case "cancelled":
        return (
          <Badge
            className="d-flex align-items-center justify-content-center"
            bg="secondary"
            text="dark"
            pill
          >
            <BanIcon size={14} />
            Cancelled
          </Badge>
        );
      case "fulfilled":
        return (
          <Badge
            className="d-flex align-items-center justify-content-center"
            bg="success"
            pill
          >
            <CheckCheckIcon size={14} />
            Fullfilled
          </Badge>
        );
      default:
        return (
          <Badge
            className="d-flex align-items-center justify-content-center"
            bg="warning"
            text="dark"
            pill
          >
            <HourglassIcon size={14} />
            Pending
          </Badge>
        );
    }
  };

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

      {user?.orders.length > 0 && (
        <Row className="my-5">
          <Col>
            <h2 className="text-center">Your Orders</h2>
          </Col>

          <Table
            responsive="md"
            size="sm"
            striped
            style={{ verticalAlign: "middle" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {user?.orders.map((order) => {
                return (
                  <tr
                    key={order.id}
                    className={
                      order.status === "cancelled"
                        ? "text-decoration-line-through"
                        : undefined
                    }
                  >
                    <td>{order.id}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>
                      <div className="d-flex align-items-center flex-nowrap">
                        <span className="me-1">EGP</span>
                        {order.total.toFixed(2)}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex">{orderStatus(order.status)}</div>
                    </td>
                    <td>
                      <OrderDetailsModal order={order} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      )}
    </Container>
  );
}
