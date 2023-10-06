import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => {
  return {
    useNavigate: jest.fn(),
  };
});

describe("App test suite", () => {
  test.skip("renders learn react link", () => {
    // render(
    //   <MemoryRouter initialEntries={["/home"]}>
    //     <App />
    //   </MemoryRouter>
    // );

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
  });
});
