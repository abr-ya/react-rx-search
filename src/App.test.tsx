import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders react on main page", () => {
  render(<App />);
  const reactElement = screen.getByText(/react/i);
  expect(reactElement).toBeInTheDocument();
});
