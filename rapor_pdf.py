"""
rapor_pdf.py — ARASTIRMA_RAPORU_v2.md → ARASTIRMA_RAPORU_v2.pdf
Markdown → HTML (python-markdown) → PDF (WeasyPrint). LaTeX gerekmez.
Bağımlılıklar: pip install markdown weasyprint   (macOS'ta conda-forge önerilir)
    python rapor_pdf.py [girdi.md] [cikti.pdf]
"""
from __future__ import annotations
import os, re, sys
import markdown
from weasyprint import HTML, CSS

KOK = os.path.dirname(os.path.abspath(__file__))

CSS_METIN = """
@page { size: A4; margin: 2.2cm 2.0cm 2.2cm 2.0cm;
  @top-left { content: "Göz Beneklerinde Kaynaşma Geometrisi — TÜBİTAK 2204-A Rapor Taslağı v3";
              font-family: "Helvetica Neue", Arial, sans-serif; font-size: 8pt; color: #5C6B7A; }
  @bottom-center { content: counter(page); font-family: "Helvetica Neue", Arial, sans-serif; font-size: 9pt; color: #1F3A5F; } }
@page :first { @top-left { content: none; } }
html { font-family: "STIX Two Text", "Times New Roman", "Arial Unicode MS", serif; font-size: 10.5pt; line-height: 1.38; color: #1a1a1a; }
h1 { font-family: "Helvetica Neue", Arial, sans-serif; color: #1F3A5F; font-size: 19pt; line-height: 1.25; margin: 0 0 6pt 0; }
h2 { font-family: "Helvetica Neue", Arial, sans-serif; color: #1F3A5F; font-size: 13.5pt; margin: 16pt 0 5pt 0; padding-bottom: 2pt; border-bottom: 0.6pt solid #1F3A5F; page-break-after: avoid; }
h3 { font-family: "Helvetica Neue", Arial, sans-serif; color: #7A4A1D; font-size: 11pt; margin: 11pt 0 3pt 0; page-break-after: avoid; }
p { margin: 0 0 5pt 0; text-align: justify; hyphens: auto; }
p.kapak { text-align: center; font-size: 9.5pt; color: #333; margin: 0 0 2pt 0; }
h1.kapak { text-align: center; }
blockquote { background: #F3E7D3; border: 0.8pt solid #7A4A1D; border-radius: 3pt; padding: 5pt 9pt; margin: 6pt 0 8pt 0; font-size: 9.3pt; }
blockquote p { margin: 0; text-align: left; }
ul, ol { margin: 2pt 0 6pt 0; padding-left: 1.5em; }
li { margin-bottom: 2pt; }
table { border-collapse: collapse; width: 100%; font-size: 8.6pt; margin: 6pt 0 8pt 0; page-break-inside: avoid; }
table.genis { font-size: 7.6pt; }
th { background: #EEF2F7; color: #1F3A5F; font-family: "Helvetica Neue", Arial, sans-serif; font-weight: 600; text-align: left;
     border-top: 1pt solid #1F3A5F; border-bottom: 0.6pt solid #1F3A5F; padding: 3pt 4pt; vertical-align: bottom; }
td { border-bottom: 0.3pt solid #c9c9c9; padding: 3pt 4pt; vertical-align: top; }
img { width: 100%; margin: 6pt 0 2pt 0; page-break-inside: avoid; }
p.sekil { font-size: 8.8pt; font-style: italic; color: #333; text-align: left; margin: 0 0 10pt 0; }
code { font-family: Menlo, "Courier New", monospace; font-size: 8.6pt; background: #f4f4f4; padding: 0 2pt; }
hr { border: 0; border-top: 0.4pt solid #bbb; margin: 10pt 0; }
a { color: #1F3A5F; text-decoration: none; }
p.denklem { text-align: center; font-size: 11pt; margin: 4pt 0 6pt 0; }
"""

def on_isle(md: str) -> str:
    """python-markdown için: listeden önce boş satır, kapak satırlarını ayrı paragraf yap."""
    satirlar = md.splitlines(); out = []
    kapak = False
    for i, s in enumerate(satirlar):
        liste = re.match(r"^\s*(- |\d+\. )", s) is not None
        onceki = out[-1] if out else ""
        if liste and onceki.strip() and re.match(r"^\s*(- |\d+\. )", onceki) is None and not onceki.startswith("  "):
            out.append("")
        if s.startswith("# "):
            kapak = True
        elif kapak and s.startswith((">", "---", "## ")):
            kapak = False
        elif kapak and s.strip() and onceki.strip():
            out.append("")
        out.append(s)
    return "\n".join(out)

def md2html(md: str) -> str:
    md = on_isle(md)
    # Ortalanmış denklem satırı ("  r_i = λ · ln(S / θ_i).") girintili kod bloğu olmasın
    def denk(m):
        t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", m.group(1))
        return "<p class='denklem'>" + t + "</p>"
    md = re.sub(r"^ {2}(?=\S)(?!- |\d+\. )(.*)$", denk, md, flags=re.M)
    html = markdown.markdown(md, extensions=["tables", "sane_lists"], output_format="html5")
    # Kapak: ilk h1 ve ardından gelen ilk blockquote'a kadar olan <p>'ler
    html = html.replace("<h1>", "<h1 class='kapak'>", 1)
    bas, _, kalan = html.partition("<blockquote>")
    bas = bas.replace("<p>", "<p class='kapak'>")
    html = bas + "<blockquote>" + kalan if kalan else bas
    # Şekil altyazıları
    html = re.sub(r"<p><em>(Şekil \d+\..*?)</em></p>", r"<p class='sekil'>\1</p>", html, flags=re.S)
    # Geniş tablolar (≥ 7 sütun) küçük punto
    def genis(m):
        t = m.group(0)
        n = t.split("</tr>")[0].count("<th")
        return t.replace("<table>", "<table class='genis'>", 1) if n >= 7 else t
    html = re.sub(r"<table>.*?</table>", genis, html, flags=re.S)
    return html

def derle(md_yol: str, pdf_yol: str):
    md = open(md_yol, encoding="utf-8").read()
    html = "<!DOCTYPE html><html lang='tr'><head><meta charset='utf-8'></head><body>" + md2html(md) + "</body></html>"
    HTML(string=html, base_url=os.path.dirname(os.path.abspath(md_yol))).write_pdf(pdf_yol, stylesheets=[CSS(string=CSS_METIN)])
    print("yazıldı:", pdf_yol)

if __name__ == "__main__":
    md_yol = sys.argv[1] if len(sys.argv) > 1 else os.path.join(KOK, "ARASTIRMA_RAPORU_v2.md")
    pdf_yol = sys.argv[2] if len(sys.argv) > 2 else os.path.join(KOK, "ARASTIRMA_RAPORU_v2.pdf")
    derle(md_yol, pdf_yol)
