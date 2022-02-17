import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./MedUIHelpers";

const MedsUIContext = createContext();

export function useMedsUIContext() {
  return useContext(MedsUIContext);
}

export const MedsUIConsumer = MedsUIContext.Consumer;

export function MedsUIProvider({ medsUIEvents, children }) {
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
    newMedButtonClick: medsUIEvents.newMedButtonClick,
    openEditMedPage: medsUIEvents.openEditMedPage,
    openDeleteMedDialog: medsUIEvents.openDeleteMedDialog,
    openDeleteMedsDialog: medsUIEvents.openDeleteMedsDialog,
    openUpdateMedsStatusDialog:
      medsUIEvents.openUpdateMedsStatusDialog,
  };

  return (
    <MedsUIContext.Provider value={value}>
      {children}
    </MedsUIContext.Provider>
  );
}
