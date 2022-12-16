import React from "react";
import Image from "next/image";
import classes from "./Avatar.module.css";

interface AvatarProps {
  className?: string;
  style?: { [key: string]: any };
  image: string;
  width: number;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({
  className,
  style,
  image,
  width,
  alt,
}) => {
  return (
    <div className={`${classes["avatar"]} ${className}`} style={style}>
      <Image
        src={"http://localhost:5000/" + image}
        alt={alt}
        width={width}
        height={width}
      />
    </div>
  );
};

export default Avatar;
