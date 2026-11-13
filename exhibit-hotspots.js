// Anchors were picked on the supplied GLBs with positionAndNormalFromPoint.
// Sources explain the general process; they do not authenticate these AI models.
const SOURCES = {
  damper: ['МЧС России · дымовые заслонки', 'https://69.mchs.gov.ru/deyatelnost/press-centr/novosti/5647588'],
  mold: ['Энциклопедия Брокгауза и Ефрона · кирпичное производство', 'https://www.booksite.ru/fulltext/1/001/007/051/51405.htm'],
  stamp: ['Музейная публикация · кирпич с клеймом', 'https://ar.culture.ru/ru/subject/kirpich-s-kleymom'],
};

const EXHIBITS = {
  damper: [
    {
      title: 'Ручка задвижки',
      position: '-0.155469m -0.007275m -0.658335m', normal: '-0.271379 0.920808 -0.280118',
      body: 'За выступающий конец выдвигают и задвигают пластину. Она скользит вдоль рамки и меняет величину прохода для дыма.',
    },
    {
      title: 'Подвижная пластина',
      position: '0.042039m 0.008198m -0.010337m', normal: '0.000018 0.999687 -0.025021',
      body: 'Когда пластину выдвигают, проход открывается; когда задвигают — уменьшается. Пока дрова горят или угли тлеют, закрывать дымовой канал опасно: угарный газ может попасть в помещение.',
      source: SOURCES.damper,
    },
    {
      title: 'Неподвижная рамка',
      position: '0.326818m 0.024501m 0.790796m', normal: '0.999941 -0.010063 0.004047',
      body: 'Рамку устанавливают в дымовом канале. Её направляющие удерживают подвижную пластину. Открытое окно в рамке показывает, какая часть прохода сейчас свободна.',
    },
  ],
  'wooden-mold': [
    {
      title: 'Полость формы',
      position: '-0.181531m -0.046589m -0.331287m', normal: '-0.017835 0.008413 0.999806',
      body: 'В деревянную форму набивают подготовленную глину, уплотняя её в углах. Так мягкая масса получает очертания заготовки. Здесь показана простая коробка, без резного узора.',
      source: SOURCES.mold,
    },
    {
      title: 'Борта формы',
      position: '-0.696721m -0.173739m -0.330572m', normal: '0.005996 -0.016336 0.999849',
      body: 'Борта ограничивают глину по сторонам. Излишек массы снимают, затем заготовку извлекают. Кирпич-сырец сначала сушат и только после этого обжигают: деревянную форму в огонь не помещают.',
      source: SOURCES.mold,
    },
  ],
  'metal-stamp': [
    {
      title: 'Рельеф и оттиск',
      position: '-0.011271m 0.057745m 0.009056m', normal: '0.183322 -0.014933 0.982939',
      body: 'Рабочую поверхность прижимают к ещё пластичной глине. Выступающие знаки оставляют углублённый оттиск. Рисунок на заготовке получается зеркальным относительно штампа; клеймо наносят до обжига.',
      source: SOURCES.stamp,
    },
    {
      title: 'Зачем нужно клеймо',
      position: '0.086678m 0.037028m 0.010588m', normal: '0.089682 -0.007561 0.995942',
      body: 'На историческом кирпиче клеймо могло обозначать завод или владельца производства. Оно помогает исследователям установить происхождение изделия. Принадлежность знаков на этой модели конкретному заводу не установлена.',
      source: SOURCES.stamp,
    },
  ],
};

