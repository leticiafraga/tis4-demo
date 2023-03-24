import { PropsWithChildren } from "react";
import style from "./card.module.scss";

export default function Card(props: PropsWithChildren) {
  return <div className={style.card}>{props.children}</div>;
}