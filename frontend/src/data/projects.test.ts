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
    "gives $name a non-empty gallery and exactly 2 panoramas",
    (project) => {
      // Gallery length is intentionally not fixed to any number - projects
      // can have as many photos as they need.
      expect(project.gallery.length).toBeGreaterThan(0);
      expect(project.tour360).toHaveLength(2);
    },
  );

  it("does not force every project to have the same number of photos", () => {
    const counts = projects.map((project) => project.gallery.length);
    expect(new Set(counts).size).toBeGreaterThan(1);
  });

  it("finds a project by slug", () => {
    const project = getProjectBySlug("prados-del-oeste");
    expect(project?.name).toBe("Prados del Oeste");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("no-existe")).toBeUndefined();
  });
});
