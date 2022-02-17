import React, { useMemo, useEffect } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useMedsUIContext } from "../MedUIContext";
import { fetchSpec } from "../../../_redux/meds/medsActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const prepareFilter = (queryParams, values) => {
  const { speciality } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  if (speciality) {
    filter.speciality = speciality;
  }

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function MedsFilter({ listLoading, intl }) {
  // Meds UI Context
  const medsUIContext = useMedsUIContext();
  const medsUIProps = useMemo(() => {
    return {
      setQueryParams: medsUIContext.setQueryParams,
      queryParams: medsUIContext.queryParams,
    };
  }, [medsUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(medsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, medsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      medsUIProps.setQueryParams(newQueryParams);
    }
  };
  const { specialities } = useSelector(
    (state) => ({ 
      specialities: state.meds.specialities,
    }),
    shallowEqual
  );
  // Meds Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSpec());
  }, [dispatch]);
  return (
    <>
      <Formik
        initialValues={{
          speciality: ""
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
                  name="speciality"
                  placeholder={intl.formatMessage({id:'PH_CATEGORY_FILTER'})}
                  onChange={(e) => {
                    setFieldValue("speciality", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.speciality}
                >
                  <option value="">{intl.formatMessage({id: 'PRO_ALL_CAT'})}</option>
                  {
                    (specialities||[]).map(
                      speciality => (<option value={speciality}>{speciality}</option>)
                    )
                  }
                </select>
                <small className="form-text text-muted">
                  <b>{intl.formatMessage({id: 'PH_CATEGORY_FILTER'})}</b>
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
