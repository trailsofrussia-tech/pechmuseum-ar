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

export function getBurzhuykaModel(id) {
  return BURZHUYKA_COLLECTION.find(model=>model.id===id) || BURZHUYKA_COLLECTION[0];
}

export function createBurzhuykaChooser(onChange) {
  const section=document.createElement('section');
  section.id='burzhuyka-collection';section.className='collection-switcher';section.hidden=true;
  section.setAttribute('aria-label','Коллекция буржуек');
  const label=document.createElement('label');label.htmlFor='burzhuyka-model-select';label.textContent='Печь в коллекции';
  const select=document.createElement('select');select.id='burzhuyka-model-select';select.setAttribute('aria-describedby','burzhuyka-scale-note');
  for(const [index,model] of BURZHUYKA_COLLECTION.entries()){
    const option=document.createElement('option');option.value=model.id;option.textContent=String(index+1).padStart(2,'0')+' · '+model.title;select.append(option);
  }
  const note=document.createElement('p');note.id='burzhuyka-scale-note';note.className='collection-scale-note';
  select.addEventListener('change',()=>onChange(select.value));
  section.append(label,select,note);
  document.querySelector('.zone-navigation').after(section);
  return {sync(zone,model){
    section.hidden=zone!=='burzhuyka';
    if(section.hidden)return;
    select.value=model.id;
    note.textContent=model.id==='interior'?'':(model.scaleNote || 'Физические размеры пока не заданы');
    note.hidden=!note.textContent;
  }};
}
