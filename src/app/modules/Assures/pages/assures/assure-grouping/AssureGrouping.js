import React, { useMemo } from "react";
import { useAssuresUIContext } from "../AssureUIContext";

export function AssuresGrouping({intl}) {
  // Assures UI Context
  const assuresUIContext = useAssuresUIContext();
  const assuresUIProps = useMemo(() => {
    return {
      ids: assuresUIContext.ids,
      setIds: assuresUIContext.setIds,
      openDeleteAssuresDialog: assuresUIContext.openDeleteAssuresDialog,
    };
  }, [assuresUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  {intl.formatMessage({id: 'SELECTED_ELEMENT'})}: <b>{assuresUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={assuresUIProps.openDeleteAssuresDialog}
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
