import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectCard from "@/components/home/ProjectCard";
import { projects } from "@/data/projects";

describe("ProjectCard", () => {
  const project = projects[0];

  it("renders the project name, status and a link to its detail page", () => {
    render(<ProjectCard project={project} />);

    expect(
      screen.getByRole("heading", { name: project.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(project.statusLabel)).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/proyectos/${project.slug}`);
  });
});
