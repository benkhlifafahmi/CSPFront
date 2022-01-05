import React from "react";
import { Route } from "react-router-dom";
import { ProfessionalsLoadingDialog } from "./professional-loading-dialog/ProfessionalLoadingDialog";
import { ProfessionalsCard } from "./ProfessionalCard";
import { ProfessionalsUIProvider } from "./ProfessionalUIContext";
import { useIntl } from "react-intl";

export function ProfessionalsPage({ history }) {
  const professionalsUIEvents = {
    newProfessionalButtonClick: () => {
      history.push("/staff/professionals/new");
    },
    openEditProfessionalPage: (id) => {
      history.push(`/staff/professionals/${id}/edit`);
    },
    openDeleteProfessionalDialog: (id) => {
      history.push(`/staff/professionals/${id}/delete`);
    },
    openDeleteProfessionalsDialog: () => {
      history.push(`/staff/professionals/deleteProfessionals`);
    },
  };
  const intl = useIntl();

  return (
    <ProfessionalsUIProvider professionalsUIEvents={professionalsUIEvents}>
      <ProfessionalsLoadingDialog intl={intl}/>
      <ProfessionalsCard intl={intl}/>
    </ProfessionalsUIProvider>
  );
}
