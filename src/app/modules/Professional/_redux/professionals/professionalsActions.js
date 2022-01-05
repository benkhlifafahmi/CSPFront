import * as requestFromServer from "./professionalsCrud";
import {professionalsSlice, callTypes} from "./professionalsSlice";

const {actions} = professionalsSlice;

export const fetchProfessionals = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findProfessionals(queryParams.pageNumber, queryParams.pageSize, queryParams.filter, queryParams.sortOrder, queryParams.sortField)
    .then(response => {
      dispatch(actions.professionalsFetched({ totalCount: response.data.length, entities: response.data }));
    })
    .catch(error => {
      error.clientMessage = "Can't find professionals";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchProfessional = id => dispatch => {
  if (!id) {
    return dispatch(actions.professionalFetched({ professionalForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProfessionalById(id)
    .then(response => {
      const professional = response.data;
      delete professional.deleted;
      delete professional.password;
      delete professional.__v;
      dispatch(actions.professionalFetched({ professionalForEdit: professional }));
    })
    .catch(error => {
      error.clientMessage = "Can't find professional";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteProfessional = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProfessional(id)
    .then(response => {
      dispatch(actions.professionalDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete professional";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createProfessional = professionalForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createProfessional(professionalForCreation)
    .then(response => {
      const { professional } = response.data;
      dispatch(actions.professionalCreated({ professional }));
    })
    .catch(error => {
      error.clientMessage = "Can't create professional";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProfessional = professional => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateProfessional(professional)
    .then(() => {
      dispatch(actions.professionalUpdated({ professional }));
    })
    .catch(error => {
      error.clientMessage = "Can't update professional";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteProfessionals = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProfessionals(ids)
    .then(() => {
      dispatch(actions.professionalsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete professionals";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};



export const fetchCategories = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getCategories()
    .then(response => {      
      dispatch(actions.categoriesFetched({ entities: response.data }));
    })
    .catch(error => {
      error.clientMessage = "Can't find professionals";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchGovs = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getGovs()
    .then(response => {      
      dispatch(actions.govsFetched({ entities: response.data }));
    })
    .catch(error => {
      error.clientMessage = "Can't find professionals";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
