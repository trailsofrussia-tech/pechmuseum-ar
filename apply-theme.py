"""Apply a small presentation layer without uploading the unchanged model archive."""
from pathlib import Path
import shutil
import sys
import re

site = Path(sys.argv[1])
revision = sys.argv[2]
shutil.copyfile('graphite.css', site / 'graphite.css')
shutil.copyfile('embed-bridge.js', site / 'embed-bridge.js')
for name in ('app.js', 'burzhuyka-collection.js'):
    if Path(name).exists():
        shutil.copyfile(name, site / name)
for zone in ('burzhuyka', 'ugol-pechnika'):
    collection = site / 'assets' / f'{zone}-collection'
    collection.mkdir(parents=True, exist_ok=True)
    for model in Path('.').glob(f'{zone}-*-v1.glb'):
        shutil.copyfile(model, collection / model.name)
app = site / 'app.js'
code = app.read_text()
code = re.sub(r"(from './burzhuyka-collection\.js)(?:\?[^']*)?(')", rf'\1?v={revision}\2', code)
code = code.replace("$('viewer-badge').textContent=s.badge;", "$('viewer-badge').textContent=id==='kamenka'?'Жилище пещерного человека':zone.title;")
app.write_text(code)
for html in site.rglob('index.html'):
    prefix = './' if html.parent == site else '../'
    text = html.read_text()
    text = text.replace('class="story" aria-labelledby="scene-title"', 'class="story"')
    text = re.sub(r'(<section class="story"[^>]*>.*?</section>)(\s*)(<section class="viewer-panel"[^>]*>.*?</section>)', r'\3\2\1', text, flags=re.S)
    text = re.sub(r'(<script type="module" src="[^"]*app\.js)(?:\?[^"]*)?("></script>)', rf'\1?v={revision}\2', text)
    text = re.sub(r'<link rel="stylesheet" href="[^"]*graphite\.css[^\"]*">\s*', '', text)
    text = re.sub(r'<script defer src="[^"]*embed-bridge\.js[^\"]*"></script>\s*', '', text)
    text = text.replace('<meta name="theme-color" content="#f4f0e8">', '<meta name="theme-color" content="#1b1d21">')
    text = text.replace('</head>', f'<link rel="stylesheet" href="{prefix}graphite.css?v={revision}">\n<script defer src="{prefix}embed-bridge.js?v={revision}"></script>\n</head>')
    html.write_text(text)
print('Graphite theme and natural iframe height applied to all exhibition pages')
