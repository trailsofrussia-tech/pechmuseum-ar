const MODELS = [
  {id:'muroma-ornaments', title:'Украшения муромы'},
  {id:'neck-ornament', title:'Шейное украшение'},
  {id:'slavic-figures', title:'Фигуры в исторических костюмах'},
];

export function createGlinobitnayaCollection({localURL, showFallback, createHotspots}) {
  const section=document.createElement('section');
  section.className='glinobitnaya-collection';
  section.hidden=true;
  section.setAttribute('aria-labelledby','glina-collection-title');
  section.innerHTML=`
    <header class="glina-collection-heading"><span>02 / Коллекция</span><h2 id="glina-collection-title">Предметы и образы</h2></header>
    <label class="glina-model-label" for="glina-model-select">Выберите 3D-модель</label>
    <select id="glina-model-select" class="glina-model-select"></select>
    <div class="viewer-panel glina-viewer-panel" aria-label="Дополнительные 3D-модели">
      <div class="viewer-top"><span class="viewer-chip" id="glina-model-title"></span><button type="button" class="icon-button" id="glina-reset" aria-label="Вернуть исходный ракурс дополнительной модели"><svg aria-hidden="true"><use href="#i-reset"/></svg></button></div>
      <model-viewer id="glina-viewer" camera-controls touch-action="pan-y" ar ar-modes="webxr scene-viewer quick-look" camera-orbit="0deg 75deg auto" camera-target="auto auto auto" field-of-view="33deg" min-camera-orbit="auto 10deg auto" max-camera-orbit="auto 170deg auto" shadow-intensity="1" shadow-softness="1" exposure="1.1" environment-image="neutral" interaction-prompt="none" loading="eager" reveal="auto">
        <button slot="ar-button" class="native-ar" tabindex="-1" aria-hidden="true">Открыть AR</button>
        <div slot="progress-bar" class="model-loading"><span id="glina-loading">Готовим 3D-модель…</span><progress id="glina-progress" max="1" value="0"></progress></div>
      </model-viewer>
      <div class="viewer-error" id="glina-error" hidden><strong>Не удалось открыть 3D-модель</strong><p>Проверьте соединение и повторите загрузку.</p><button type="button" class="button secondary" id="glina-retry">Повторить загрузку</button></div>
    </div>
    <p class="glina-load-status" id="glina-load-status" role="status" aria-live="polite"></p>
    <button type="button" class="button primary glina-ar" id="glina-ar" disabled><svg aria-hidden="true"><use href="#i-ar"/></svg><span>Посмотреть в пространстве</span><svg class="end-icon" aria-hidden="true"><use href="#i-arrow"/></svg></button>`;
  document.getElementById('experience').after(section);
  const find=id=>section.querySelector('#'+id);
  const viewer=find('glina-viewer'), select=find('glina-model-select'), ar=find('glina-ar'), reset=find('glina-reset');
  const hotspots=createHotspots(viewer,{idPrefix:'glina-exhibit-note'});
  select.replaceChildren(...MODELS.map((model,i)=>{
    const option=document.createElement('option'); option.value=model.id; option.textContent=String(i+1).padStart(2,'0')+' · '+model.title; return option;
  }));
  let active=false, visible=false, started=false, selected=MODELS[0], request=0, ready=false;
  const observer=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){visible=true;observer.unobserve(section);if(active&&!started)load();}
  },{rootMargin:'160px'});
  observer.observe(section);
  function updateTitle(){find('glina-model-title').textContent=selected.title;viewer.setAttribute('alt',selected.title);viewer.setAttribute('aria-label',selected.title);}
  function resetCamera(){viewer.cameraOrbit='0deg 75deg auto';viewer.cameraTarget='auto auto auto';viewer.jumpCameraToGoal?.();}
  async function load(force=false){
    const token=++request;
    hotspots.reset();
    started=true;
    ready=false; ar.disabled=true; reset.disabled=true; find('glina-error').hidden=true;
    find('glina-load-status').textContent='Загружается: '+selected.title;
    find('glina-progress').value=0;find('glina-loading').textContent='Готовим 3D-модель…';
    updateTitle();
    await customElements.whenDefined('model-viewer');
    if(token!==request||!active)return;
    const src=localURL('assets/glinobitnaya-collection/glinobitnaya-'+selected.id+'-v1.glb');
    resetCamera();
    if(!force&&viewer.src===src&&viewer.loaded){onLoad();return;}
    viewer.removeAttribute('loaded');
    viewer.src=force?src+'?retry='+Date.now():src;
  }
  function onLoad(){
    if(!active||!viewer.src)return;
    viewer.setAttribute('loaded','');
    ready=true;ar.disabled=false;reset.disabled=false;find('glina-error').hidden=true;
    find('glina-load-status').textContent=selected.title+' · 3D-модель загружена';
    resetCamera();
    hotspots.show('glinobitnaya',selected.id);
  }
  viewer.addEventListener('load',onLoad);
  viewer.addEventListener('progress',event=>{
    find('glina-progress').value=event.detail.totalProgress;
    find('glina-loading').textContent='Загрузка 3D · '+Math.round(event.detail.totalProgress*100)+'%';
  });
  viewer.addEventListener('error',()=>{
    if(!active)return;
    hotspots.reset();
    ready=false;ar.disabled=true;reset.disabled=true;find('glina-error').hidden=false;
    find('glina-load-status').textContent='Не удалось загрузить: '+selected.title;
  });
  viewer.addEventListener('ar-status',event=>{if(event.detail.status==='failed')showFallback();});
  select.addEventListener('change',()=>{selected=MODELS.find(model=>model.id===select.value)||MODELS[0];load();});
  reset.addEventListener('click',resetCamera);
  find('glina-retry').addEventListener('click',()=>load(true));
  ar.addEventListener('click',async()=>{
    if(!ready)return;
    if(!viewer.canActivateAR){showFallback();return;}
    try{await viewer.activateAR();}catch{showFallback();}
  });
  updateTitle();
  return {sync(scene){
    const next=scene==='glinobitnaya';
    if(active===next)return;
    active=next;section.hidden=!next;
    if(next){if(visible)load();}
    else{request++;started=false;ready=false;ar.disabled=true;hotspots.reset();viewer.src='';viewer.removeAttribute('loaded');}
  }};
}
