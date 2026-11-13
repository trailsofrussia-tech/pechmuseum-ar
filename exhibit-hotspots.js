// Surface anchors selected against the supplied models. New descriptions refer to visible details.
const EXHIBITS = {
  "ugol-pechnika/damper": [
    {
      "title": "Ручка задвижки",
      "position": "-0.155469m -0.007275m -0.658335m",
      "normal": "-0.271379 0.920808 -0.280118",
      "body": "За выступающий конец выдвигают и задвигают пластину. Она скользит вдоль рамки и меняет величину прохода для дыма."
    },
    {
      "title": "Подвижная пластина",
      "position": "0.042039m 0.008198m -0.010337m",
      "normal": "0.000018 0.999687 -0.025021",
      "body": "Когда пластину выдвигают, проход открывается; когда задвигают — уменьшается. Пока дрова горят или угли тлеют, закрывать дымовой канал опасно: угарный газ может попасть в помещение.",
      "source": [
        "МЧС России · дымовые заслонки",
        "https://69.mchs.gov.ru/deyatelnost/press-centr/novosti/5647588"
      ]
    },
    {
      "title": "Неподвижная рамка",
      "position": "0.326818m 0.024501m 0.790796m",
      "normal": "0.999941 -0.010063 0.004047",
      "body": "Рамку устанавливают в дымовом канале. Её направляющие удерживают подвижную пластину. Открытое окно в рамке показывает, какая часть прохода сейчас свободна."
    }
  ],
  "ugol-pechnika/wooden-mold": [
    {
      "title": "Полость формы",
      "position": "-0.181531m -0.046589m -0.331287m",
      "normal": "-0.017835 0.008413 0.999806",
      "body": "В деревянную форму набивают подготовленную глину, уплотняя её в углах. Так мягкая масса получает очертания заготовки. Здесь показана простая коробка, без резного узора.",
      "source": [
        "Энциклопедия Брокгауза и Ефрона · кирпичное производство",
        "https://www.booksite.ru/fulltext/1/001/007/051/51405.htm"
      ]
    },
    {
      "title": "Борта формы",
      "position": "-0.696721m -0.173739m -0.330572m",
      "normal": "0.005996 -0.016336 0.999849",
      "body": "Борта ограничивают глину по сторонам. Излишек массы снимают, затем заготовку извлекают. Кирпич-сырец сначала сушат и только после этого обжигают: деревянную форму в огонь не помещают.",
      "source": [
        "Энциклопедия Брокгауза и Ефрона · кирпичное производство",
        "https://www.booksite.ru/fulltext/1/001/007/051/51405.htm"
      ]
    },
    {
      "title": "Соединение досок",
      "position": "-0.735707m 0.017744m 0.429179m",
      "normal": "-0.037320 -0.048217 0.998139",
      "body": "Боковая стенка состыкована с торцевой. У края виден ряд круглых крепёжных элементов; этот участок показывает сборку самой коробки."
    }
  ],
  "ugol-pechnika/metal-stamp": [
    {
      "title": "Рельеф и оттиск",
      "position": "-0.011271m 0.057745m 0.009056m",
      "normal": "0.183322 -0.014933 0.982939",
      "body": "Рабочую поверхность прижимают к ещё пластичной глине. Выступающие знаки оставляют углублённый оттиск. Рисунок на заготовке получается зеркальным относительно штампа; клеймо наносят до обжига.",
      "source": [
        "Музейная публикация · кирпич с клеймом",
        "https://ar.culture.ru/ru/subject/kirpich-s-kleymom"
      ]
    },
    {
      "title": "Зачем нужно клеймо",
      "position": "0.086678m 0.037028m 0.010588m",
      "normal": "0.089682 -0.007561 0.995942",
      "body": "На историческом кирпиче клеймо могло обозначать завод или владельца производства. Оно помогает исследователям установить происхождение изделия. Принадлежность знаков на этой модели конкретному заводу не установлена.",
      "source": [
        "Музейная публикация · кирпич с клеймом",
        "https://ar.culture.ru/ru/subject/kirpich-s-kleymom"
      ]
    },
    {
      "title": "Отверстия в пластине",
      "position": "-0.104709m 0.045979m -0.005949m",
      "normal": "0.382441 0.923979 0.001435",
      "body": "Круглые отверстия расположены в нескольких частях пластины. Сравните их с выступающим рельефом букв: это разные элементы формы штампа."
    }
  ],
  "kamenka/default": [
    {
      "title": "Каменный очаг",
      "position": "0.334478m 0.135739m 0.543284m",
      "normal": "0.693078 0.107660 0.712778",
      "body": "Камни окружают огонь в центре сцены. Здесь можно рассмотреть форму очага и то, как вокруг него размещены остальные предметы."
    },
    {
      "title": "Фигура у очага",
      "position": "-0.694890m 0.442722m 0.483229m",
      "normal": "0.145731 -0.120327 0.981980",
      "body": "Сидящая фигура расположена рядом с огнём. Модель позволяет увидеть её позу, одежду и место среди предметов общего пространства."
    },
    {
      "title": "Шкура на стойке",
      "position": "1.109797m 0.561140m -0.403179m",
      "normal": "-0.513954 0.156355 0.843448",
      "body": "На деревянной стойке закреплена шкура. Поверните сцену, чтобы рассмотреть опоры и способ размещения шкуры относительно очага."
    }
  ],
  "glinobitnaya/default": [
    {
      "title": "Глиняный корпус",
      "position": "-0.713979m 0.327370m 1.069291m",
      "normal": "0.507370 0.327778 0.796955",
      "body": "Печь показана округлым объёмом с небольшим устьем спереди. Срез жилища позволяет увидеть её форму и расположение у стены."
    },
    {
      "title": "Керамическая посуда",
      "position": "-0.391130m 0.173786m 0.413201m",
      "normal": "0.025798 0.990592 -0.134398",
      "body": "Рядом с печью расставлены сосуды разных форм. Сравните широкие открытые миски и более узкие горшки."
    },
    {
      "title": "Бревенчатая стена",
      "position": "1.238003m 0.579632m 0.056552m",
      "normal": "0.905146 0.424072 0.029568",
      "body": "Стена собрана из горизонтальных брёвен. Открытая сторона модели показывает, как печь и предметы обстановки расположены внутри жилища."
    }
  ],
  "kurnaya/default": [
    {
      "title": "Печной массив",
      "position": "-1.209477m 0.760823m 0.423199m",
      "normal": "0.999970 -0.007633 -0.001594",
      "body": "Основной объём печи находится на деревянном основании. На светлой поверхности модели видны потемневшие участки вокруг рабочей зоны."
    },
    {
      "title": "Верхняя полка",
      "position": "-0.159001m 1.398511m -0.405750m",
      "normal": "-0.002612 0.999991 0.003442",
      "body": "Над печью показана деревянная полка с сосудами и коробами. Здесь можно рассмотреть размещение предметов на разных уровнях."
    },
    {
      "title": "Деревянная лопата",
      "position": "-0.578972m 0.253362m 0.911611m",
      "normal": "0.881559 0.191696 0.431400",
      "body": "Лопата стоит у бочки перед основанием печи. У неё показаны плоская рабочая часть и длинная рукоять."
    }
  ],
  "gollandka/default": [
    {
      "title": "Рабочий стол",
      "position": "-0.909598m 0.628299m 1.111430m",
      "normal": "-0.000355 1.000000 -0.000235",
      "body": "Отдельный стол стоит перед остальными предметами обстановки. На столешнице показаны плоские листы и небольшие предметы."
    },
    {
      "title": "Кресло у стены",
      "position": "-0.335722m 0.299832m -0.870530m",
      "normal": "-0.433468 -0.070027 0.898444",
      "body": "В модели видны мягкие спинка и сиденье, подлокотники и деревянные ножки. Кресло расположено между этажеркой и высоким шкафом."
    },
    {
      "title": "Высокий шкаф",
      "position": "1.365059m 1.234986m 0.745810m",
      "normal": "1.000000 0.000043 0.000022",
      "body": "Высокий деревянный предмет занимает правую сторону сцены. Рассмотрите обрамление панелей и то, как он ограничивает пространство комнаты."
    }
  ],
  "burzhuyka/interior": [
    {
      "title": "Металлическая печь",
      "position": "-0.183049m 0.675808m -0.039029m",
      "normal": "0.324937 0.001715 0.945734",
      "body": "Основной корпус печи имеет округлую форму. В сцене он показан вместе с дымовой трубой и предметами, расположенными на верхней площадке."
    },
    {
      "title": "Дымовая труба",
      "position": "-0.159696m 1.403968m -0.437989m",
      "normal": "0.797432 0.135880 0.587911",
      "body": "Труба поднимается от корпуса и меняет направление у окна. Её можно проследить отдельно от основной части печи."
    },
    {
      "title": "Швейная машина",
      "position": "1.075829m 1.197835m 0.605475m",
      "normal": "0.437005 0.035381 0.898763",
      "body": "Машина стоит на отдельном столе рядом с печью. В модели видны маховик и ажурное металлическое основание стола."
    }
  ],
  "burzhuyka/cone": [
    {
      "title": "Нижняя решётка",
      "position": "-0.033197m 0.042168m 0.050679m",
      "normal": "-0.000755 0.999998 0.001644",
      "body": "На дне корпуса показана металлическая решётка с радиальными прорезями. Через открытый боковой проём можно рассмотреть её форму."
    },
    {
      "title": "Верхний проём",
      "position": "-0.082939m 0.282609m -0.099734m",
      "normal": "0.653529 -0.069039 0.753746",
      "body": "Круглое отверстие окружено металлическими выступами. Эта точка выделяет верхний край корпуса и открытое внутреннее пространство."
    },
    {
      "title": "Металлический корпус",
      "position": "0.122572m 0.222836m 0.066991m",
      "normal": "0.870615 0.095352 0.482637",
      "body": "Корпус имеет округлое сечение. На поверхности модели видны ободья, соединения и ржавые участки."
    }
  ],
  "burzhuyka/brazier": [
    {
      "title": "Днище жаровни",
      "position": "-0.110900m 0.063363m -0.041441m",
      "normal": "0.000088 1.000000 -0.000142",
      "body": "Плоское металлическое днище ограничено вертикальными стенками. Открытая верхняя часть позволяет рассмотреть внутреннюю поверхность жаровни."
    },
    {
      "title": "Соединения пластин",
      "position": "0.204761m 0.109178m 0.169680m",
      "normal": "-0.489344 0.271291 0.828821",
      "body": "На углах и передней кромке видны округлые головки крепежа. Здесь можно сравнить соседние пластины и места их соединения."
    },
    {
      "title": "Боковая стенка",
      "position": "0.247880m 0.154970m 0.008357m",
      "normal": "1.000000 -0.000028 -0.000043",
      "body": "Высокая пластина закрывает боковую сторону жаровни. Сравните её с открытой передней частью и более низкой кромкой днища."
    }
  ],
  "burzhuyka/milk-can": [
    {
      "title": "Дрова в топке",
      "position": "0.016432m 0.147336m 0.146785m",
      "normal": "-0.010720 0.616131 0.787571",
      "body": "Через вырез в стенке видны дрова. Модель позволяет сравнить внутренний объём ёмкости с размером загрузочного отверстия."
    },
    {
      "title": "Горловина и крышка",
      "position": "0.045255m 0.646518m 0.042781m",
      "normal": "0.453503 0.872646 0.181174",
      "body": "Крышка откинута над круглой горловиной. Под ней показаны обод ёмкости и небольшой запорный элемент."
    },
    {
      "title": "Ручка бидона",
      "position": "0.182423m 0.432480m 0.048671m",
      "normal": "0.789601 -0.127092 0.600314",
      "body": "Изогнутая ручка расположена сбоку на уровне плечиков. Эта деталь напоминает об исходной форме ёмкости, использованной для корпуса модели."
    }
  ],
  "burzhuyka/rim": [
    {
      "title": "Корпус из дисков",
      "position": "0.146219m 0.551457m 0.074206m",
      "normal": "0.909171 -0.042560 0.414243",
      "body": "В корпусе повторяются круглые профили дисков, расположенных один над другим. Их ободья хорошо видны снаружи."
    },
    {
      "title": "Топочный проём",
      "position": "-0.107176m 0.348183m 0.202470m",
      "normal": "0.011920 0.001116 0.999928",
      "body": "В боковой части корпуса показан прямоугольный проём с металлической рамкой. Через него виден внутренний объём модели."
    },
    {
      "title": "Опоры печи",
      "position": "0.150811m 0.096083m 0.164157m",
      "normal": "0.045499 0.036729 0.998289",
      "body": "Вертикальные опоры поднимают корпус над нижней плоскостью. В основании ножек показаны небольшие площадки."
    }
  ],
  "burzhuyka/rocket": [
    {
      "title": "Наклонный канал",
      "position": "-0.002476m 0.289039m 0.122622m",
      "normal": "-0.010802 0.738668 0.673983",
      "body": "Короткий наклонный участок входит в нижнюю часть вертикального корпуса. Его квадратное отверстие открыто и хорошо видно спереди."
    },
    {
      "title": "Вертикальный канал",
      "position": "0.047380m 0.325177m -0.058736m",
      "normal": "0.999995 0.001757 0.002443",
      "body": "Высокая часть корпуса имеет прямоугольное сечение и открытый верх. На стенках видны продольные соединения металла."
    },
    {
      "title": "Изогнутые опоры",
      "position": "0.094569m 0.049398m 0.035057m",
      "normal": "0.076111 0.922032 0.379557",
      "body": "Несколько изогнутых полос расходятся от основания. Они образуют опоры, удерживающие корпус в вертикальном положении."
    }
  ],
  "burzhuyka/rusty": [
    {
      "title": "Топочная дверца",
      "position": "0.084259m 0.240004m 0.281564m",
      "normal": "0.993051 -0.001161 0.117677",
      "body": "Дверца откинута наружу и оставляет открытым прямоугольный топочный проём. На краях модели видны петли и запорная деталь."
    },
    {
      "title": "Патрубок трубы",
      "position": "0.046572m 0.507867m -0.176408m",
      "normal": "0.563379 -0.004735 0.826185",
      "body": "Короткий цилиндрический патрубок выступает над верхней стенкой. Это место присоединения дымовой трубы; высокая труба в этой модели не показана."
    },
    {
      "title": "Металлический корпус",
      "position": "0.167413m 0.270645m -0.073814m",
      "normal": "0.999949 -0.003244 -0.009589",
      "body": "Плоские стенки соединены по углам. Корпус стоит на отдельных ножках; сверху расположена ровная металлическая площадка."
    }
  ],
  "burzhuyka/tin-can": [
    {
      "title": "Боковой загрузочный канал",
      "position": "-0.024926m 0.091400m 0.097927m",
      "normal": "0.495338 0.575392 0.650818",
      "body": "Короткая ребристая банка соединена с боковой частью основной ёмкости. В проёме показаны деревянные поленья."
    },
    {
      "title": "Верхнее отверстие",
      "position": "0.020564m 0.203207m 0.060062m",
      "normal": "0.144936 -0.009869 0.989392",
      "body": "Верх банки открыт, а по его краю оставлены металлические выступы. Здесь можно рассмотреть внутреннюю поверхность и кромку ёмкости."
    },
    {
      "title": "Ребристый корпус",
      "position": "0.078620m 0.128987m 0.030609m",
      "normal": "0.684969 0.230530 0.691139",
      "body": "На корпусе сохранены кольцевые рёбра жестяной банки. Они позволяют увидеть исходную форму ёмкости, использованной в этой модели."
    }
  ],
  "ugol-pechnika/interior": [
    {
      "title": "Внутренние каналы",
      "position": "-1.098899m 1.374681m 0.304622m",
      "normal": "-0.000366 -0.000135 1.000000",
      "body": "Тёмным цветом в модели выделены участки внутренних проходов между кирпичными перегородками. Разрез показывает то, что закрыто наружной кладкой."
    },
    {
      "title": "Топочная часть в разрезе",
      "position": "-0.684080m 0.326068m 0.240194m",
      "normal": "-0.000661 0.999943 -0.010667",
      "body": "В нижней части разреза видны небольшая решётка и окружающий её кирпичный массив. Сравните этот участок с наружной моделью справа."
    },
    {
      "title": "Наружная кладка",
      "position": "0.749045m 0.505937m 0.442362m",
      "normal": "-0.000074 -0.000009 1.000000",
      "body": "На наружной модели показаны кирпичные ряды, металлические дверцы и выступы. Сопоставьте их расположение с разрезом слева."
    }
  ]
};

