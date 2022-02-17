import {createSlice} from "@reduxjs/toolkit";

const initialMedsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  medForEdit: undefined,
  lastError: null, 
  categories: [],
  specialities: [],
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const medsSlice = createSlice({
  name: "meds",
  initialState: initialMedsState,
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
    // getMedById
    medFetched: (state, action) => {
      state.actionsLoading = false;
      state.medForEdit = action.payload.medForEdit;
      state.error = null;
    },
    // findMeds
    medsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMed
    medCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.med);
    },
    // updateMed
    medUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.med._id) {
          return action.payload.med;
        }
        return entity;
      });
    },
    // deleteMed
    medDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteMeds
    medsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // medsUpdateState
    medsStatusUpdated: (state, action) => {
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
    specFetched: (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.specialities = entities;
    },
  }
});
