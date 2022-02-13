import * as requestFromServer from "./assuresCrud";
import {assuresSlice, callTypes} from "./assuresSlice";

const {actions} = assuresSlice;

export const fetchAssures = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAssures(queryParams.pageNumber, queryParams.pageSize, queryParams.filter, queryParams.sortOrder, queryParams.sortField)
    .then(response => {
      dispatch(actions.assuresFetched({ totalCount: response.data.length, entities: response.data }));
    })
    .catch(error => {
      error.clientMessage = "Can't find assures";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAssure = id => dispatch => {
  if (!id) {
    return dispatch(actions.assureFetched({ assureForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAssureById(id)
    .then(response => {
      const assure = response.data;
      delete assure.deleted;
      delete assure.password;
      delete assure.__v;
      dispatch(actions.assureFetched({ assureForEdit: assure }));
    })
    .catch(error => {
      error.clientMessage = "Can't find assure";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAssure = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAssure(id)
    .then(response => {
      dispatch(actions.assureDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete assure";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createAssure = assureForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createAssure(assureForCreation)
    .then(response => {
      const { assure } = response.data;
      dispatch(actions.assureCreated({ assure }));
    })
    .catch(error => {
      error.clientMessage = "Can't create assure";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAssure = assure => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateAssure(assure)
    .then(() => {
      dispatch(actions.assureUpdated({ assure }));
    })
    .catch(error => {
      error.clientMessage = "Can't update assure";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAssures = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAssures(ids)
    .then(() => {
      dispatch(actions.assuresDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete assures";
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
      error.clientMessage = "Can't find assures";
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
      error.clientMessage = "Can't find assures";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
