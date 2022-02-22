// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/assures/assuresActions";
import * as uiHelpers from "../AssureUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useAssuresUIContext } from "../AssureUIContext";

export function AssuresTable({intl, totalCount, entities, listLoading, assuresUIProps }) {

 
  // Table columns
  const columns = [
    {
      dataField: "ageAss",
      text: intl.formatMessage({id: 'ASSURES_AGE'}),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "sexeAss",
      text: intl.formatMessage({id: 'ASSURES_SEXE'}),
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.SexeFormatter
    },
    /*{
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAssurePage: assuresUIProps.openEditAssurePage,
        openDeleteAssureDialog: assuresUIProps.openDeleteAssureDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },*/
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: assuresUIProps.queryParams.pageSize,
    page: assuresUIProps.queryParams.pageNumber,
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
                csvExport 
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                keyField="_id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  assuresUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: assuresUIProps.ids,
                  setIds: assuresUIProps.setIds,
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
