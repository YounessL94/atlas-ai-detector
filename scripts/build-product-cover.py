from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "products" / "atlas-verification-kit-cover.png"
W, H = 1600, 1200

image = Image.new("RGB", (W, H), "#090B14")
draw = ImageDraw.Draw(image)
bold = r"C:\Windows\Fonts\arialbd.ttf"
regular = r"C:\Windows\Fonts\arial.ttf"

# Subtle depth without stock imagery or unverifiable claims.
for radius, alpha in ((520, 34), (390, 24), (280, 18)):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    ld.ellipse((W - radius, -radius // 2, W + radius, radius * 2), fill=(249, 115, 22, alpha))
    image = Image.alpha_composite(image.convert("RGBA"), layer)
draw = ImageDraw.Draw(image)

orange = "#F97316"
white = "#F8FAFC"
muted = "#B8C1D1"

draw.rounded_rectangle((95, 85, 285, 155), radius=20, fill=orange)
draw.text((125, 99), "ATLAS", font=ImageFont.truetype(bold, 34), fill=white)

draw.text((95, 280), "AI VERIFICATION", font=ImageFont.truetype(bold, 92), fill=white)
draw.text((95, 385), "KIT", font=ImageFont.truetype(bold, 180), fill=orange)
draw.text((102, 605), "Checklists  •  C2PA  •  Report template", font=ImageFont.truetype(regular, 43), fill=muted)
draw.text((102, 680), "French + English pilot edition", font=ImageFont.truetype(regular, 38), fill=white)

# A simple document-and-check mark symbol.
draw.rounded_rectangle((1120, 265, 1465, 725), radius=34, outline=white, width=10)
for y in (385, 485, 585):
    draw.line((1190, y, 1370, y), fill=muted, width=12)
draw.line((1165, 820, 1260, 915), fill=orange, width=30)
draw.line((1260, 915, 1465, 720), fill=orange, width=30)

draw.text((102, 1015), "atlasaidetector.com", font=ImageFont.truetype(bold, 38), fill=white)
draw.text((102, 1070), "A careful workflow. Never an automatic verdict.", font=ImageFont.truetype(regular, 28), fill=muted)

image.convert("RGB").save(OUT, quality=94, optimize=True)
print(OUT)
