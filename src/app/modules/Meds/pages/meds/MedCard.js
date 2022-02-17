import React, { useMemo, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { MedsFilter } from "./meds-filter/MedsFilter";
import { MedsTable } from "./med-table/MedTable";
import { MedsGrouping } from "./med-grouping/MedGrouping";
import { useMedsUIContext } from "./MedUIContext";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/meds/medsActions";
import "leaflet.heat";
import L from 'leaflet'
import { useLeafletContext } from '@react-leaflet/core'

function HeatMap({entities}) {
  const context = useLeafletContext()
  useEffect(() => {
    console.log(entities);
    const container = context.layerContainer || context.map;
    container.eachLayer(function(layer) {
      //container.removeLayer(layer)
      if(layer.options.isHeat) {
        container.removeLayer(layer);
      }
    })
    const points = entities !== null
    ? entities.map((p) => {
      return [p.longitude, p.latitude, 1]; // lat lng intensity
    }).filter(p => p[0] !== null && p[1] !== null)
    : [];
    if (container && points.length > 0) {
      L.heatLayer(points, {isHeat: true, gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}, radius: 25}).addTo(container);
    }
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
    }).filter(p => p[0] !== null && p[1] !== null)
    : [];
    
    const markers =L.markerClusterGroup({isCluster: true});

    for(const point of points) {
      markers.addLayer(L.marker(point));
    }

    container.addLayer(markers);

  }, [entities]);
  return null;  
}

export function MedsCard({ intl }) {
  const medsUIContext = useMedsUIContext();
  const medsUIProps = useMemo(() => {
    return {
      ids: medsUIContext.ids,
      queryParams: medsUIContext.queryParams,
      setQueryParams: medsUIContext.setQueryParams,
      newMedButtonClick: medsUIContext.newMedButtonClick,
      openDeleteMedsDialog: medsUIContext.openDeleteMedsDialog,
      openEditMedPage: medsUIContext.openEditMedPage,
      setIds: medsUIContext.setIds,
    };
  }, [medsUIContext]);


  const { currentState } = useSelector(
    (state) => ({ currentState: state.meds }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  // Meds Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    medsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchMeds(medsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medsUIProps.queryParams, dispatch]);


  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: 'STAFF.PROFESSIONAL_LIST' })}>

      </CardHeader>
      <CardBody>
        <MedsFilter intl={intl} />
        {medsUIProps.ids.length > 0 && (
          <>
            <MedsGrouping intl={intl} />
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
        <MedsTable intl={intl} medsUIProps={medsUIProps} totalCount={totalCount} entities={entities} listLoading={listLoading} />
        </div>
      </CardBody>
    </Card>
  );
}
