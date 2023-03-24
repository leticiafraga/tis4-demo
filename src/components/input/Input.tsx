import React, { forwardRef } from "react";
import style from "./input.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

function Input(
  { label, error, ...props }: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <>
      {label ? <label htmlFor={props.id}>{label}</label> : ""}
      <input
        {...props}
        ref={ref}
        className={"form-control " + (error ? style.error : "")}
        onWheel={(e) => e.currentTarget.blur()}
      />
    </>
  );
}

export default forwardRef(Input);
