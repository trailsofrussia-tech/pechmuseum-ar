export function createModelCollection({zone,prefix,title,eyebrow,models,assetDirectory,filePrefix,orbit='0deg 75deg auto',localURL,showFallback,createHotspots,after=document.getElementById('experience')}) {
  const section=document.createElement('section');
  section.className='model-collection '+(zone==='glinobitnaya'?'glinobitnaya-collection':'food-collection');
  section.hidden=true;
  section.setAttribute('aria-labelledby',prefix+'-collection-title');
  section.innerHTML=`
    <header class="glina-collection-heading"><span>${eyebrow}</span><h2 id="${prefix}-collection-title">${title}</h2></header>
    <label class="glina-model-label" for="${prefix}-model-select">${zone==='belaya'?'Выберите блюдо':'Выберите 3D-модель'}</label>
    <select id="${prefix}-model-select" class="glina-model-select"></select>
    <div class="viewer-panel ${prefix}-viewer-panel" aria-label="${title}">
      <div class="viewer-top"><span class="viewer-chip" id="${prefix}-model-title"></span><button type="button" class="icon-button" id="${prefix}-reset" aria-label="Вернуть исходный ракурс дополнительной модели"><svg aria-hidden="true"><use href="#i-reset"/></svg></button></div>
      <model-viewer id="${prefix}-viewer" camera-controls touch-action="pan-y" ar ar-modes="webxr scene-viewer quick-look" camera-orbit="${orbit}" camera-target="auto auto auto" field-of-view="33deg" min-camera-orbit="auto 10deg auto" max-camera-orbit="auto 170deg auto" shadow-intensity="1" shadow-softness="1" exposure="1.1" environment-image="neutral" interaction-prompt="none" loading="eager" reveal="auto">
        <button slot="ar-button" class="native-ar" tabindex="-1" aria-hidden="true">Открыть AR</button>
        <div slot="progress-bar" class="model-loading"><span id="${prefix}-loading">Готовим 3D-модель…</span><progress id="${prefix}-progress" max="1" value="0"></progress></div>
      </model-viewer>
      <div class="viewer-error" id="${prefix}-error" hidden><strong>Не удалось открыть 3D-модель</strong><p>Проверьте соединение и повторите загрузку.</p><button type="button" class="button secondary" id="${prefix}-retry">Повторить загрузку</button></div>
    </div>
    <p class="glina-load-status" id="${prefix}-load-status" role="status" aria-live="polite"></p>
    <button type="button" class="button primary glina-ar" id="${prefix}-ar" disabled><svg aria-hidden="true"><use href="#i-ar"/></svg><span>Посмотреть в пространстве</span><svg class="end-icon" aria-hidden="true"><use href="#i-arrow"/></svg></button>`;
  after.after(section);
  const find=id=>section.querySelector('#'+prefix+'-'+id);
  const viewer=find('viewer'),select=find('model-select'),ar=find('ar'),reset=find('reset');
  const hotspots=createHotspots?.(viewer,{idPrefix:prefix+'-exhibit-note'});
  select.replaceChildren(...models.map((model,i)=>{
    const option=document.createElement('option');option.value=model.id;option.textContent=String(i+1).padStart(2,'0')+' · '+model.title;return option;
  }));
  let active=false,visible=false,started=false,selected=models[0],request=0,ready=false;
  const retries=new Map();
  const observer=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){visible=true;observer.unobserve(section);if(active&&!started)load();}
  },{rootMargin:'160px'});
  observer.observe(section);
  function updateTitle(){find('model-title').textContent=selected.title;viewer.setAttribute('alt',selected.title);viewer.setAttribute('aria-label',selected.title);}
  function resetCamera(){viewer.cameraOrbit=selected.orbit||orbit;viewer.cameraTarget='auto auto auto';viewer.jumpCameraToGoal?.();}
  async function load(force=false){
    if(force)retries.set(selected.id,Date.now());
    const retry=retries.get(selected.id);
    const src=localURL(assetDirectory+'/'+filePrefix+'-'+selected.id+'-v1.glb')+(retry?'?retry='+retry:'');
    if(!force&&started&&viewer.src===src){if(viewer.loaded)onLoad();return;}
    const token=++request;hotspots?.reset();started=true;ready=false;ar.disabled=true;reset.disabled=true;find('error').hidden=true;
    find('load-status').textContent='Загружается: '+selected.title;find('progress').value=0;find('loading').textContent='Готовим 3D-модель…';updateTitle();
    await customElements.whenDefined('model-viewer');
    if(token!==request||!active)return;
    resetCamera();
    if(!force&&viewer.src===src&&viewer.loaded){onLoad();return;}
    viewer.removeAttribute('loaded');viewer.src=src;
    await viewer.updateComplete;
    if(token===request&&active&&!ready&&viewer.loaded&&viewer.src===src)onLoad();
  }
  function onLoad(){
    if(!active||!viewer.src||ready)return;
    viewer.setAttribute('loaded','');ready=true;ar.disabled=false;reset.disabled=false;find('error').hidden=true;
    find('load-status').textContent=selected.title+' · 3D-модель загружена';resetCamera();hotspots?.show(zone,selected.id);
  }
  viewer.addEventListener('load',onLoad);
  viewer.addEventListener('progress',event=>{find('progress').value=event.detail.totalProgress;find('loading').textContent='Загрузка 3D · '+Math.round(event.detail.totalProgress*100)+'%';});
  viewer.addEventListener('error',()=>{if(!active)return;hotspots?.reset();ready=false;ar.disabled=true;reset.disabled=true;find('error').hidden=false;find('load-status').textContent='Не удалось загрузить: '+selected.title;});
  viewer.addEventListener('ar-status',event=>{if(event.detail.status==='failed')showFallback();});
  select.addEventListener('change',()=>{selected=models.find(model=>model.id===select.value)||models[0];load();});
  reset.addEventListener('click',resetCamera);find('retry').addEventListener('click',()=>load(true));
  ar.addEventListener('click',async()=>{if(!ready)return;if(!viewer.canActivateAR){showFallback();return;}try{await viewer.activateAR();}catch{showFallback();}});
  updateTitle();
  return {sync(scene){
    const next=scene===zone;if(active===next)return;active=next;section.hidden=!next;
    if(next){if(visible)load();}
    else{request++;started=false;ready=false;ar.disabled=true;hotspots?.reset();viewer.src=null;viewer.removeAttribute('loaded');}
  }};
}
