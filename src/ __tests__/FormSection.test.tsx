import { render, screen } from "@testing-library/react";
import FormSection from "../components/form-section/FormSection";

test("Renders the form content", () => {
    const header = "This is the header";
    const children = "children";

    render(<FormSection header={header}>{children}</FormSection>);

    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByText(children)).toBeInTheDocument();
    
});
