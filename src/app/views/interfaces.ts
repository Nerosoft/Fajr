export interface EditRow {
  editItem(model);
  showItem(model);
}
export interface Lang {
  setupLang(lang);
}
export interface TableEdit {
  pushItem(model, modalN);
  checkItem(model);
  deleteItem(key, modalN);
}

