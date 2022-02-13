import React from "react";
import { Route } from "react-router-dom";
import { ApcisLoadingDialog } from "./apci-loading-dialog/ApciLoadingDialog";
import { ApcisCard } from "./ApciCard";
import { ApcisUIProvider } from "./ApciUIContext";
import { useIntl } from "react-intl";

export function ApcisPage({ history }) {
  const apcisUIEvents = {
    newApciButtonClick: () => {
      history.push("/staff/apcis/new");
    },
    openEditApciPage: (id) => {
      history.push(`/staff/apcis/${id}/edit`);
    },
    openDeleteApciDialog: (id) => {
      history.push(`/staff/apcis/${id}/delete`);
    },
    openDeleteApcisDialog: () => {
      history.push(`/staff/apcis/deleteApcis`);
    },
  };
  const intl = useIntl();

  return (
    <ApcisUIProvider apcisUIEvents={apcisUIEvents}>
      <ApcisLoadingDialog intl={intl}/>
      <ApcisCard intl={intl}/>
    </ApcisUIProvider>
  );
}
