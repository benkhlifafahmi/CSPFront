import axios from "axios";

export const PRODUCTS_URL = "/assures";

// CREATE =>  POST: add a new assure to the server
export function createAssure(assure) {
  return axios.post(PRODUCTS_URL, { ...assure });
}

// READ
export function getAllAssures(page, count, queryParams={}, order="asc", orderBy="assurename") {
  return axios.get(`${PRODUCTS_URL}/all?page=${page}&count=${count}&order=${order === "asc" ? 1 : -1}&by=${orderBy}&${Object.keys(queryParams.filter).map(key => queryParams.filter[key] ? `${key}=${queryParams.filter[key]}` : '').join('&')}`);
}

export function getAssureById(assureId) {
  return axios.get(`${PRODUCTS_URL}/${assureId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findAssures(page, count, filter={}, order="asc", orderBy="assurename") {
  const data = {};
  if (filter.category || filter.gov) {
    if (filter.category) {
      data.categorie_prestataire = filter.category;
    }
    if (filter.gov) {
      data.gouvernorat = filter.gov;
    }
    return axios.post(`${PRODUCTS_URL}/get_by`, data);
  } else {
    return axios.get(`${PRODUCTS_URL}/all`);
  }
  //return axios.get(`${PRODUCTS_URL}?page=${page}&count=${count}&order=${order === "asc" ? 1 : -1}&by=${orderBy}&${Object.keys(filter).map(key => filter[key] ? `${key}=${filter[key]}` : '').join('&')}`);
}

// UPDATE => PUT: update the procuct on the server
export function updateAssure(assure) {
  return axios.post(`${PRODUCTS_URL}/${assure._id}`, { ...assure });
}

// DELETE => delete the assure from the server
export function deleteAssure(assureId) {
  return axios.delete(`${PRODUCTS_URL}/${assureId}`);
}

// DELETE Assures by ids
export function deleteAssures(ids) {
  return axios.post(`${PRODUCTS_URL}/delete/batch`, { ids });
}

export function getCategories() {
  return axios.get(`${PRODUCTS_URL}/unique_filters?filter=CATEGORY`);
}

export function getSpecialities() {
  return axios.get(`${PRODUCTS_URL}/unique_filters?filter=SPECIALITY`);
}

export function getReferences() {
  return axios.get(`${PRODUCTS_URL}/unique_filters?filter=CENTRE_REFERENCE`);
}

export function getGovs() {
  return axios.get(`${PRODUCTS_URL}/unique_filters?filter=GOVERNORATE`);
}