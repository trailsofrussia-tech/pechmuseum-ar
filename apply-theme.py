"""Apply a small presentation layer without uploading the unchanged model archive."""
from pathlib import Path
import shutil
import sys
import re

site = Path(sys.argv[1])
revision = sys.argv[2]
shutil.copyfile('graphite.css', site / 'graphite.css')
shutil.copyfile('embed-bridge.js', site / 'embed-bridge.js')
for html in site.rglob('index.html'):
    prefix = './' if html.parent == site else '../'
    text = html.read_text()
    text = re.sub(r'<link rel="stylesheet" href="[^"]*graphite\.css[^\"]*">\s*', '', text)
    text = re.sub(r'<script defer src="[^"]*embed-bridge\.js[^\"]*"></script>\s*', '', text)
    text = text.replace('<meta name="theme-color" content="#f4f0e8">', '<meta name="theme-color" content="#1b1d21">')
    text = text.replace('</head>', f'<link rel="stylesheet" href="{prefix}graphite.css?v={revision}">\n<script defer src="{prefix}embed-bridge.js?v={revision}"></script>\n</head>')
    html.write_text(text)
print('Graphite theme and natural iframe height applied to all exhibition pages')
