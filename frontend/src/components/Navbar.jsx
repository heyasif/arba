import React from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="navbar">
      <Link to="/home" style={{ textDecoration: "none" }}>
        <h2 style={{ marginLeft: "20px" }}>Arba</h2>
      </Link>
      <div className="navbar-sub">
        <div>
          <FaShoppingCart size={25} />
        </div>
        <Flex
          alignItems={"center"}
          style={{ zIndex: "10", border: "transparent" }}
        >
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <FaUserCircle size={30} color="black" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogout}>
                <p>Logout</p>
              </MenuItem>

              <MenuItem onClick={handleProfile}>
                <p>Profile</p>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </div>
    </div>
  );
};

export default Navbar;
