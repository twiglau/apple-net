import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "./redux/user-slice";

export default function AppInit() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
  }, []);

  return null;
}
