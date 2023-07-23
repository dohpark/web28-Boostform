import React, { useState } from "react";
import ToggleButtonProps from "./type";

function ToggleButton({ state, onClick }: ToggleButtonProps) {
  const [toggle, setToggle] = useState(state);

  const onClickToggle = () => {
    setToggle((prev) => !prev);
  };

  const toggleDefaultCss = "relative w-[42px] h-6 rounded-3xl";
  const toggleCss = toggle ? "bg-blue3" : "bg-grey9";
  const toggleClassName = `${toggleDefaultCss} ${toggleCss}`;

  const buttonDefaultCss = "absolute t-1 w-[18px] h-[18px] bg-white rounded-lg cursor-pointer duration-300 top-[3px]";
  const buttonCss = toggle ? "left-[21px]" : "left-[3px]";
  const buttonClassName = `${buttonDefaultCss} ${buttonCss}`;

  return (
    <div className="h-6">
      <div className={toggleClassName}>
        <button className={buttonClassName} onClick={onClickToggle} onTransitionEnd={() => onClick()} />
      </div>
    </div>
  );
}

export default ToggleButton;
