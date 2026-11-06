"""Rasterise the Calibrate mark from public/icons/icon.svg into the opaque PNGs.

No image library on this machine, so the three primitives in that file -- a
full-width bar, a circle and a triangle -- are sampled directly. 4x4
supersampling per pixel gives the edges their antialiasing; the mark is white
on a black tile, which is the convention the previous rasters used and which
PNG needs because it cannot switch on prefers-color-scheme the way the SVG
favicon does.
"""
import struct, zlib, sys, pathlib

# Geometry, in the 64x64 user space of public/icons/icon.svg.
BAR = (0.0, 37.0, 64.0, 47.0)          # x0, y0, x1, y1
CIRCLE = (32.0, 24.0, 13.0)            # cx, cy, r
TRI = ((32.0, 47.0), (38.9282, 59.0), (25.0718, 59.0))
BOX = 64.0

def inside(x, y):
    if BAR[0] <= x <= BAR[2] and BAR[1] <= y <= BAR[3]:
        return True
    dx, dy = x - CIRCLE[0], y - CIRCLE[1]
    if dx * dx + dy * dy <= CIRCLE[2] * CIRCLE[2]:
        return True
    (ax, ay), (bx, by), (cx, cy) = TRI
    d1 = (x - bx) * (ay - by) - (ax - bx) * (y - by)
    d2 = (x - cx) * (by - cy) - (bx - cx) * (y - cy)
    d3 = (x - ax) * (cy - ay) - (cx - ax) * (y - ay)
    neg = (d1 < 0) or (d2 < 0) or (d3 < 0)
    pos = (d1 > 0) or (d2 > 0) or (d3 > 0)
    return not (neg and pos)

def render(size, mark_fraction=1.0, samples=4):
    """`mark_fraction` shrinks the 64-box inside the canvas, for the maskable
    icon Android crops to a circle."""
    span = size * mark_fraction
    offset = (size - span) / 2.0
    scale = BOX / span
    step = 1.0 / samples
    half = step / 2.0
    rows = []
    for py in range(size):
        row = bytearray()
        for px in range(size):
            hit = 0
            for sy in range(samples):
                uy = (py + half + sy * step - offset) * scale
                for sx in range(samples):
                    ux = (px + half + sx * step - offset) * scale
                    if inside(ux, uy):
                        hit += 1
            v = round(255 * hit / (samples * samples))
            row += bytes((v, v, v))
        rows.append(bytes(row))
    return rows

def write_png(path, size, rows):
    raw = b"".join(b"\x00" + r for r in rows)
    def chunk(tag, data):
        return (struct.pack(">I", len(data)) + tag + data
                + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF))
    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0))
           + chunk(b"IDAT", zlib.compress(raw, 9))
           + chunk(b"IEND", b""))
    p = pathlib.Path(path)
    p.write_bytes(png)
    print(f"{path}  {size}x{size}  {len(png)} bytes")

if __name__ == "__main__":
    root = pathlib.Path(sys.argv[1])
    for name, size in [("public/icons/icon-64.png", 64),
                       ("public/icons/icon-96.png", 96),
                       ("public/icons/icon-192.png", 192),
                       ("public/icons/icon-512.png", 512),
                       ("app/apple-icon.png", 180)]:
        write_png(root / name, size, render(size))
    # 0.625 matches what the previous maskable icon used: the 64-box scaled to
    # 320px inside 512, which clears Android's 80%-diameter safe zone.
    write_png(root / "public/icons/icon-maskable-512.png", 512, render(512, 0.625))
