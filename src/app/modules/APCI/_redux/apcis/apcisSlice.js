import {createSlice} from "@reduxjs/toolkit";

const initialApcisState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  apciForEdit: undefined,
  lastError: null, 
  categories: [],
  govs: [],
  bens: [],
  names: [],
  filiers: []
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const apcisSlice = createSlice({
  name: "apcis",
  initialState: initialApcisState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getApciById
    apciFetched: (state, action) => {
      state.actionsLoading = false;
      state.apciForEdit = action.payload.apciForEdit;
      state.error = null;
    },
    // findApcis
    apcisFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createApci
    apciCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.apci);
    },
    // updateApci
    apciUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.apci._id) {
          return action.payload.apci;
        }
        return entity;
      });
    },
    // deleteApci
    apciDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteApcis
    apcisDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // apcisUpdateState
    apcisStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
    categoriesFetched: (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.categories = entities;
    },
    govsFetched: (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.govs = entities;
    },
    bensFetched:  (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.bens = entities;
    },
    namesFetched:  (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.names = entities;
    },
    filiersFetched:  (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.filiers = entities;
    },
  }
});
