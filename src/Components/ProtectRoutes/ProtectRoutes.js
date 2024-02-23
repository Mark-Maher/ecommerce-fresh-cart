import {Navigate} from "react-router-dom";

function ProtectRoutes(props) {
  if (localStorage.getItem("user") != null) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectRoutes;
