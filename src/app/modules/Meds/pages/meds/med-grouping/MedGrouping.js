import React, { useMemo } from "react";
import { useMedsUIContext } from "../MedUIContext";

export function MedsGrouping({intl}) {
  // Meds UI Context
  const medsUIContext = useMedsUIContext();
  const medsUIProps = useMemo(() => {
    return {
      ids: medsUIContext.ids,
      setIds: medsUIContext.setIds,
      openDeleteMedsDialog: medsUIContext.openDeleteMedsDialog,
    };
  }, [medsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  {intl.formatMessage({id: 'SELECTED_ELEMENT'})}: <b>{medsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={medsUIProps.openDeleteMedsDialog}
              >
                <i className="fa fa-trash"></i> {intl.formatMessage({id: 'DELETE_ALL'})}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
