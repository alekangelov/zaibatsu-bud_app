import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import mergeProps from "merge-props";
interface IconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconProp;
}

const IconButton: React.FC<IconButtonProps> = ({ children, icon, ...rest }) => {
  return (
    <button {...mergeProps(rest, { className: "btn" })}>
      <span className="icon">
        <FontAwesomeIcon icon={icon} color={"white"} />
      </span>
      {children}
    </button>
  );
};

export default IconButton;
