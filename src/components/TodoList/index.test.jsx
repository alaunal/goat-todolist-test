import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from ".";

const handleDelete = jest.fn();

describe("Todo Form", () => {
  it("should render placeholder list", () => {
    const onLoad = true;
    render(<TodoList onDelete={handleDelete} isLoad={onLoad} />);
    const itemElm = screen.getAllByRole("placeholder");
    expect(itemElm.length).toBe(2);
  });

  it("should render empty information when data empty", () => {
    const data = [];
    render(<TodoList onDelete={handleDelete} data={data} />);
    const itemElm = screen.getByText("Task not available!");
    expect(itemElm).toBeInTheDocument();
  });

  it("should render 2 list items task", () => {
    const data = [
      {
        id: "755d06b2-a8b0-4f6f-9bf3-042a0ae36666",
        title: "task testing here",
        createAt: "07 Dec 2021, 09:10:54",
      },
      {
        id: "d4c27617-9727-4558-8524-2c3ff24eb7e0",
        title: "goat testing more!",
        createAt: "07 Dec 2021, 09:11:12",
      },
    ];
    render(<TodoList onDelete={handleDelete} data={data} />);
    const itemElm = screen.getAllByRole("item__task");
    expect(itemElm.length).toBe(2);
  });

  it("should success delete item", () => {
    const data = [
      {
        id: "755d06b2-a8b0-4f6f-9bf3-042a0ae36666",
        title: "task testing here",
        createAt: "07 Dec 2021, 09:10:54",
      },
    ];
    render(<TodoList onDelete={handleDelete} data={data} />);
    const btnElm = screen.getByRole("delete");
    fireEvent.click(btnElm);
    expect(handleDelete).toBeCalled();
  });
});
