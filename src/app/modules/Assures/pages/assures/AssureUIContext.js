import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./AssureUIHelpers";

const AssuresUIContext = createContext();

export function useAssuresUIContext() {
  return useContext(AssuresUIContext);
}

export const AssuresUIConsumer = AssuresUIContext.Consumer;

export function AssuresUIProvider({ assuresUIEvents, children }) {
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
    newAssureButtonClick: assuresUIEvents.newAssureButtonClick,
    openEditAssurePage: assuresUIEvents.openEditAssurePage,
    openDeleteAssureDialog: assuresUIEvents.openDeleteAssureDialog,
    openDeleteAssuresDialog: assuresUIEvents.openDeleteAssuresDialog,
    openUpdateAssuresStatusDialog:
      assuresUIEvents.openUpdateAssuresStatusDialog,
  };

  return (
    <AssuresUIContext.Provider value={value}>
      {children}
    </AssuresUIContext.Provider>
  );
}
