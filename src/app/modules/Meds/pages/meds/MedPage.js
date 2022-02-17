import React from "react";
import { Route } from "react-router-dom";
import { MedsLoadingDialog } from "./med-loading-dialog/MedLoadingDialog";
import { MedsCard } from "./MedCard";
import { MedsUIProvider } from "./MedUIContext";
import { useIntl } from "react-intl";

export function MedsPage({ history }) {
  const medsUIEvents = {
    newMedButtonClick: () => {
      history.push("/staff/meds/new");
    },
    openEditMedPage: (id) => {
      history.push(`/staff/meds/${id}/edit`);
    },
    openDeleteMedDialog: (id) => {
      history.push(`/staff/meds/${id}/delete`);
    },
    openDeleteMedsDialog: () => {
      history.push(`/staff/meds/deleteMeds`);
    },
  };
  const intl = useIntl();

  return (
    <MedsUIProvider medsUIEvents={medsUIEvents}>
      <MedsLoadingDialog intl={intl}/>
      <MedsCard intl={intl}/>
    </MedsUIProvider>
  );
}