export function createExhibitHotspots(viewer) {
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'viewer-points-toggle';
  toggle.hidden = true;
  toggle.setAttribute('aria-controls', 'viewer');
  viewer.closest('.viewer-panel').append(toggle);
  let pointsVisible = true;
  function syncVisibility() {
    for (const pin of pins) pin.hidden = !pointsVisible;
    toggle.hidden = pins.length === 0;
    toggle.textContent = pointsVisible ? 'Скрыть кнопки' : 'Показать кнопки';
    toggle.setAttribute('aria-pressed', String(!pointsVisible));
  }
  toggle.addEventListener('click', () => {
    pointsVisible = !pointsVisible;
    dismiss();
    syncVisibility();
  });
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
    for (const { pin } of entries) {
      pin.setAttribute('aria-expanded', 'false');
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
    for (const [i, { pin }] of entries.entries()) {
      pin.setAttribute('aria-expanded', String(i === index));
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
    toggle.hidden = true;
    content.replaceChildren();
  }

  close.addEventListener('click', () => dismiss(true));
  const onEscape = event => {
    if (event.key === 'Escape' && selected !== -1 && !document.querySelector('dialog[open]')) {
      event.preventDefault(); event.stopPropagation(); dismiss(true);
    }
  };
  document.addEventListener('keydown', onEscape);
  document.addEventListener('pointerdown', event => {
    if (selected === -1 || !(event.target instanceof Element)) return;
    // The toggle closes the card in its own click handler.
    if (card.contains(event.target) || toggle.contains(event.target) || event.target.closest('.exhibit-hotspot')) return;
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
      const items = zone === 'belaya' ? null : EXHIBITS[zone + '/' + (model || 'default')];
      if (!items) return;
      for (const [index, item] of items.entries()) {
        const pin = document.createElement('button');
        pin.type = 'button';
        pin.className = 'exhibit-hotspot';
        pin.slot = 'hotspot-exhibit-' + index;
        pin.dataset.position = item.position;
        pin.dataset.normal = item.normal;
        pin.dataset.visibilityAttribute = 'facing';
        const label = document.createElement('span');
        label.className = 'hotspot-label';
        label.textContent = String(index + 1).padStart(2, '0');
        pin.append(label);
        pin.setAttribute('aria-label', 'Точка ' + (index + 1) + ': ' + item.title);
        pin.setAttribute('aria-controls', card.id);
        pin.setAttribute('aria-expanded', 'false');
        // Annotation taps must not start a camera drag or retain pointer capture.
        pin.addEventListener('pointerdown', event => event.stopPropagation());
        pin.addEventListener('click', () => open(index, pin));
        entries.push({ item, pin }); pins.push(pin);
        viewer.append(pin);
      }
      syncVisibility();
    },
  };
}
