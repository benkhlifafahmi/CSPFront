import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ProfessionalUIHelpers";

const ProfessionalsUIContext = createContext();

export function useProfessionalsUIContext() {
  return useContext(ProfessionalsUIContext);
}

export const ProfessionalsUIConsumer = ProfessionalsUIContext.Consumer;

export function ProfessionalsUIProvider({ professionalsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newProfessionalButtonClick: professionalsUIEvents.newProfessionalButtonClick,
    openEditProfessionalPage: professionalsUIEvents.openEditProfessionalPage,
    openDeleteProfessionalDialog: professionalsUIEvents.openDeleteProfessionalDialog,
    openDeleteProfessionalsDialog: professionalsUIEvents.openDeleteProfessionalsDialog,
    openUpdateProfessionalsStatusDialog:
      professionalsUIEvents.openUpdateProfessionalsStatusDialog,
  };

  return (
    <ProfessionalsUIContext.Provider value={value}>
      {children}
    </ProfessionalsUIContext.Provider>
  );
}
