import {createModelCollection} from './model-collection.js?v=food-20261114';

const MODELS = [
  {id:'muroma-ornaments', title:'Украшения муромы'},
  {id:'neck-ornament', title:'Шейное украшение'},
  {id:'slavic-figures', title:'Фигуры в исторических костюмах'},
];

export function createGlinobitnayaCollection({createCollection=createModelCollection,...options}) {
  return createCollection({...options,zone:'glinobitnaya',prefix:'glina',title:'Предметы и образы',eyebrow:'02 / Коллекция',models:MODELS,assetDirectory:'assets/glinobitnaya-collection',filePrefix:'glinobitnaya'});
}
