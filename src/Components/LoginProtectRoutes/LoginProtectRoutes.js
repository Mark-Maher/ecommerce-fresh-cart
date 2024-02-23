import {Navigate} from "react-router-dom";

function LoginProtectRoutes(props) {
  if (localStorage.getItem("user") != null) {
    return <Navigate to={"/home"} />;
  } else {
    return props.children;
  }
}
export default LoginProtectRoutes;
