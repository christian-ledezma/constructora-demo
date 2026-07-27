import { describe, expect, it } from "vitest";
import { getProjectBySlug, projects } from "@/data/projects";

describe("projects data", () => {
  it("exposes exactly two projects", () => {
    expect(projects).toHaveLength(2);
  });

  it("includes Begonias de Aranjuez and Prados del Oeste", () => {
    const slugs = projects.map((project) => project.slug);
    expect(slugs).toEqual(
      expect.arrayContaining(["begonias-de-aranjuez", "prados-del-oeste"]),
    );
  });

  it.each(projects)(
    "gives $name exactly 5 gallery images and 2 panoramas",
    (project) => {
      expect(project.gallery).toHaveLength(5);
      expect(project.tour360).toHaveLength(2);
    },
  );

  it("finds a project by slug", () => {
    const project = getProjectBySlug("prados-del-oeste");
    expect(project?.name).toBe("Prados del Oeste");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("no-existe")).toBeUndefined();
  });
});
