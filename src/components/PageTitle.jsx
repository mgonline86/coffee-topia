import { useEffect } from "react";

export default function PageTitle({ title = "Coffee Topia" }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
