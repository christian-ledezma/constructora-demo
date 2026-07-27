"""
Generates on-brand placeholder JPGs for every filename referenced in
src/data/images.ts. Not part of the app runtime - a one-off dev tool.
Replace the files this produces with real photography at any time.
"""

from PIL import Image, ImageDraw, ImageFont
import os
import math

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT_DIR, exist_ok=True)

CHARCOAL = (61, 63, 71)
CHARCOAL_DEEP = (36, 37, 43)
STONE = (171, 152, 115)
STONE_LIGHT = (230, 222, 208)
PAPER = (245, 244, 241)
WHITE = (255, 255, 255)

FONT_DISPLAY = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_BODY = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def diagonal_gradient(size, c1, c2):
    w, h = size
    img = Image.new("RGB", size, c1)
    px = img.load()
    max_d = w + h
    for y in range(h):
        for x0 in range(0, w, 4):
            t = (x0 + y) / max_d
            color = lerp(c1, c2, t)
            for dx in range(4):
                x = x0 + dx
                if x < w:
                    px[x, y] = color
    return img


def add_grain(img, amount=6):
    import random

    px = img.load()
    w, h = img.size
    for _ in range(int(w * h * 0.02)):
        x = random.randint(0, w - 1)
        y = random.randint(0, h - 1)
        r, g, b = px[x, y]
        n = random.randint(-amount, amount)
        px[x, y] = (
            max(0, min(255, r + n)),
            max(0, min(255, g + n)),
            max(0, min(255, b + n)),
        )
    return img


def draw_mark(draw, cx, cy, r, color, width=3):
    # A quarter-arc, echoing the Bernales wordmark signature
    bbox = [cx - r, cy - r, cx + r, cy + r]
    draw.arc(bbox, start=180, end=270, fill=color, width=width)


def make_placeholder(filename, size, title, subtitle, tone="light"):
    w, h = size
    if tone == "dark":
        img = diagonal_gradient(size, CHARCOAL_DEEP, CHARCOAL)
        text_color = WHITE
        sub_color = STONE_LIGHT
        mark_color = STONE
    else:
        img = diagonal_gradient(size, STONE_LIGHT, PAPER)
        text_color = CHARCOAL_DEEP
        sub_color = STONE
        mark_color = CHARCOAL

    img = add_grain(img, amount=5)
    draw = ImageDraw.Draw(img)

    title_size = max(28, w // 18)
    sub_size = max(16, w // 46)
    title_font = ImageFont.truetype(FONT_DISPLAY, title_size)
    sub_font = ImageFont.truetype(FONT_BODY, sub_size)

    draw_mark(draw, w * 0.5, h * 0.5 - title_size * 1.6, r=title_size * 1.4, color=mark_color, width=max(2, w // 500))

    tb = draw.textbbox((0, 0), title, font=title_font)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    draw.text(((w - tw) / 2, h / 2 - th / 2), title, font=title_font, fill=text_color)

    sb = draw.textbbox((0, 0), subtitle, font=sub_font)
    sw, sh = sb[2] - sb[0], sb[3] - sb[1]
    draw.text(
        ((w - sw) / 2, h / 2 + th / 2 + sub_size * 0.9),
        subtitle,
        font=sub_font,
        fill=sub_color,
    )

    path = os.path.join(OUT_DIR, filename)
    img.save(path, "JPEG", quality=82)
    print("wrote", path, size)


STANDARD_SIZE = (1600, 1067)
PANO_SIZE = (2048, 1024)
HERO_SIZE = (1920, 1080)

make_placeholder("hero.jpg", HERO_SIZE, "BERNALES", "constructora — imagen de portada", tone="dark")

for slug, label in [("begonias", "Begonias de Aranjuez"), ("prados", "Prados del Oeste")]:
    for i in range(1, 6):
        make_placeholder(
            f"{slug}-{i}.jpg",
            STANDARD_SIZE,
            label.upper(),
            f"fotografía {i} de 5 — reemplazar",
            tone="light" if i % 2 == 0 else "dark",
        )
    for i in range(1, 3):
        make_placeholder(
            f"{slug}-360-{i}.jpg",
            PANO_SIZE,
            label.upper(),
            f"panorámica 360° {i} de 2 — reemplazar",
            tone="dark",
        )

print("done")
