export const FOOD_MODELS = [
  {id:'baked-onions',title:'Запечённый лук'},
  {id:'barley-porridge',title:'Перловая каша'},
  {id:'berry-pie',title:'Ягодный пирог'},
  {id:'cabbage-soup',title:'Щи в глиняном горшке'},
  {id:'pot-porridge',title:'Каша в глиняном горшке'},
  {id:'roast-meat',title:'Жаркое в горшке'},
  {id:'pork-knuckle',title:'Запечённая свиная рулька'},
  {id:'roasted-duck',title:'Запечённая утка'},
];

export function createFoodCollection({createCollection,...options}) {
  return createCollection({...options,zone:'belaya',prefix:'food',title:'Что готовили в печи',eyebrow:'04 / Еда из печи',models:FOOD_MODELS,assetDirectory:'assets/food-collection',filePrefix:'food',orbit:'30deg 58deg auto',after:document.querySelector('.doll-description')});
}
