import React from "react";
import "./Dropdown.css";

const Dropdown = ({ handleSelect}) => {
  const options = [
    {type:"Men's",id:"660e118ef1745fac0f1b08eb" },
    {type:"Women's",id:"660e195a1a648c15477c4842" },
    {type:"Children's",id:"660e3907bcfa35e44382f1d9" },
  ];
  const handleClick = (option) => {
    handleSelect(option);
  };
  return (
    <div className="d-menu">
      {options.map((option) => (
        <li key={option.id} onClick={() => handleClick(option.id)}>{option.type}
        </li>
      ))}
    </div>
  );
};

export default Dropdown;
