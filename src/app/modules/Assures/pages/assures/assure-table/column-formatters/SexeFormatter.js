/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export const SexeFormatter = (
  cellContent,
  row,
  rowIndex,
) => (
  <>
    <p>{row.sexeAss == 2 ? 'Femme' : 'Homme'}</p>
  </>
);