export function createExhibitHotspots(viewer) {
  const section = document.createElement('section');
  section.className = 'exhibit-notes';
  section.hidden = true;
  section.setAttribute('aria-label', 'Как работает экспонат');
  const hint = document.createElement('p');
  hint.className = 'exhibit-notes-hint';
  hint.textContent = 'Нажмите на точку на модели или выберите деталь';
  const choices = document.createElement('div');
  choices.className = 'exhibit-note-choices';
  choices.setAttribute('role', 'group');
  choices.setAttribute('aria-label', 'Детали экспоната');
  const card = document.createElement('div');
  card.id = 'exhibit-note-card';
  card.className = 'exhibit-note-card';
  card.hidden = true;
  card.tabIndex = -1;
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-modal', 'false');
  card.setAttribute('aria-labelledby', 'exhibit-note-title');
  card.setAttribute('aria-describedby', 'exhibit-note-body');
  const content = document.createElement('div');
  content.className = 'exhibit-note-content';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'exhibit-note-close';
  close.setAttribute('aria-label', 'Закрыть пояснение');
  close.textContent = '×';
  card.append(close, content);
  section.append(hint, choices);
  viewer.closest('.viewer-panel').after(section);
  // A body-level overlay escapes the 3D canvas clipping without moving the page.
  document.body.append(card);
  let pins = [], entries = [], selected = -1, returnFocus = null;
  let layoutFrame = 0, embeddedViewport = null;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));

  function dismiss(restoreFocus = false) {
    card.hidden = true;
    cancelAnimationFrame(layoutFrame);
    layoutFrame = 0;
    selected = -1;
    for (const { pin, choice } of entries) {
      pin.setAttribute('aria-expanded', 'false');
      choice.setAttribute('aria-expanded', 'false');
    }
    if (restoreFocus && returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  }

  function positionCard() {
    layoutFrame = 0;
    if (selected === -1 || card.hidden) return;
    const pin = entries[selected]?.pin;
    if (!pin?.isConnected) { dismiss(); return; }
    const panel = viewer.closest('.viewer-panel').getBoundingClientRect();
    const anchor = pin.getBoundingClientRect();
    const left = Math.max(12, panel.left + 12);
    const right = Math.min(innerWidth - 12, panel.right - 12);
    const top = Math.max(12, (embeddedViewport?.start ?? 0) + 12);
    const bottom = Math.min(innerHeight - 12, (embeddedViewport?.end ?? innerHeight) - 12);
    if (right - left < 100 || bottom - top < 100) { dismiss(); return; }
    card.style.width = Math.min(360, right - left) + 'px';
    card.style.maxHeight = Math.min(460, bottom - top) + 'px';
    const { width, height } = card.getBoundingClientRect();
    const centerX = anchor.left + anchor.width / 2;
    const centerY = anchor.top + anchor.height / 2;
    let x, y;
    if (anchor.right + 14 + width <= right) {
      x = anchor.right + 14; y = centerY - 30;
    } else if (anchor.left - 14 - width >= left) {
      x = anchor.left - 14 - width; y = centerY - 30;
    } else {
      x = centerX - width / 2;
      const above = anchor.top - top, below = bottom - anchor.bottom;
      y = above >= height + 14 || above > below ? anchor.top - height - 14 : anchor.bottom + 14;
    }
    card.style.left = clamp(x, left, right - width) + 'px';
    card.style.top = clamp(y, top, bottom - height) + 'px';
    card.style.visibility = 'visible';
  }

  function schedulePosition() {
    if (selected !== -1 && !layoutFrame) layoutFrame = requestAnimationFrame(positionCard);
  }

  function open(index, trigger) {
    if (selected === index) { dismiss(); return; }
    const item = entries[index].item;
    returnFocus = trigger;
    selected = index;
    const title = document.createElement('h2');
    title.id = 'exhibit-note-title';
    title.textContent = String(index + 1).padStart(2, '0') + ' / ' + item.title;
    const body = document.createElement('p');
    body.id = 'exhibit-note-body';
    body.textContent = item.body;
    content.replaceChildren(title, body);
    if (item.source) {
      const source = document.createElement('a');
      source.className = 'exhibit-note-source';
      source.textContent = item.source[0] + ' ↗';
      source.href = item.source[1];
      source.target = '_blank';
      source.rel = 'noopener';
      content.append(source);
    }
    for (const [i, { pin, choice }] of entries.entries()) {
      pin.setAttribute('aria-expanded', String(i === index));
      choice.setAttribute('aria-expanded', String(i === index));
    }
    card.style.visibility = 'hidden';
    card.hidden = false;
    card.scrollTop = 0;
    positionCard();
    if (!card.hidden) card.focus({ preventScroll: true });
  }

  function reset() {
    dismiss();
    for (const pin of pins) pin.remove();
    pins = []; entries = []; returnFocus = null;
    choices.replaceChildren(); content.replaceChildren();
    section.hidden = true;
  }

  close.addEventListener('click', () => dismiss(true));
  const onEscape = event => {
    if (event.key === 'Escape' && selected !== -1) {
      event.preventDefault(); event.stopPropagation(); dismiss(true);
    }
  };
  document.addEventListener('keydown', onEscape);
  document.addEventListener('pointerdown', event => {
    if (selected === -1 || !(event.target instanceof Element)) return;
    if (card.contains(event.target) || event.target.closest('.exhibit-hotspot, .exhibit-note-choice')) return;
    dismiss();
  });
  viewer.addEventListener('camera-change', schedulePosition);
  window.addEventListener('resize', schedulePosition);
  window.addEventListener('scroll', schedulePosition, { capture: true, passive: true });
  const resizeObserver = new ResizeObserver(schedulePosition);
  resizeObserver.observe(viewer);
  resizeObserver.observe(card);
  window.addEventListener('message', event => {
    if (parent === window || event.source !== parent || event.data?.type !== 'pech-ar:viewport') return;
    try { if (event.origin !== new URL(document.referrer).origin) return; } catch { return; }
    const { start, end } = event.data;
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start) return;
    embeddedViewport = { start, end };
    schedulePosition();
  });

  return {
    reset,
    show(zone, model) {
      reset();
      const items = zone === 'ugol-pechnika' ? EXHIBITS[model] : null;
      if (!items) return;
      for (const [index, item] of items.entries()) {
        const pin = document.createElement('button');
        pin.type = 'button';
        pin.className = 'exhibit-hotspot';
        pin.slot = 'hotspot-exhibit-' + index;
        pin.dataset.position = item.position;
        pin.dataset.normal = item.normal;
        pin.dataset.visibilityAttribute = 'facing';
        pin.textContent = String(index + 1).padStart(2, '0');
        pin.setAttribute('aria-label', 'Точка ' + (index + 1) + ': ' + item.title);
        const choice = document.createElement('button');
        choice.type = 'button';
        choice.className = 'exhibit-note-choice';
        choice.textContent = String(index + 1).padStart(2, '0') + ' · ' + item.title;
        for (const button of [pin, choice]) {
          button.setAttribute('aria-controls', card.id);
          button.setAttribute('aria-expanded', 'false');
          button.addEventListener('click', () => open(index, button));
        }
        entries.push({ item, pin, choice }); pins.push(pin);
        viewer.append(pin); choices.append(choice);
      }
      section.hidden = false;
    },
  };
}
