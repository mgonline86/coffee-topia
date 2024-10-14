import { User2Icon } from "lucide-react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserNavDropdown() {
  const user = false;
  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" id="dropdown-basic">
        <User2Icon />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {user ? (
          <>
            <Dropdown.Item as={Link} to={"/profile"}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item className="text-danger fw-semibold">
              Logout
            </Dropdown.Item>
          </>
        ) : (
          <>
            <Dropdown.Item
              as={Link}
              to={"/login"}
            >
              Login
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to={"/register"}
            >
              Register
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
