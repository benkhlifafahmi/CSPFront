import * as requestFromServer from "./medsCrud";
import {medsSlice, callTypes} from "./medsSlice";

const {actions} = medsSlice;

export const fetchMeds = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMeds(queryParams.pageNumber, queryParams.pageSize, queryParams.filter, queryParams.sortOrder, queryParams.sortField)
    .then(response => {
      dispatch(actions.medsFetched({ totalCount: response.data.length, entities: response.data }));
    })
    .catch(error => {
      error.clientMessage = "Can't find meds";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchMed = id => dispatch => {
  if (!id) {
    return dispatch(actions.medFetched({ medForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMedById(id)
    .then(response => {
      const med = response.data;
      delete med.deleted;
      delete med.password;
      delete med.__v;
      dispatch(actions.medFetched({ medForEdit: med }));
    })
    .catch(error => {
      error.clientMessage = "Can't find med";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteMed = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMed(id)
    .then(response => {
      dispatch(actions.medDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete med";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createMed = medForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMed(medForCreation)
    .then(response => {
      const { med } = response.data;
      dispatch(actions.medCreated({ med }));
    })
    .catch(error => {
      error.clientMessage = "Can't create med";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateMed = med => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMed(med)
    .then(() => {
      dispatch(actions.medUpdated({ med }));
    })
    .catch(error => {
      error.clientMessage = "Can't update med";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteMeds = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMeds(ids)
    .then(() => {
      dispatch(actions.medsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete meds";
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
      error.clientMessage = "Can't find meds";
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
      error.clientMessage = "Can't find meds";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
