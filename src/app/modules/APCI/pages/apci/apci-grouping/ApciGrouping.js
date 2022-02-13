import React, { useMemo } from "react";
import { useApcisUIContext } from "../ApciUIContext";

export function ApcisGrouping({intl}) {
  // Apcis UI Context
  const apcisUIContext = useApcisUIContext();
  const apcisUIProps = useMemo(() => {
    return {
      ids: apcisUIContext.ids,
      setIds: apcisUIContext.setIds,
      openDeleteApcisDialog: apcisUIContext.openDeleteApcisDialog,
    };
  }, [apcisUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  {intl.formatMessage({id: 'SELECTED_ELEMENT'})}: <b>{apcisUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={apcisUIProps.openDeleteApcisDialog}
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
