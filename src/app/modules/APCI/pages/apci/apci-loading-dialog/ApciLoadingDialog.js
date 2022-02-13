import React, {useEffect} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {LoadingDialog} from "../../../../../../_metronic/_partials/controls";

export function ApcisLoadingDialog({intl}) {
  const { isLoading } = useSelector(
    state => ({ isLoading: state.apcis.listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text={intl.formatMessage({id: 'LOADING'})} />;
}
