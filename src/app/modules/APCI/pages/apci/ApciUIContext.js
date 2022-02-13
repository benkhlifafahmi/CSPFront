import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ApciUIHelpers";

const ApcisUIContext = createContext();

export function useApcisUIContext() {
  return useContext(ApcisUIContext);
}

export const ApcisUIConsumer = ApcisUIContext.Consumer;

export function ApcisUIProvider({ apcisUIEvents, children }) {
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
    newApciButtonClick: apcisUIEvents.newApciButtonClick,
    openEditApciPage: apcisUIEvents.openEditApciPage,
    openDeleteApciDialog: apcisUIEvents.openDeleteApciDialog,
    openDeleteApcisDialog: apcisUIEvents.openDeleteApcisDialog,
    openUpdateApcisStatusDialog:
      apcisUIEvents.openUpdateApcisStatusDialog,
  };

  return (
    <ApcisUIContext.Provider value={value}>
      {children}
    </ApcisUIContext.Provider>
  );
}
