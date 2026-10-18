from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = ROOT / "products"

pdfmetrics.registerFont(TTFont("Atlas", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("AtlasBold", r"C:\Windows\Fonts\arialbd.ttf"))

ORANGE = colors.HexColor("#F97316")
INK = colors.HexColor("#17111B")
MUTED = colors.HexColor("#665E67")
PALE = colors.HexColor("#FFF4E9")


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("Title", parent=base["Title"], fontName="AtlasBold", fontSize=25, leading=29, textColor=INK, alignment=TA_CENTER, spaceAfter=8 * mm),
        "subtitle": ParagraphStyle("Subtitle", parent=base["Normal"], fontName="Atlas", fontSize=11, leading=16, textColor=MUTED, alignment=TA_CENTER, spaceAfter=10 * mm),
        "h2": ParagraphStyle("H2", parent=base["Heading2"], fontName="AtlasBold", fontSize=16, leading=20, textColor=ORANGE, spaceBefore=7 * mm, spaceAfter=3 * mm, keepWithNext=True),
        "body": ParagraphStyle("Body", parent=base["BodyText"], fontName="Atlas", fontSize=10.2, leading=15, textColor=INK, spaceAfter=3 * mm),
        "bullet": ParagraphStyle("Bullet", parent=base["BodyText"], fontName="Atlas", fontSize=9.7, leading=14, textColor=INK, leftIndent=4 * mm),
        "field": ParagraphStyle("Field", parent=base["BodyText"], fontName="Atlas", fontSize=9.3, leading=14, textColor=INK, borderColor=colors.HexColor("#E3D7D0"), borderWidth=.5, borderPadding=4, backColor=colors.white, spaceAfter=2 * mm),
        "note": ParagraphStyle("Note", parent=base["BodyText"], fontName="Atlas", fontSize=9.5, leading=14, textColor=INK, leftIndent=5 * mm, rightIndent=5 * mm, borderColor=ORANGE, borderWidth=1, borderPadding=8, backColor=PALE, spaceBefore=3 * mm, spaceAfter=4 * mm),
        "footer": ParagraphStyle("Footer", parent=base["Normal"], fontName="Atlas", fontSize=7.5, textColor=MUTED, alignment=TA_CENTER),
    }


def page_decor(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(INK)
    canvas.rect(0, height - 13 * mm, width, 13 * mm, fill=1, stroke=0)
    canvas.setFillColor(ORANGE)
    canvas.rect(0, height - 14 * mm, width, 1 * mm, fill=1, stroke=0)
    canvas.setFont("AtlasBold", 8)
    canvas.setFillColor(colors.white)
    canvas.drawString(18 * mm, height - 8.5 * mm, "ATLAS AI DETECTOR")
    canvas.setFont("Atlas", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(width / 2, 9 * mm, f"atlasaidetector.com  •  {doc.page}")
    canvas.restoreState()


def parse_markdown(path, language):
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    st = styles()
    story = [Spacer(1, 18 * mm)]
    bullets = []

    def flush_bullets():
        nonlocal bullets
        if bullets:
            story.append(ListFlowable([ListItem(Paragraph(escape(item), st["bullet"])) for item in bullets], bulletType="bullet", start="circle", leftIndent=8 * mm, bulletColor=ORANGE, spaceAfter=3 * mm))
            bullets = []

    for line in lines:
        line = line.rstrip()
        if not line:
            flush_bullets()
            continue
        if line.startswith("# "):
            flush_bullets()
            story.append(Paragraph(escape(line[2:]), st["title"]))
        elif line.startswith("## "):
            flush_bullets()
            # Keep the modality checklists readable: section 3 otherwise lands
            # alone at the bottom of the first page in both language editions.
            if line.startswith("## 3. "):
                story.append(PageBreak())
            story.append(Paragraph(escape(line[3:]), st["h2"]))
        elif line.startswith("- "):
            bullets.append(line[2:])
        elif line.startswith("|"):
            flush_bullets()
            if set(line.replace("|", "").replace("-", "").replace(" ", "")):
                story.append(Paragraph(escape(line.strip("|").replace("|", "  •  ")), st["field"]))
        elif line.startswith("**"):
            flush_bullets()
            safe = escape(line).replace("**", "<b>", 1).replace("**", "</b>", 1)
            story.append(Paragraph(safe, st["field"]))
        elif line.startswith(tuple(f"{n}. " for n in range(1, 10))):
            flush_bullets()
            story.append(Paragraph(escape(line), st["body"]))
        elif "ne certifie" in line.lower() or "never certifies" in line.lower() or "suggested wording" in line.lower() or "formulation recommandée" in line.lower():
            flush_bullets()
            story.append(Paragraph(escape(line), st["note"]))
        else:
            flush_bullets()
            style = st["subtitle"] if len(story) <= 3 else st["body"]
            story.append(Paragraph(escape(line), style))
    flush_bullets()
    return story


def build(source_name, output_name, language):
    output = PRODUCTS / output_name
    doc = SimpleDocTemplate(str(output), pagesize=A4, rightMargin=18 * mm, leftMargin=18 * mm, topMargin=20 * mm, bottomMargin=16 * mm, title="Atlas AI Detector Verification Kit", author="Atlas AI Detector", subject="Practical AI-content verification workflow")
    doc.build(parse_markdown(PRODUCTS / source_name, language), onFirstPage=page_decor, onLaterPages=page_decor)
    return output


if __name__ == "__main__":
    for pdf in (
        build("atlas-verification-kit-fr.md", "atlas-verification-kit-fr.pdf", "fr"),
        build("atlas-verification-kit-en.md", "atlas-verification-kit-en.pdf", "en"),
    ):
        print(pdf)
