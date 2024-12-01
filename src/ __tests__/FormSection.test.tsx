import { render } from "@testing-library/react";
import FormSection from "../components/form-section/FormSection";
import Input from "../components/input/Input";

test("Renders the form content", () => {
    const header = "This is the header";

    render(
        <FormSection header={header}>
            <Input label="Massa corporal (kg)" disabled value={0} />
            <Input label="% Gordura corporal" disabled value={0} />
        </FormSection>
    );
});
