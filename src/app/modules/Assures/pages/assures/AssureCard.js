import React, { useMemo, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { AssuresFilter } from "./assures-filter/AssuresFilter";
import { AssuresTable } from "./assure-table/AssureTable";
import { AssuresGrouping } from "./assure-grouping/AssureGrouping";
import { useAssuresUIContext } from "./AssureUIContext";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/assures/assuresActions";
import "leaflet.heat";
import L from 'leaflet'
import { useLeafletContext } from '@react-leaflet/core'
import MarkerClusterGroup from 'react-leaflet-cluster'

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
    }).filter(p => p[0] !=null && p[1] !== null)
    : [];
    console.log('points: ', points)
    L.heatLayer(points, {isHeat: true, gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}, radius: 25}).addTo(container);
  }, [entities]);
  return null;  
}


function ClusterMap({entities}) {
  const context = useLeafletContext()
  useEffect(() => {
    const container = context.layerContainer || context.map;
    container.eachLayer(function(layer) {
      //container.removeLayer(layer)
      if(layer.options.isCluster) {
        container.removeLayer(layer);
      }
    })
    const points = entities
    ? entities.map((p) => {
      return [p.longitude, p.latitude]; // lat lng intensity
    }).filter(p => p[0] !=null && p[1] !== null)
    : [];
    
    const markers =L.markerClusterGroup({isCluster: true});

    for(const point of points) {
      markers.addLayer(L.marker(point));
    }

    container.addLayer(markers);

  }, [entities]);
  return null;  
}

export function AssuresCard({ intl }) {
  const assuresUIContext = useAssuresUIContext();
  const assuresUIProps = useMemo(() => {
    return {
      ids: assuresUIContext.ids,
      queryParams: assuresUIContext.queryParams,
      setQueryParams: assuresUIContext.setQueryParams,
      newAssureButtonClick: assuresUIContext.newAssureButtonClick,
      openDeleteAssuresDialog: assuresUIContext.openDeleteAssuresDialog,
      openEditAssurePage: assuresUIContext.openEditAssurePage,
      setIds: assuresUIContext.setIds,
    };
  }, [assuresUIContext]);


  const { currentState } = useSelector(
    (state) => ({ currentState: state.assures }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  // Assures Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    assuresUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchAssures(assuresUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assuresUIProps.queryParams, dispatch]);


  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: 'STAFF.PROFESSIONAL_LIST' })}>

      </CardHeader>
      <CardBody>
        <AssuresFilter intl={intl} />
        {assuresUIProps.ids.length > 0 && (
          <>
            <AssuresGrouping intl={intl} />
          </>
        )}
        <div style={{display: 'flex'}}>
        <MapContainer style={{ height: '80vh', flex: .5, zIndex: 0 }} center={[35.5593013, 9.430487]} zoom={7} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <HeatMap entities={entities}/>
          <ClusterMap entities={entities} />

        </MapContainer>
        <AssuresTable intl={intl} assuresUIProps={assuresUIProps} totalCount={totalCount} entities={entities} listLoading={listLoading} />
        </div>
      </CardBody>
    </Card>
  );
}
