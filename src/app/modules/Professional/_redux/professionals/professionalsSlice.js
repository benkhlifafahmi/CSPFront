import {createSlice} from "@reduxjs/toolkit";

const initialProfessionalsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  professionalForEdit: undefined,
  lastError: null, 
  categories: [],
  govs: [],
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const professionalsSlice = createSlice({
  name: "professionals",
  initialState: initialProfessionalsState,
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
    // getProfessionalById
    professionalFetched: (state, action) => {
      state.actionsLoading = false;
      state.professionalForEdit = action.payload.professionalForEdit;
      state.error = null;
    },
    // findProfessionals
    professionalsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createProfessional
    professionalCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.professional);
    },
    // updateProfessional
    professionalUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.professional._id) {
          return action.payload.professional;
        }
        return entity;
      });
    },
    // deleteProfessional
    professionalDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteProfessionals
    professionalsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // professionalsUpdateState
    professionalsStatusUpdated: (state, action) => {
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
