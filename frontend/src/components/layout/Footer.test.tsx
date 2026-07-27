import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("links to both project detail pages", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Begonias de Aranjuez" })).toHaveAttribute(
      "href",
      "/proyectos/begonias-de-aranjuez",
    );
    expect(screen.getByRole("link", { name: "Prados del Oeste" })).toHaveAttribute(
      "href",
      "/proyectos/prados-del-oeste",
    );
  });

  it("shows the current year in the copyright line", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
