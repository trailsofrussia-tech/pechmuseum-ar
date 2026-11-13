// One user-initiated recording for Kamenka. The ambience is mixed into the file.
export function createExhibitAudio(sourceURL) {
  const panel = document.createElement('div');
  panel.className = 'audio-preview';
  const media = document.createElement('audio');
  media.id = 'exhibit-audio';
  media.preload = 'none';
  media.setAttribute('aria-label', 'Архив огня — каменка');
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

  let activeZone = '', started = false, waiting = false, failed = false, serial = 0;
  const available = () => activeZone === 'kamenka';
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
    updateTime();
  }
  function release() {
    serial++;
    media.pause();
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
    if (!media.getAttribute('src')) media.src = sourceURL;
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
    if (Number.isFinite(media.duration)) media.currentTime = Math.min(media.duration, Number(seek.value));
    updateTime();
  });
  for (const name of ['loadedmetadata', 'durationchange', 'timeupdate', 'seeked']) media.addEventListener(name, updateTime);
  for (const name of ['play', 'pause', 'ended']) media.addEventListener(name, render);
  media.addEventListener('waiting', () => { waiting = true; render(); });
  media.addEventListener('playing', () => { waiting = false; render(); });
  media.addEventListener('error', () => {
    if (!available() || !media.getAttribute('src')) return;
    waiting = false; failed = true; render();
  });
  window.addEventListener('pagehide', () => { serial++; media.pause(); });
  render();
  return {
    sync(zone) {
      if (zone === activeZone) return;
      activeZone = zone;
      release();
      render();
    },
  };
}
