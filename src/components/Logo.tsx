import React from "react";
import { ReactComponent as LogoSVG } from "@/assets/logo.svg";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return <LogoSVG className={className} />;
};

export default Logo;
