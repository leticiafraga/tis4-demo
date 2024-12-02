import { render, screen } from "@testing-library/react";
import Input from "../components/input/Input";

test("Renders input label", () => {
    const label = "Massa corporal (kg)";

    render(<Input label={label} />);

    expect(screen.getByText(label)).toBeInTheDocument();
});
