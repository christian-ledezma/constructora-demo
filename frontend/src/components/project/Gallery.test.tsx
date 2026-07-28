import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Gallery from "@/components/project/Gallery";

const makeImages = (count: number) =>
  Array.from({ length: count }, (_, i) => `/images/test-${i + 1}.jpg`);

describe("Gallery", () => {
  it("shows at most 5 thumbnails even with more photos than that", () => {
    render(<Gallery projectName="Test" images={makeImages(8)} />);
    // 1 mobile lead thumbnail + 5 desktop mosaic thumbnails = 6 buttons
    // that open a specific photo (plus the "view all" button).
    const photoButtons = screen.getAllByRole("button", {
      name: /Ver foto \d+ de Test/,
    });
    expect(photoButtons.length).toBeLessThanOrEqual(6);
  });

  it("renders a thumbnail per photo when there are 3 or fewer", () => {
    render(<Gallery projectName="Test" images={makeImages(3)} />);
    expect(
      screen.getByRole("button", { name: /Ver foto 3 de Test/ }),
    ).toBeInTheDocument();
  });

  it("shows the exact photo count on the 'view all' button", () => {
    render(<Gallery projectName="Test" images={makeImages(8)} />);
    expect(
      screen.getByRole("button", { name: /Ver las 8 fotos/ }),
    ).toBeInTheDocument();
  });

  it("hides the 'view all' button for a single photo", () => {
    render(<Gallery projectName="Test" images={makeImages(1)} />);
    expect(
      screen.queryByRole("button", { name: /Ver las/ }),
    ).not.toBeInTheDocument();
  });

  it("opens the lightbox when a thumbnail is clicked", async () => {
    const user = userEvent.setup();
    render(<Gallery projectName="Test" images={makeImages(5)} />);

    expect(document.querySelector(".yarl__container")).toBeNull();

    const [firstThumbnail] = screen.getAllByRole("button", {
      name: /Ver foto 1 de Test/,
    });
    await user.click(firstThumbnail);

    expect(document.querySelector(".yarl__container")).not.toBeNull();
  });
});
