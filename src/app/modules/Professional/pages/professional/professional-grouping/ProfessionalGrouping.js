import React, { useMemo } from "react";
import { useProfessionalsUIContext } from "../ProfessionalUIContext";

export function ProfessionalsGrouping({intl}) {
  // Professionals UI Context
  const professionalsUIContext = useProfessionalsUIContext();
  const professionalsUIProps = useMemo(() => {
    return {
      ids: professionalsUIContext.ids,
      setIds: professionalsUIContext.setIds,
      openDeleteProfessionalsDialog: professionalsUIContext.openDeleteProfessionalsDialog,
    };
  }, [professionalsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  {intl.formatMessage({id: 'SELECTED_ELEMENT'})}: <b>{professionalsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={professionalsUIProps.openDeleteProfessionalsDialog}
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
