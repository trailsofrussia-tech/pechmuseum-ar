// Match the embedded page's natural content height, so the museum footer follows it.
(() => {
  if (parent === window) return;
  document.body.classList.add('pech-embedded');
  let scheduled = false, lastKey = '';
  const send = () => {
    scheduled = false;
    const height = Math.max(400, Math.ceil(document.body.getBoundingClientRect().height));
    const scene = document.querySelector('#zone-select')?.value || 'kamenka';
    const model = document.querySelector('#viewer')?.dataset;
    const details = {modelId:model?.collectionModel || '',modelTitle:model?.modelTitle || '',modelDescription:model?.modelDescription || '',scaleNote:model?.scaleNote || ''};
    const key = JSON.stringify({height,scene,...details});
    if (key === lastKey) return;
    lastKey = key;
    let origin = '*';
    try { origin = new URL(document.referrer).origin; } catch {}
    parent.postMessage({ type: 'pech-ar:layout', height, scene, ...details }, origin);
  };
  const schedule = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(send); } };
  new ResizeObserver(schedule).observe(document.body);
  new MutationObserver(schedule).observe(document.querySelector('main'), { childList: true, subtree: true });
  window.addEventListener('load', schedule);
  window.addEventListener('pech-model-change', schedule);
  window.addEventListener('message', event => {
    if (event.source !== parent || event.data?.type !== 'pech-ar:viewport') return;
    if (document.referrer && event.origin !== new URL(document.referrer).origin) return;
    const { start, end } = event.data;
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return;
    const root = document.documentElement.style;
    root.setProperty('--embed-dialog-top', `${(start + end) / 2}px`);
    root.setProperty('--embed-dialog-max-height', `${Math.max(200, end - start - 32)}px`);
    root.setProperty('--embed-toast-top', `${end - 16}px`);
  });
  schedule();
})();
