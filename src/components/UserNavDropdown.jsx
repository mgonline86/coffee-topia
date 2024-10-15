import { User2Icon } from "lucide-react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import useToastContext from "../contexts/ToastContext";

export default function UserNavDropdown() {
  const { user, isLogged, logout } = useAuthContext();
  const { toast } = useToastContext();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful", { position: "bottom-center" });
    } catch (error) {
      toast.error("Logout failed", { position: "bottom-center" });
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" id="dropdown-basic" size="sm">
        {isLogged ? (
          <>
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="rounded-circle border border-2 border-primary"
                style={{ width: 30, height: 30 }}
              />
            ) : (
              <>
                {user?.name ? (
                  <span
                    className="d-inline-block fw-semibold rounded-circle border border-2 border-primary text-primary text-uppercase"
                    style={{ width: 30, height: 30 }}
                  >
                    {user.name.slice(0, 1)}
                  </span>
                ) : (
                  <User2Icon />
                )}
              </>
            )}
          </>
        ) : (
          <User2Icon />
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        {isLogged ? (
          <>
            <Dropdown.Item as={Link} to={"/profile"}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item
              className="text-danger fw-semibold"
              onClick={handleLogout}
            >
              Logout
            </Dropdown.Item>
          </>
        ) : (
          <>
            <Dropdown.Item as={Link} to={"/login"}>
              Login
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={"/register"}>
              Register
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
