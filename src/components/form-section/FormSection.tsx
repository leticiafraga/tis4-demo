import React from "react";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  header: string;
}
export default function FormSection({ header, children }: Props) {
  return (
    <div className="mb-4">
      <h3>{header}</h3>
      <div className="row">
        {React.Children.map(children, (child) => (
          <div className="col-md-4 col-lg-3">{child}</div>
        ))}
      </div>
    </div>
  );
}
