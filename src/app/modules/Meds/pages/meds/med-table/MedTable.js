// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/meds/medsActions";
import * as uiHelpers from "../MedUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useMedsUIContext } from "../MedUIContext";

export function MedsTable({intl, totalCount, entities, listLoading, medsUIProps }) {

 
  // Table columns
  const columns = [
    {
      dataField: "name",
      text: intl.formatMessage({id: 'NAME'}),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "tel",
      text: intl.formatMessage({id: 'PHONE'}),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "speciality",
      text: intl.formatMessage({id: 'SPECIALITY'}),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "description",
      text: intl.formatMessage({id: 'DESC'}),
      sort: true,
      sortCaret: sortCaret,
    }
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: medsUIProps.queryParams.pageSize,
    page: medsUIProps.queryParams.pageNumber,
  };
  return (
    <div style={{flex: 1}}>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                keyField="_id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  medsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: medsUIProps.ids,
                  setIds: medsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </div>
  );
}
