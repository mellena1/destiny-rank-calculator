import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders header", () => {
  const { getByText } = render(<App />);
  const h1Element = getByText(/Destiny Rank Calculator/i);
  expect(h1Element).toBeInTheDocument();
});
