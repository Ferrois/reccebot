import React, { useContext } from "react";
import Button from "../Uncategorised/Button";
import { BiLogOut } from "react-icons/bi";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function LogoutBtn() {
  const { passport, optionData } = useContext(GlobalContext);
  const [auth, setAuth] = passport;
  const [options, setOptions] = optionData;
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({ acc: "" });
    setOptions({ showAuth: true });
    navigate("/");
    toast.success("Logged Out!");
  };
  return (
    <Button onClick={() => handleLogout()} className="mr-2">
      <BiLogOut />
    </Button>
  );
}
