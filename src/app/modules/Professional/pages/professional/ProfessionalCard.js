import React, { useMemo, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ProfessionalsFilter } from "./professionals-filter/ProfessionalsFilter";
import { ProfessionalsTable } from "./professional-table/ProfessionalTable";
import { ProfessionalsGrouping } from "./professional-grouping/ProfessionalGrouping";
import { useProfessionalsUIContext } from "./ProfessionalUIContext";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/professionals/professionalsActions";
import "leaflet.heat";
import L from 'leaflet'
import { useLeafletContext } from '@react-leaflet/core'

function HeatMap({entities}) {
  const context = useLeafletContext()
  useEffect(() => {
    const container = context.layerContainer || context.map;
    container.eachLayer(function(layer) {
      //container.removeLayer(layer)
      if(layer.options.isHeat) {
        container.removeLayer(layer);
      }
    })
    const points = entities
    ? entities.map((p) => {
      return [p.longitude, p.latitude, 1]; // lat lng intensity
    })
    : [];
    L.heatLayer(points, {isHeat: true, gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}, radius: 25}).addTo(container);
  }, [entities]);
  return null;  
}


export function ProfessionalsCard({ intl }) {
  const professionalsUIContext = useProfessionalsUIContext();
  const professionalsUIProps = useMemo(() => {
    return {
      ids: professionalsUIContext.ids,
      queryParams: professionalsUIContext.queryParams,
      setQueryParams: professionalsUIContext.setQueryParams,
      newProfessionalButtonClick: professionalsUIContext.newProfessionalButtonClick,
      openDeleteProfessionalsDialog: professionalsUIContext.openDeleteProfessionalsDialog,
      openEditProfessionalPage: professionalsUIContext.openEditProfessionalPage,
      setIds: professionalsUIContext.setIds,
    };
  }, [professionalsUIContext]);


  const { currentState } = useSelector(
    (state) => ({ currentState: state.professionals }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  // Professionals Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    professionalsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchProfessionals(professionalsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [professionalsUIProps.queryParams, dispatch]);


  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: 'STAFF.PROFESSIONAL_LIST' })}>

      </CardHeader>
      <CardBody>
        <ProfessionalsFilter intl={intl} />
        {professionalsUIProps.ids.length > 0 && (
          <>
            <ProfessionalsGrouping intl={intl} />
          </>
        )}
        <div style={{display: 'flex'}}>
        <MapContainer style={{ height: '80vh', flex: .5, zIndex: 0 }} center={[35.5593013, 9.430487]} zoom={7} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <HeatMap entities={entities}/>
        </MapContainer>
        <ProfessionalsTable intl={intl} professionalsUIProps={professionalsUIProps} totalCount={totalCount} entities={entities} listLoading={listLoading} />
        </div>
      </CardBody>
    </Card>
  );
}
