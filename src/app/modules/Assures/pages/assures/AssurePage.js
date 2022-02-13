import React from "react";
import { Route } from "react-router-dom";
import { AssuresLoadingDialog } from "./assure-loading-dialog/AssureLoadingDialog";
import { AssuresCard } from "./AssureCard";
import { AssuresUIProvider } from "./AssureUIContext";
import { useIntl } from "react-intl";

export function AssuresPage({ history }) {
  const assuresUIEvents = {
    newAssureButtonClick: () => {
      history.push("/staff/assures/new");
    },
    openEditAssurePage: (id) => {
      history.push(`/staff/assures/${id}/edit`);
    },
    openDeleteAssureDialog: (id) => {
      history.push(`/staff/assures/${id}/delete`);
    },
    openDeleteAssuresDialog: () => {
      history.push(`/staff/assures/deleteAssures`);
    },
  };
  const intl = useIntl();

  return (
    <AssuresUIProvider assuresUIEvents={assuresUIEvents}>
      <AssuresLoadingDialog intl={intl}/>
      <AssuresCard intl={intl}/>
    </AssuresUIProvider>
  );
}
