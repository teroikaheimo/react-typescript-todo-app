import { queryByAttribute, render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const view = render(<App />);
  const appRoot = queryByAttribute("id", view.container, "app-root");
  expect(appRoot).toBeInTheDocument();
});
