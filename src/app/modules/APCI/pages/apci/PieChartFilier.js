import React from 'react'
import Chart from 'react-apexcharts';
import { fetchBens, fetchFiliers, fetchNames } from "../../_redux/apcis/apcisActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
function PieChartFilier({ entries }) {

    const [options, setOptions] = React.useState({});
    const [series, setSeries] = React.useState([]);


    const { filiers } = useSelector(
        (state) => ({
            filiers: state.apcis.filiers,
        }),
        shallowEqual
    );


    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchFiliers());
    }, [dispatch]);

    const [labels, setLabels] = React.useState([]);

    React.useEffect(() => {
        if( filiers.length > 0 ) {
            setLabels(filiers.map(n => n.filDes));
        }
    }, [filiers]);

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
                const index = labels.indexOf(e.filiere);
                values[index]+= 1;
            }
            setSeries(values)
        }
    }, [entries, labels]);

    return (
        <Chart options={options} series={series} type="pie" />
    )
}

export default PieChartFilier