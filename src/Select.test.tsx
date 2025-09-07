import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Select from "./Select";

describe("Select Component - Initial Rendering", () => {
  test("should render select input with placeholder text when no value is selected", () => {
    render(
      <Select placeholder="123">
        <Select.Option value={1}>1</Select.Option>
      </Select>,
    );

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("123");
  });

  test("should render dropdown in closed state by default", () => {
    render(
      <Select>
        <Select.Option value={1}>1</Select.Option>
      </Select>,
    );

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("should display selected value in input when a value is provided", () => {
    render(
      <Select value={1}>
        <Select.Option value={1}>1</Select.Option>
      </Select>,
    );

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("1");
  });
});

describe("Select Component - User Interactions", () => {
  test("should apply hover styles when mouse enters select button", async () => {
    render(
      <Select>
        <Select.Option value={1}>1</Select.Option>
      </Select>,
    );

    const input = screen.getByRole("textbox");
    await userEvent.hover(input);

    expect(input).toHaveStyle({ cursor: "pointer" });
  });

  test("should open dropdown and focus input when select button is clicked", async () => {
    render(
      <Select>
        <Select.Option value={1}>1</Select.Option>
      </Select>,
    );

    const input = screen.getByRole("textbox");
    await userEvent.click(input);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  test("should close dropdown when select button is clicked while dropdown is open", async () => {
    render(
      <Select>
        <Select.Option value={1}>1</Select.Option>
      </Select>,
    );

    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    expect(screen.getByRole("list")).toBeInTheDocument();

    await userEvent.click(input);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("should update input value and close dropdown when an option is selected", async () => {
    render(
      <Select>
        <Select.Option value={1}>1</Select.Option>
        <Select.Option value={2}>2</Select.Option>
      </Select>,
    );

    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    const option = screen.getAllByRole("listitem")[0];
    await userEvent.click(option);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toHaveValue("1");
  });

  test("should close dropdown and blur input when clicking outside the component", async () => {
    render(
      <div data-testid="1">
        <Select>
          <Select.Option value={1}>1</Select.Option>
        </Select>
      </div>,
    );

    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    expect(screen.getByRole("list")).toBeInTheDocument();
    const outside = screen.getByTestId("1");
    await userEvent.click(outside);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});

describe("Select Component - Keyboard Navigation", () => {
  test("should open dropdown when Enter or Space key is pressed on select button", async () => {
    expect(false).toBe(true);
  });

  test("should navigate through options using Arrow keys", async () => {
    expect(false).toBe(true);
  });

  test("should select highlighted option when Enter key is pressed", async () => {
    expect(false).toBe(true);
  });

  test("should close dropdown when Escape key is pressed", async () => {
    expect(false).toBe(true);
  });
});
