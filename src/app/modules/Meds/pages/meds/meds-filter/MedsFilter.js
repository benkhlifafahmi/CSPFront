import React, { useMemo, useEffect } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useMedsUIContext } from "../MedUIContext";
import { fetchCategories, fetchGovs } from "../../../_redux/meds/medsActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const prepareFilter = (queryParams, values) => {
  const { category, gov } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  if (category) {
    filter.category = category;
  }
  if (gov) {
    filter.gov = gov;
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
  const { categories, govs } = useSelector(
    (state) => ({ 
      categories: state.meds.categories,
      govs: state.meds.govs,
    }),
    shallowEqual
  );
  // Meds Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchGovs());
  }, [dispatch]);
  return (
    <>
      <Formik
        initialValues={{
          gov: "",
          category: "",
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
                  name="category"
                  placeholder={intl.formatMessage({id:'PH_CATEGORY_FILTER'})}
                  onChange={(e) => {
                    setFieldValue("category", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.category}
                >
                  <option value="">{intl.formatMessage({id: 'PRO_ALL_CAT'})}</option>
                  {
                    (categories||[]).map(
                      category => (<option value={category}>{category}</option>)
                    )
                  }
                </select>
                <small className="form-text text-muted">
                  <b>{intl.formatMessage({id: 'PH_CATEGORY_FILTER'})}</b>
                </small>
              </div>
              <div className="col-lg-3">
                <select
                  className="form-control"
                  name="gov"
                  placeholder={intl.formatMessage({id:'PH_CATEGORY_FILTER'})}
                  onChange={(e) => {
                    setFieldValue("gov", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.gov}
                >
                  <option value="">{intl.formatMessage({id: 'PRO_ALL_CAT'})}</option>
                  {
                    (govs||[]).map(
                      gov => (<option value={gov}>{gov}</option>)
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
