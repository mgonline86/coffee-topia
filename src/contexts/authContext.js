import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Get cart from localStorage
const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const localUsers = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];
const dummyUsers = [
  {
    id: "user1-test-com",
    email: "user1@test.com",
    password:
      "5cb81a574c3f6e422906337217d62d99:100000:7af95657fe285a4751cf69061af905b1d402f66daae13dbdbfdda735bbb30c17e7adca0d1b8cbf4df9084ddaa3b5b340dddd98b49e3f831bd9019f5711f58070", // Abc123#
    name: "John Doe",
    address: "11 Main St, Cairo, Egypt",
    phone: "+20123456789",
    image: "img/avatar-1.png",
    orders: [],
  },
  {
    id: "user2-test-com",
    email: "user2@test.com",
    password:
      "5cb81a574c3f6e422906337217d62d99:100000:7af95657fe285a4751cf69061af905b1d402f66daae13dbdbfdda735bbb30c17e7adca0d1b8cbf4df9084ddaa3b5b340dddd98b49e3f831bd9019f5711f58070", // Abc123#
    name: "Jane Smith",
    address: "12 Main St, Alexandria, Egypt",
    phone: "+20123456789",
    image: "img/avatar-2.png",
    orders: [],
  },
];
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [users, setUsers] = useState([...dummyUsers, ...localUsers]);
  const [isLogged, setIsLogged] = useState(
    JSON.stringify(initialUser) !== "{}"
  );

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const salt = window.crypto.getRandomValues(new Uint8Array(16)); // Generate a 16-byte salt
    const iterations = 100000;
    const keyLength = 64;

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );

    const derivedKey = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: iterations,
        hash: "SHA-256",
      },
      key,
      keyLength * 8
    );

    const hashArray = Array.from(new Uint8Array(derivedKey));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const saltHex = Array.from(salt)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return `${saltHex}:${iterations}:${hashHex}`;
  }

  const getUserByEmail = (email) => {
    return users.find((user) => user.email === email);
  };

  async function validatePassword(password, storedHash) {
    try {
      const encoder = new TextEncoder();
      const [saltHex, iterations, originalHash] = storedHash.split(":");

      const salt = new Uint8Array(
        saltHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
      );
      const keyLength = 64;

      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits"]
      );

      const derivedKey = await crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt: salt,
          iterations: parseInt(iterations, 10),
          hash: "SHA-256",
        },
        key,
        keyLength * 8
      );

      const hashArray = Array.from(new Uint8Array(derivedKey));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      return hashHex === originalHash; // Return true if password matches
    } catch (error) {
      console.log("Error validating password");
      return false;
    }
  }

  const login = (user) => {
    setUser(user);
    setIsLogged(true);
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
  };

  const register = ({ email, password, name, address, phone }) => {
    const newUser = {
      id: email.replaceAll("@", "-").replaceAll(".", "-"),
      email,
      password,
      name,
      address,
      phone,
      orders: [],
    };
    // Add user to local storage
    localStorage.setItem("users", JSON.stringify([...localUsers, newUser]));
    setUsers([...users, newUser]);
    setUser(newUser);
    setIsLogged(true);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const value = {
    user,
    setUser,
    isLogged,
    setIsLogged,
    users,
    setUsers,
    login,
    logout,
    register,
    validatePassword,
    getUserByEmail,
    hashPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a CartProvider");
  }

  return context;
}
