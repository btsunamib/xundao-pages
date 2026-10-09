from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import re
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'artifacts'
OUT.mkdir(exist_ok=True)
html = (ROOT / 'index.html').read_text(encoding='utf-8')
html = html.replace('<link rel="stylesheet" href="./styles.css">', '<style>\n' + (ROOT / 'styles.css').read_text(encoding='utf-8') + '\n</style>')
for filename in ('art.js', 'engine.js', 'app.js'):
    html = html.replace(f'  <script defer src="./{filename}"></script>\n', '')
html = re.sub(r'  <link rel="manifest"[^>]*>\n', '', html)
html = html.replace('./favicon.svg', 'data:image/svg+xml,' + quote((ROOT / 'favicon.svg').read_text(encoding='utf-8'), safe=''))
html = re.sub(r'  <script>if \(\x27serviceWorker\x27.*?</script>\n', '', html)
scripts = '\n'.join('<script>\n' + (ROOT / name).read_text(encoding='utf-8') + '\n</script>' for name in ('art.js', 'engine.js', 'app.js'))
html = html.replace('</body>', scripts + '\n</body>')
single = OUT / 'xundao-single.html'
single.write_text(html, encoding='utf-8')
zip_path = OUT / 'xundao-pages-source.zip'
with ZipFile(zip_path, 'w', ZIP_DEFLATED) as archive:
    for path in sorted(ROOT.rglob('*')):
        if path.is_file() and not any(part in {'artifacts', '.git', 'node_modules', '__pycache__'} for part in path.relative_to(ROOT).parts):
            archive.write(path, 'xundao-pages/' + str(path.relative_to(ROOT)))
print(single)
print(zip_path)
