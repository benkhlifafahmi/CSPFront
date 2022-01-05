import axios from "axios";

export const PRODUCTS_URL = "/pro";

// CREATE =>  POST: add a new professional to the server
export function createProfessional(professional) {
  return axios.post(PRODUCTS_URL, { ...professional });
}

// READ
export function getAllProfessionals(page, count, queryParams={}, order="asc", orderBy="professionalname") {
  return axios.get(`${PRODUCTS_URL}?page=${page}&count=${count}&order=${order === "asc" ? 1 : -1}&by=${orderBy}&${Object.keys(queryParams.filter).map(key => queryParams.filter[key] ? `${key}=${queryParams.filter[key]}` : '').join('&')}`);
}

export function getProfessionalById(professionalId) {
  return axios.get(`${PRODUCTS_URL}/${professionalId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findProfessionals(page, count, filter={}, order="asc", orderBy="professionalname") {
  const data = {};
  if (filter.category) {
    data.categorie_prestataire = filter.category;
    return axios.post(`${PRODUCTS_URL}/get_by?filter=CATEGORY`, data);
  } else if (filter.gov) {
    data.gouvernorat = filter.gov;
   return axios.post(`${PRODUCTS_URL}/get_by?filter=GOVERNORATE`, data);
  } else {
    return axios.get(`${PRODUCTS_URL}/all`);
  }
  //return axios.get(`${PRODUCTS_URL}?page=${page}&count=${count}&order=${order === "asc" ? 1 : -1}&by=${orderBy}&${Object.keys(filter).map(key => filter[key] ? `${key}=${filter[key]}` : '').join('&')}`);
}

// UPDATE => PUT: update the procuct on the server
export function updateProfessional(professional) {
  return axios.post(`${PRODUCTS_URL}/${professional._id}`, { ...professional });
}

// DELETE => delete the professional from the server
export function deleteProfessional(professionalId) {
  return axios.delete(`${PRODUCTS_URL}/${professionalId}`);
}

// DELETE Professionals by ids
export function deleteProfessionals(ids) {
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