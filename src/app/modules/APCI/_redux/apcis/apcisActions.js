import * as requestFromServer from "./apcisCrud";
import {apcisSlice, callTypes} from "./apcisSlice";

const {actions} = apcisSlice;

export const fetchApcis = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findApcis(queryParams.pageNumber, queryParams.pageSize, queryParams.filter, queryParams.sortOrder, queryParams.sortField)
    .then(response => {
      dispatch(actions.apcisFetched({ totalCount: response.data.length, entities: response.data }));
    })
    .catch(error => {
      error.clientMessage = "Can't find apcis";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchApci = id => dispatch => {
  if (!id) {
    return dispatch(actions.apciFetched({ apciForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getApciById(id)
    .then(response => {
      const apci = response.data;
      delete apci.deleted;
      delete apci.password;
      delete apci.__v;
      dispatch(actions.apciFetched({ apciForEdit: apci }));
    })
    .catch(error => {
      error.clientMessage = "Can't find apci";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteApci = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteApci(id)
    .then(response => {
      dispatch(actions.apciDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete apci";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createApci = apciForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createApci(apciForCreation)
    .then(response => {
      const { apci } = response.data;
      dispatch(actions.apciCreated({ apci }));
    })
    .catch(error => {
      error.clientMessage = "Can't create apci";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateApci = apci => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateApci(apci)
    .then(() => {
      dispatch(actions.apciUpdated({ apci }));
    })
    .catch(error => {
      error.clientMessage = "Can't update apci";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteApcis = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteApcis(ids)
    .then(() => {
      dispatch(actions.apcisDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete apcis";
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
      error.clientMessage = "Can't find apcis";
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
      error.clientMessage = "Can't find apcis";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};



export const fetchBens = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getBens()
    .then(response => {      
      dispatch(actions.bensFetched({ entities: response.data }));
    })
    .catch(error => {
      error.clientMessage = "Can't find apcis";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchFiliers = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getFiliers()
    .then(response => {      
      dispatch(actions.filiersFetched({ entities: response.data }));
    })
    .catch(error => {
      error.clientMessage = "Can't find apcis";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};


export const fetchNames = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getNames()
    .then(response => {      
      dispatch(actions.namesFetched({ entities: response.data }));
    })
    .catch(error => {
      error.clientMessage = "Can't find apcis";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};




