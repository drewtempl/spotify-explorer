import React from "react";
import { render, screen } from "@testing-library/react";
import { NavBar } from "./NavBar";

describe("NavBar test suite", () => {
  test("renders correctly", () => {
    render(<NavBar userData={undefined}></NavBar>);

    expect(screen.getByText('Playlist Premier')).toBeInTheDocument();
  });
});
