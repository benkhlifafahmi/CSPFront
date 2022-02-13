import {createSlice} from "@reduxjs/toolkit";

const initialAssuresState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  assureForEdit: undefined,
  lastError: null, 
  categories: [],
  govs: [],
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const assuresSlice = createSlice({
  name: "assures",
  initialState: initialAssuresState,
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
    // getAssureById
    assureFetched: (state, action) => {
      state.actionsLoading = false;
      state.assureForEdit = action.payload.assureForEdit;
      state.error = null;
    },
    // findAssures
    assuresFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAssure
    assureCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.assure);
    },
    // updateAssure
    assureUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.assure._id) {
          return action.payload.assure;
        }
        return entity;
      });
    },
    // deleteAssure
    assureDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteAssures
    assuresDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // assuresUpdateState
    assuresStatusUpdated: (state, action) => {
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
  }
});
