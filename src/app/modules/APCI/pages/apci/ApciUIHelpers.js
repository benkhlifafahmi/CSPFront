export const defaultSorted = [{ dataField: "created_at", order: "asc" }];
export const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "50", value: 50 },
  { text: "100", value: 100 }
];
export const initialFilter = {
  filter: {},
  sortOrder: "asc", // asc||desc
  sortField: "apciname",
  pageNumber: 1,
  pageSize: 10
};
