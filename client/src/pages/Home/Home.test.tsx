import React from "react";
import { Home } from "./Home";
import { render, screen } from "@testing-library/react";

const mockLogin = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useNavigate: jest.fn(),
  };
});

describe("Home page test suite", () => {
  test("renders correctly", () => {
    render(<Home loginHandler={mockLogin}></Home>);

    const button = screen.getByRole("button", { name: "Log in with Spotify" });
    expect(button).toBeInTheDocument();
  });
});
