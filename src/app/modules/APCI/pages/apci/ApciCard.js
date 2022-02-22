import React, { useMemo, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ApcisFilter } from "./apcis-filter/ApcisFilter";
import { ApcisTable } from "./apci-table/ApciTable";
import { ApcisGrouping } from "./apci-grouping/ApciGrouping";
import { useApcisUIContext } from "./ApciUIContext";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/apcis/apcisActions";
import "leaflet.heat";
import L from 'leaflet'
import { useLeafletContext } from '@react-leaflet/core'
import MarkerClusterGroup from 'react-leaflet-cluster'
import PieChartAPCI from "./PieCharAPCI";
import PieChartAge from "./PieChartAge";
import PieChartFilier from './PieChartFilier';
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
    }).filter(p => p[0] && p[1])
    : [];
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
      return  [p.longitude, p.latitude]; // lat lng intensity
    }).filter(p => p[0] && p[1])
    : [];
    
    const markers =L.markerClusterGroup({isCluster: true});

    for(const point of points) {
      markers.addLayer(L.marker(point));
    }

    container.addLayer(markers);

  }, [entities]);
  return null;  
}

export function ApcisCard({ intl }) {
  const apcisUIContext = useApcisUIContext();
  const apcisUIProps = useMemo(() => {
    return {
      ids: apcisUIContext.ids,
      queryParams: apcisUIContext.queryParams,
      setQueryParams: apcisUIContext.setQueryParams,
      newApciButtonClick: apcisUIContext.newApciButtonClick,
      openDeleteApcisDialog: apcisUIContext.openDeleteApcisDialog,
      openEditApciPage: apcisUIContext.openEditApciPage,
      setIds: apcisUIContext.setIds,
    };
  }, [apcisUIContext]);


  const { currentState } = useSelector(
    (state) => ({ currentState: state.apcis }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  // Apcis Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    apcisUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchApcis(apcisUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apcisUIProps.queryParams, dispatch]);


  return (
    <div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <Card>
            <CardHeader title={intl.formatMessage({ id: 'STATS_APCI' })}>
            </CardHeader>
            <CardBody>
              <PieChartAPCI entries={entities} />
            </CardBody>
          </Card>
        </div>
        <div class="col-md-3 col-sm-12">
          <Card>
            <CardHeader title={intl.formatMessage({ id: 'STATS_APCI_AGE_LIST' })}>
            </CardHeader>
            <CardBody>
              <PieChartAge entries={entities} />
            </CardBody>
          </Card>
        </div>
        <div class="col-md-3 col-sm-12">
          <Card>
            <CardHeader title={intl.formatMessage({ id: 'STATS_APCI_FILIER_LIST' })}>
            </CardHeader>
            <CardBody>
              <PieChartFilier entries={entities} />
            </CardBody>
          </Card>
        </div>
        
      </div>
      <Card>
        <CardHeader title={intl.formatMessage({ id: 'APCI_LIST' })}>

        </CardHeader>
        <CardBody>
          <ApcisFilter intl={intl} />
          {apcisUIProps.ids.length > 0 && (
            <>
              <ApcisGrouping intl={intl} />
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
          <ApcisTable intl={intl} apcisUIProps={apcisUIProps} totalCount={totalCount} entities={entities} listLoading={listLoading} />
          </div>
        </CardBody>
      </Card>
    </div>
    
  );
}
