// Track intervals actually played. Seeking does not count as listening.
export class ListeningCoverage {
  constructor() { this.ranges = []; this.cursor = null; }
  interrupt() { this.cursor = null; }
  sample(position, now, rate = 1) {
    if (!Number.isFinite(position) || !Number.isFinite(now)) return;
    const previous = this.cursor;
    this.cursor = {position, now};
    if (!previous) return;
    const delta = position - previous.position;
    const elapsed = Math.max(0, (now - previous.now) / 1000);
    if (delta <= 0 || delta > elapsed * rate + 0.15) return;
    const next = [...this.ranges, [previous.position, position]].sort((a,b) => a[0]-b[0]);
    this.ranges = [];
    for (const range of next) {
      const last = this.ranges.at(-1);
      if (last && range[0] <= last[1] + 0.04) last[1] = Math.max(last[1], range[1]);
      else this.ranges.push([...range]);
    }
  }
  complete(duration) {
    if (!Number.isFinite(duration) || duration <= 0 || !this.ranges.length) return false;
    const covered = this.ranges.reduce((sum,[start,end]) => sum + Math.max(0, Math.min(end,duration)-start), 0);
    return this.ranges[0][0] <= 0.35 && this.ranges.at(-1)[1] >= duration - 0.35 && covered >= duration - 0.65;
  }
}

export const KAMENKA_NOTE = [
  'Перед вами одна из самых древних форм печи — каменка, сложенная из крупных камней без связующего раствора.',
  'От открытого костра её отличают стенки и способность камня хранить тепло после того, как пламя погасло.',
  'В древних каменках нижнюю часть складывали из более крупных и плоских камней, а выше помещали камни меньшего размера: основание должно было быть устойчивым, а жар — удерживаться внутри.',
  'Между случайным использованием огня, возникшего после молнии или пожара, и постоянным домашним очагом прошли сотни тысяч лет.',
  'Каждый новый навык начинался с одного и того же наблюдения: пламя опасно, но его тепло можно направить — в камень, в воду, в пищу, в свет лампы.'
];

