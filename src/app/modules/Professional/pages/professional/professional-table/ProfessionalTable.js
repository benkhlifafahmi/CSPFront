// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/professionals/professionalsActions";
import * as uiHelpers from "../ProfessionalUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useProfessionalsUIContext } from "../ProfessionalUIContext";

export function ProfessionalsTable({intl, totalCount, entities, listLoading, professionalsUIProps }) {

 
  // Table columns
  const columns = [
    {
      dataField: "specialite",
      text: intl.formatMessage({id: 'PROFESSIONAL_SPECIALITY'}),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "type",
      text: intl.formatMessage({id: 'PROFESSIONAL_TYPE'}),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "conventionne",
      text: intl.formatMessage({id: 'PROFESSIONAL_CONV'}),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "categoriePrestataire",
      text: intl.formatMessage({id: 'PROFESSIONAL_CAT'}),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "dateActivationPaiement",
      text: intl.formatMessage({id: 'PROFESSIONAL_DAT_PAY'}),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "dateDebutConventionnement",
      text: intl.formatMessage({id: 'PROFESSIONAL_DAT_CONV'}),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      text: intl.formatMessage({id: 'PROFESSIONAL_ADDR'}),
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.AddressFormatter,
    },
    /*{
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditProfessionalPage: professionalsUIProps.openEditProfessionalPage,
        openDeleteProfessionalDialog: professionalsUIProps.openDeleteProfessionalDialog,
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
    sizePerPage: professionalsUIProps.queryParams.pageSize,
    page: professionalsUIProps.queryParams.pageNumber,
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
                  professionalsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: professionalsUIProps.ids,
                  setIds: professionalsUIProps.setIds,
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
