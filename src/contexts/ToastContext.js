import { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  return (
    <ToastContext.Provider value={{ toast: toast }}>
      {children}
      <ToastContainer stacked hideProgressBar position="bottom-center" />
    </ToastContext.Provider>
  );
};

export default function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }

  return context;
}
