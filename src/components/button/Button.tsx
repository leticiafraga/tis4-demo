import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import style from "./button.module.scss";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  className?: string;
}

export default function Button(props: Props) {
  return (
    <button className={"btn btn-primary" + style.btn + " " + props.className}>
      {props.children}
    </button>
  );
}
