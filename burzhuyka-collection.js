export const BURZHUYKA_COLLECTION = [
  {id:'interior',title:'Буржуйка в интерьере',model:'/assets/burzhuyka-mobile-v1.glb',orbit:'28deg 66deg 7.3m',target:'0m .8m 0m',description:'Небольшая металлическая печь с дымовой трубой расположена у окна. Рядом — стол со швейной машиной, печные инструменты и сундук.',scaleNote:''},
  {id:'cone',heightCM:35,scaleStatus:'estimated',scaleNote:'Ориентировочная высота — 35 см. Точные обмеры пока не заданы.',title:'Коническая печь',model:'/assets/burzhuyka-collection/burzhuyka-cone-v1.glb',description:'Переносная металлическая печь с круглой верхней площадкой, боковыми ручками и открытой топкой. Внутри видна решётка.'},
  {id:'brazier',heightCM:25,scaleStatus:'estimated',scaleNote:'Ориентировочная высота — 25 см. Точные обмеры пока не заданы.',title:'Металлическая жаровня',model:'/assets/burzhuyka-collection/burzhuyka-brazier-v1.glb',description:'Низкая металлическая жаровня с прямоугольным основанием. Боковые пластины соединены заклёпками; внизу видны круглые отверстия.'},
  {id:'milk-can',heightCM:68,scaleStatus:'estimated',scaleNote:'Ориентировочная высота — 68 см. Точные обмеры пока не заданы.',title:'Печь из молочного бидона',model:'/assets/burzhuyka-collection/burzhuyka-milk-can-v1.glb',description:'Печь на основе металлического молочного бидона. Крышка откинута, в передней части корпуса сделан проём, внутри лежат дрова.'},
  {id:'rim',heightCM:80,scaleStatus:'estimated',scaleNote:'Ориентировочная высота — 80 см. Точные обмеры пока не заданы.',title:'Печь из колёсных дисков',model:'/assets/burzhuyka-collection/burzhuyka-rim-v1.glb',description:'Цилиндрическая печь из нескольких колёсных дисков. В нижней части расположена топочная дверца, корпус установлен на ножках.'},
  {id:'rocket',heightCM:45,scaleStatus:'estimated',scaleNote:'Ориентировочная высота — 45 см. Точные обмеры пока не заданы.',title:'Ракетная печь',model:'/assets/burzhuyka-collection/burzhuyka-rocket-v1.glb',description:'Металлическая печь с вертикальным каналом и наклонным боковым проёмом. Внизу расположены изогнутые опоры.'},
  {id:'rusty',heightCM:55,scaleStatus:'estimated',scaleNote:'Ориентировочная высота — 55 см. Точные обмеры пока не заданы.',title:'Металлическая буржуйка',model:'/assets/burzhuyka-collection/burzhuyka-rusty-v1.glb',description:'Прямоугольная металлическая буржуйка на ножках. Впереди открыта топочная дверца, сверху расположен патрубок для дымовой трубы.'},
  {id:'tin-can',heightCM:22,scaleStatus:'estimated',scaleNote:'Ориентировочная высота — 22 см. Точные обмеры пока не заданы.',title:'Печь из жестяной банки',model:'/assets/burzhuyka-collection/burzhuyka-tin-can-v1.glb',description:'Небольшая печь из ребристых металлических банок. Сбоку находится загрузочный канал, с другой стороны — ручка, сверху — опоры для посуды.'}
];

const UGOL_PECHNIKA_COLLECTION = [
  {
    id: 'interior',
    title: 'Кирпичная печь: разрез и внешний вид',
    model: '/assets/ugol-pechnika-mobile-v1.glb',
    orbit: '0deg 75deg 7.3m',
    target: '0m 1.1m 0m',
    description: 'Две модели кирпичной печи рядом: разрез слева и внешний вид справа.',
  },
  {
    id: 'damper',
    orbit: '45deg 40deg auto',
    title: 'Печная задвижка',
    model: '/assets/ugol-pechnika-collection/ugol-pechnika-damper-v1.glb',
    description: 'Задвижка с выдвижной пластиной, которая перекрывает дымовой канал.',
  },
  {
    id: 'wooden-mold',
    orbit: '25deg 53deg auto',
    title: 'Деревянная формовочная коробка',
    model: '/assets/ugol-pechnika-collection/ugol-pechnika-wooden-mold-v1.glb',
    description: 'Деревянная коробка для формования заготовки.',
  },
  {
    id: 'metal-stamp',
    orbit: '5deg 75deg auto',
    title: 'Металлический штамп',
    model: '/assets/ugol-pechnika-collection/ugol-pechnika-metal-stamp-v1.glb',
    description: 'Металлический штамп для получения оттиска.',
  },
];

const collections = {
  burzhuyka: {
    models: BURZHUYKA_COLLECTION,
    label: 'Печь в коллекции',
    accessibleName: 'Коллекция буржуек',
  },
  'ugol-pechnika': {
    models: UGOL_PECHNIKA_COLLECTION,
    label: 'Экспонат',
    accessibleName: 'Экспонаты угла печника',
  },
};

export function getCollectionModel(zone, id) {
  const collection = collections[zone];
  if (!collection) return null;
  return collection.models.find(model => model.id === id) ?? collection.models[0];
}

export function createCollectionChoosers(onChange, zones = Object.keys(collections)) {
  const choosers = zones.map(zone => {
    const collection = collections[zone];
    const section = document.createElement('section');
    section.id = zone + '-collection';
    section.className = 'collection-switcher';
    section.hidden = true;
    section.setAttribute('aria-label', collection.accessibleName);

    const label = document.createElement('label');
    const select = document.createElement('select');
    const note = document.createElement('p');
    select.id = zone + '-model-select';
    label.htmlFor = select.id;
    label.textContent = collection.label;
    note.id = zone + '-scale-note';
    note.className = 'collection-scale-note';
    select.setAttribute('aria-describedby', note.id);

    for (const [index, model] of collection.models.entries()) {
      const option = document.createElement('option');
      option.value = model.id;
      option.textContent = String(index + 1).padStart(2, '0') + ' · ' + model.title;
      select.append(option);
    }

    select.addEventListener('change', () => onChange(zone, select.value));
    section.append(label, select, note);
    document.querySelector('.zone-navigation').after(section);
    return { zone, section, select, note };
  });

  return {
    sync(zone, model) {
      for (const chooser of choosers) {
        chooser.section.hidden = chooser.zone !== zone;
        if (chooser.section.hidden) continue;
        chooser.select.value = model.id;
        chooser.note.textContent = model.scaleNote ?? '';
        chooser.note.hidden = !model.scaleNote;
      }
    },
  };
}

// Old app bundles may still be cached by visitors of the published site.
export function getBurzhuykaModel(id) {
  return getCollectionModel('burzhuyka', id);
}

export function createBurzhuykaChooser(onChange) {
  return createCollectionChoosers((_, id) => onChange(id), ['burzhuyka']);
}
