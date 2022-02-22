import React from 'react'
import Chart from 'react-apexcharts';
import { fetchBens, fetchFiliers, fetchNames } from "../../_redux/apcis/apcisActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
function PieChartAPCI({ entries }) {

    const [options, setOptions] = React.useState({});
    const [series, setSeries] = React.useState([]);


    const { names } = useSelector(
        (state) => ({
            names: state.apcis.names,
        }),
        shallowEqual
    );


    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchNames());
    }, [dispatch]);

    const [labels, setLabels] = React.useState([]);

    React.useEffect(() => {
        if( names.length > 0 ) {
            setLabels(names.map(n => n.apciName));
        }
    }, [names]);

    React.useEffect(() => {
        if (entries && labels.length > 0) {
            setOptions({
                chart: {
                    
                    type: 'donut',
                },
                labels,
            });
            let values = labels.map(m => 0);
            for (const e of entries) {
                const index = labels.indexOf(e.nom_apci);
                values[index]+= 1;
            }
            setSeries(values)
        }
    }, [entries, labels]);

    return (
        <Chart options={options} series={series} type="pie" />
    )
}

export default PieChartAPCI