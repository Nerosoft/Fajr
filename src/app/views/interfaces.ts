export interface EditRow {
  editItem(model);
  showItem(model);
}
export interface TableEdit {
  pushItem(model, modalN);
  checkItem(model);
  deleteItem(key, modalN);
}

