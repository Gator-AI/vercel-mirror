import React from "react";
import Image from "next/image";
import StarIcon from "../images/icons/star-icon.png";

function Navbar() {
  return (
    <div className="w-full flex items-center bg-red-500">
      <div>
        <Image src={StarIcon} alt="Star Icon" width={50} height={50} />
        <p>GatorAI</p>
      </div>
    </div>
  );
}

export default Navbar;
