import React, {useEffect} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {LoadingDialog} from "../../../../../../_metronic/_partials/controls";

export function AssuresLoadingDialog({intl}) {
  const { isLoading } = useSelector(
    state => ({ isLoading: state.assures.listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text={intl.formatMessage({id: 'LOADING'})} />;
}