// The atmosphere is already mixed into each recording; no autoplay.
export function createExhibitAudio(recordings) {
  const panel = document.createElement('div');
  panel.className = 'audio-preview';
  const media = document.createElement('audio');
  media.id = 'exhibit-audio';
  media.preload = 'none';
  media.setAttribute('aria-label', 'Аудиогид');
  const button = document.createElement('button');
  button.id = 'audio-guide-toggle';
  button.type = 'button';
  button.className = 'button secondary audio-preview-button';
  button.setAttribute('aria-describedby', 'audio-preview-status');
  button.setAttribute('aria-controls', 'exhibit-audio audio-track-controls');
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  icon.append(path);
  const label = document.createElement('span');
  button.append(icon, label);
  const status = document.createElement('p');
  status.id = 'audio-preview-status';
  status.setAttribute('role', 'status');

  const controls = document.createElement('div');
  controls.id = 'audio-track-controls';
  controls.className = 'audio-track-controls';
  controls.hidden = true;
  const seek = document.createElement('input');
  seek.type = 'range';
  seek.id = 'audio-guide-seek';
  seek.className = 'audio-track-seek';
  seek.min = '0'; seek.max = '0'; seek.step = '0.1'; seek.value = '0';
  seek.disabled = true;
  seek.setAttribute('aria-label', 'Позиция аудиозаписи');
  const clock = document.createElement('span');
  clock.className = 'audio-track-clock';
  controls.append(seek, clock);
  panel.append(button, controls, status, media);
  document.getElementById('experience').append(panel);

  const archive = document.createElement('section');
  archive.id = 'archive-intro'; archive.className = 'archive-intro'; archive.hidden = true;
  archive.setAttribute('aria-labelledby', 'archive-title');
  archive.innerHTML = '<p class="archive-index">0.0 / ВХОД В АРХИВ</p><div class="archive-emblem" aria-hidden="true"><span>✧</span><i></i><b>0.0</b></div><h1 id="archive-title">Архив огня</h1><p class="archive-caption">Начните с записи. Затем откройте разделы экспозиции.</p>';
  document.getElementById('experience').prepend(archive);
  const next = document.createElement('button'); next.type = 'button';
  next.className = 'button secondary archive-next'; next.textContent = 'Перейти к каменке →'; next.hidden = true;
  document.getElementById('experience').append(next);
  next.addEventListener('click', () => {
    const select = document.getElementById('zone-select'); select.value = 'kamenka';
    select.dispatchEvent(new Event('change', {bubbles:true}));
  });

  const noteButton = document.createElement('button');
  noteButton.type = 'button'; noteButton.id = 'audio-note-open';
  noteButton.className = 'button secondary audio-note-open'; noteButton.textContent = 'Открыть заметку';
  noteButton.setAttribute('aria-controls', 'audio-note-dialog'); noteButton.setAttribute('aria-haspopup','dialog');
  noteButton.setAttribute('aria-expanded','false'); noteButton.setAttribute('aria-describedby','audio-note-hint');
  const noteHint = document.createElement('p'); noteHint.id='audio-note-hint'; noteHint.setAttribute('role','status');
  panel.append(noteButton,noteHint);
  const note = document.createElement('dialog'); note.id = 'audio-note-dialog'; note.className = 'audio-note-dialog';
  note.setAttribute('aria-labelledby','audio-note-title');
  const head = document.createElement('div'); head.className='zone-menu-head';
  const title = document.createElement('h2'); title.id='audio-note-title'; title.textContent='Заметка · Каменка';
  const close = document.createElement('button'); close.type='button'; close.className='icon-button';
  close.textContent='×'; close.setAttribute('aria-label','Закрыть заметку'); head.append(title,close);
  const text = document.createElement('div'); text.className='audio-note-text';
  for (const paragraph of KAMENKA_NOTE) { const p=document.createElement('p'); p.textContent=paragraph; text.append(p); }
  note.append(head,text); document.body.append(note);
  close.addEventListener('click',()=>note.close());
  note.addEventListener('close',()=>{noteButton.setAttribute('aria-expanded','false');if(!noteButton.hidden)noteButton.focus({preventScroll:true});});
  note.addEventListener('click',e=>{if(e.target===note){const r=note.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)note.close();}});

  let activeZone = '', started = false, waiting = false, failed = false, serial = 0;
  const coverage = new ListeningCoverage();
  const completionKey = 'pech-audio-complete:kamenka-v2';
  let unlocked = false;
  try { unlocked = localStorage.getItem(completionKey) === '1'; } catch {}
  function renderNote() {
    noteButton.hidden = noteHint.hidden = activeZone !== 'kamenka';
    noteButton.disabled = !unlocked;
    noteHint.textContent = unlocked ? 'Заметка доступна' : 'Заметка откроется после полного прослушивания';
  }
  noteButton.addEventListener('click',()=>{if(!unlocked)return;note.showModal();noteButton.setAttribute('aria-expanded','true');});
  const available = () => Boolean(recordings[activeZone]);
  const recordListening = () => {
    if (activeZone === 'kamenka' && started && !failed && !media.seeking) coverage.sample(media.currentTime,performance.now(),media.playbackRate);
  };
  const format = seconds => {
    if (!Number.isFinite(seconds)) return '—:—';
    const s = Math.max(0, Math.floor(seconds));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  };
  function updateTime() {
    const duration = media.duration;
    seek.disabled = !Number.isFinite(duration) || duration <= 0;
    seek.max = Number.isFinite(duration) ? String(duration) : '0';
    seek.value = String(media.currentTime || 0);
    seek.setAttribute('aria-valuetext', format(media.currentTime) + ' из ' + format(duration));
    clock.textContent = format(media.currentTime) + ' / ' + format(duration);
  }
  function render() {
    const enabled = available();
    button.setAttribute('aria-disabled', String(!enabled));
    const playing = enabled && started && !media.paused && !media.ended;
    path.setAttribute('d', playing ? 'M8 5v14M16 5v14' : 'm9 5 11 7-11 7V5Z');
    label.textContent = !enabled || !started ? 'Прослушать фрагмент записи'
      : failed ? 'Повторить загрузку записи'
      : media.ended ? 'Прослушать ещё раз'
      : playing ? 'Пауза' : 'Продолжить прослушивание';
    status.textContent = !enabled ? 'Аудиофрагмент готовится'
      : failed ? 'Не удалось загрузить запись. Нажмите, чтобы попробовать ещё раз.'
      : waiting && playing ? 'Загрузка записи…'
      : media.ended ? 'Запись завершена'
      : playing ? 'Воспроизведение записи'
      : started ? 'На паузе' : 'Голоса и фоновая атмосфера';
    controls.hidden = !enabled || !started;
    renderNote();
    updateTime();
  }
  function release() {
    serial++;
    media.pause();
    coverage.interrupt();
    media.removeAttribute('src');
    media.load();
    started = false; waiting = false; failed = false;
  }
  button.addEventListener('click', () => {
    if (!available()) return;
    if (!media.paused && !media.ended && !failed) {
      serial++; media.pause(); waiting = false; render(); return;
    }
    if (failed) release();
    if (!media.getAttribute('src')) media.src = recordings[activeZone];
    if (media.ended) media.currentTime = 0;
    const request = ++serial;
    started = true; waiting = true; failed = false;
    // Call play within the visitor's click, before awaiting network or metadata.
    const result = media.play();
    render();
    result?.then(() => {
      if (request !== serial || !available()) return;
      waiting = false; render();
    }).catch(error => {
      if (request !== serial || !available() || error.name === 'AbortError') return;
      waiting = false; failed = true; render();
    });
  });
  seek.addEventListener('input', () => {
    coverage.interrupt();
    if (Number.isFinite(media.duration)) media.currentTime = Math.min(media.duration, Number(seek.value));
    updateTime();
  });
  media.addEventListener('seeking',()=>coverage.interrupt());
  media.addEventListener('seeked',()=>{coverage.interrupt();if(!media.paused)recordListening();});
  media.addEventListener('timeupdate',()=>{if(!media.paused)recordListening();});
  media.addEventListener('pause',()=>{recordListening();coverage.interrupt();});
  media.addEventListener('ended',()=>{
    recordListening();coverage.interrupt();
    if(activeZone==='kamenka' && !failed && coverage.complete(media.duration)) {
      unlocked=true;try{localStorage.setItem(completionKey,'1');}catch{}
    }
    renderNote();
    if(activeZone==='kamenka' && !unlocked)noteHint.textContent='Для заметки прослушайте запись целиком, включая пропущенные части';
  });
  for (const name of ['loadedmetadata', 'durationchange', 'timeupdate', 'seeked']) media.addEventListener(name, updateTime);
  for (const name of ['play', 'pause', 'ended']) media.addEventListener(name, render);
  media.addEventListener('waiting', () => { waiting = true; render(); });
  media.addEventListener('playing', () => { waiting = false; recordListening(); render(); });
  media.addEventListener('error', () => {
    if (!available() || !media.getAttribute('src')) return;
    waiting = false; failed = true; render();
  });
  window.addEventListener('pagehide', () => { serial++; media.pause(); });
  render();
  return {
    sync(zone) {
      if (zone === activeZone) return;
      release();
      if(note.open)note.close();
      activeZone = zone;
      archive.hidden = next.hidden = zone !== 'archive-fire';
      media.setAttribute('aria-label',zone==='archive-fire'?'Архив огня — вводная запись':'Аудиогид — каменка');
      render();
    },
  };
}
