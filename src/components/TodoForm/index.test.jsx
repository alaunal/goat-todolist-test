import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from ".";

const handleAdd = jest.fn();

describe("Todo Form", () => {
  it("should render input element", () => {
    render(<TodoForm onAdd={handleAdd} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should be able to type into input", () => {
    render(<TodoForm onAdd={handleAdd} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "Go Grocery Shopping" } });
    expect(inputElement.value).toBe("Go Grocery Shopping");
  });

  it("onAdd is successfully called", () => {
    render(<TodoForm onAdd={handleAdd} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "Go Grocery Shopping" } });
    const buttonElement = screen.getByText("Add Task");
    fireEvent.click(buttonElement);
    expect(handleAdd).toBeCalled();
  });

  it("should have empty input when add button is cliked", () => {
    render(<TodoForm onAdd={handleAdd} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, { target: { value: "Go Grocery Shopping" } });
    const buttonElement = screen.getByText("Add Task");
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe("");
  });

  it("should have handle error empty input", () => {
    render(<TodoForm onAdd={handleAdd} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, { target: { value: "" } });
    const buttonElement = screen.getByText("Add Task");
    fireEvent.click(buttonElement);
    expect(screen.getByText("Task name can't empty!")).toBeInTheDocument();
  });

  it("should have handle error empty maximum character 160", () => {
    render(<TodoForm onAdd={handleAdd} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, {
      target: {
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
      },
    });
    const buttonElement = screen.getByText("Add Task");
    fireEvent.click(buttonElement);
    expect(screen.getByText("Maximum of character task name 160 char")).toBeInTheDocument();
  });

  it("disabled button & input add on process", () => {
    const isPorcess = true;
    render(<TodoForm isProcess={isPorcess} />);

    expect(screen.getByText("Add Task")).toBeDisabled();
    expect(screen.getByPlaceholderText(/Add a new task here.../i)).toBeDisabled();
  });
});
