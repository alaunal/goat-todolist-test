import { renderHook } from "@testing-library/react-hooks";
import { act, waitFor } from "@testing-library/react";
import { useTask } from "./useTask";

describe("useTask Test", () => {
  it("should initialize with two tasks successfully", async () => {
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

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
      }),
    );

    const { result } = renderHook(() => useTask());

    act(() => {
      result.current.loadItems();
    });

    await waitFor(() => {
      expect(result.current.items).toHaveLength(2);
    });

    global.fetch.mockRestore();
  });

  it("should add an item successfully", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      }),
    );

    const data = {
      id: "755d06b2-a8b0-4f6f-9bf3-042a0ae36666",
      title: "task testing here",
      createAt: "07 Dec 2021, 09:10:54",
    };

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
      }),
    );
    const { result } = renderHook(() => useTask());

    act(() => {
      result.current.addItem(data.title);
    });

    await waitFor(() => {
      expect(result.current.items).toHaveLength(1);
    });

    global.fetch.mockRestore();
  });

  it("should delete an item successfully", async () => {
    const data = {
      id: "755d06b2-a8b0-4f6f-9bf3-042a0ae36666",
      title: "task testing here",
      createAt: "07 Dec 2021, 09:10:54",
    };

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([data]),
      }),
    );

    const { result } = renderHook(() => useTask());

    act(() => {
      result.current.deleteItem(data.id);
    });

    await waitFor(() => {
      expect(result.current.items).toHaveLength(0);
    });

    global.fetch.mockRestore();
  });
});
