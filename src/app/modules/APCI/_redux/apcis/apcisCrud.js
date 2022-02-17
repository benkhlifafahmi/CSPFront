import axios from "axios";

export const PRODUCTS_URL = "/apci";

// CREATE =>  POST: add a new apci to the server
export function createApci(apci) {
  return axios.post(PRODUCTS_URL, { ...apci });
}

// READ
export function getAllApcis(page, count, queryParams={}, order="asc", orderBy="apciname") {
  return axios.get(`${PRODUCTS_URL}?page=${page}&count=${count}&order=${order === "asc" ? 1 : -1}&by=${orderBy}&${Object.keys(queryParams.filter).map(key => queryParams.filter[key] ? `${key}=${queryParams.filter[key]}` : '').join('&')}`);
}

export function getApciById(apciId) {
  return axios.get(`${PRODUCTS_URL}/${apciId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findApcis(page, count, filter={}, order="asc", orderBy="apciname") {
  const data = {};
  if (filter.names || filter.bens || filter.filiers) {
    if (filter.names) {
      data.nom_apci = filter.names;
    }
    if (filter.bens) {
      data.beneficaire = filter.bens;
    }
    if (filter.filiers) {
      data.filiere  = filter.filiers;
    }
    return axios.post(`${PRODUCTS_URL}/get_by`, data);
  } else {
    return axios.get(`${PRODUCTS_URL}/all`);
  }
  //return axios.get(`${PRODUCTS_URL}?page=${page}&count=${count}&order=${order === "asc" ? 1 : -1}&by=${orderBy}&${Object.keys(filter).map(key => filter[key] ? `${key}=${filter[key]}` : '').join('&')}`);
}

// UPDATE => PUT: update the procuct on the server
export function updateApci(apci) {
  return axios.post(`${PRODUCTS_URL}/${apci._id}`, { ...apci });
}

// DELETE => delete the apci from the server
export function deleteApci(apciId) {
  return axios.delete(`${PRODUCTS_URL}/${apciId}`);
}

// DELETE Apcis by ids
export function deleteApcis(ids) {
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

export function getBens() {
  return axios.get(`${PRODUCTS_URL}/all_ben_types`);
}
export function getNames() {
  return axios.get(`${PRODUCTS_URL}/all_names`);
}
export function getFiliers() {
  return axios.get(`${PRODUCTS_URL}/all_filiere`);
}