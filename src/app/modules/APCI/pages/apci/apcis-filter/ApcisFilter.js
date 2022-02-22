import React, { useMemo, useEffect } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useApcisUIContext } from "../ApciUIContext";
import { fetchBens, fetchFiliers, fetchNames } from "../../../_redux/apcis/apcisActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Select from 'react-select';


const prepareFilter = (queryParams, values) => {
  const { names, bens, filiers } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  if (names) {
    filter.names = names;
  }
  if (bens) {
    filter.bens = bens;
  }
  if (filiers) {
    filter.filiers = filiers;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ApcisFilter({ listLoading, intl }) {
  // Apcis UI Context
  const apcisUIContext = useApcisUIContext();
  const apcisUIProps = useMemo(() => {
    return {
      setQueryParams: apcisUIContext.setQueryParams,
      queryParams: apcisUIContext.queryParams,
    };
  }, [apcisUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(apcisUIProps.queryParams, values);
    if (!isEqual(newQueryParams, apcisUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      apcisUIProps.setQueryParams(newQueryParams);
    }
  };
  const { bens, names, filiers } = useSelector(
    (state) => ({
      bens: state.apcis.bens,
      names: state.apcis.names,
      filiers: state.apcis.filiers,
    }),
    shallowEqual
  );
  // Apcis Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBens());
    dispatch(fetchNames());
    dispatch(fetchFiliers());
  }, [dispatch]);
  return (
    <>
      <Formik
        initialValues={{
          names: '',
          filiers: '',
          bens: '',
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-3">
                <select
                  className="form-control"
                  name="beneficiaire"
                  placeholder={intl.formatMessage({ id: 'PH_FILTER_BNF' })}
                  onChange={(e) => {
                    setFieldValue("bens", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.bens}
                >
                  <option value="">{intl.formatMessage({ id: 'ALL' })}</option>
                  {
                    (bens || []).map(
                      ben => (<option value={ben.filDes}>{ben.filDes}</option>)
                    )
                  }
                </select>
                <small className="form-text text-muted">
                  <b>{intl.formatMessage({ id: 'PH_FILTER_BEN' })}</b>
                </small>
              </div>
              <div className="col-lg-3">
                <select
                  className="form-control"
                  name="filiers"
                  placeholder={intl.formatMessage({ id: 'PH_FILTER_FIL' })}
                  onChange={(e) => {
                    setFieldValue("filiers", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.filiers}
                >
                  <option value="">{intl.formatMessage({ id: 'ALL' })}</option>
                  {
                    (filiers || []).map(
                      f => (<option value={f.filDes}>{f.filDes}</option>)
                    )
                  }
                </select>
                <small className="form-text text-muted">
                  <b>{intl.formatMessage({ id: 'PH_FILTER_FIL' })}</b>
                </small>
              </div>
              <div className="col-lg-3">
                <select
                  className="form-control"
                  name="names"
                  placeholder={intl.formatMessage({ id: 'PH_FILTER_ACPI' })}
                  onChange={(e) => {
                    setFieldValue("names", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.names}
                >
                  <option value="">{intl.formatMessage({ id: 'ALL' })}</option>
                  {
                    (names || []).map(
                      n => (<option value={n.apciName}>{n.apciName}</option>)
                    )
                  }
                </select>
                <small className="form-text text-muted">
                  <b>{intl.formatMessage({ id: 'PH_FILTER_ACPI' })}</b>
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
