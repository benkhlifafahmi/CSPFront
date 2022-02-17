import axios from "axios";

export const PRODUCTS_URL = "/pro";

// CREATE =>  POST: add a new med to the server
export function createMed(med) {
  return axios.post(PRODUCTS_URL, { ...med });
}

// READ
export function getAllMeds(page, count, queryParams={}, order="asc", orderBy="medname") {
  return axios.get(`${PRODUCTS_URL}?page=${page}&count=${count}&order=${order === "asc" ? 1 : -1}&by=${orderBy}&${Object.keys(queryParams.filter).map(key => queryParams.filter[key] ? `${key}=${queryParams.filter[key]}` : '').join('&')}`);
}

export function getMedById(medId) {
  return axios.get(`${PRODUCTS_URL}/${medId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findMeds(page, count, filter={}, order="asc", orderBy="medname") {
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
export function updateMed(med) {
  return axios.post(`${PRODUCTS_URL}/${med._id}`, { ...med });
}

// DELETE => delete the med from the server
export function deleteMed(medId) {
  return axios.delete(`${PRODUCTS_URL}/${medId}`);
}

// DELETE Meds by ids
export function deleteMeds(ids) {
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