import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("shows the primary navigation links", () => {
    render(<Header />);
    expect(screen.getAllByText("Inicio").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Proyectos").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contacto").length).toBeGreaterThan(0);
  });

  it("opens the mobile menu when the hamburger button is pressed", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const trigger = screen.getByRole("button", {
      name: "Abrir menú de navegación",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: "Cerrar menú de navegación" }),
    ).toBeInTheDocument();
  });
});
