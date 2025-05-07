import React from "react";
import "./TypingLoader.css";

interface Props {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}
export const TypingLoader = ({ className }: Props) => {
  return (
    <div className={`${className} typing`}>
      <span className="circle scaling"></span>
      <span className="circle scaling"></span>
      <span className="circle scaling"></span>
    </div>
  );
};
