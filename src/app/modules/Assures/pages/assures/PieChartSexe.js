import React from 'react'
import Chart from 'react-apexcharts';

function PieChartSexe({entries}) {

    const [options, setOptions] = React.useState({});
    const [series, setSeries] = React.useState([]);
    React.useEffect(() => {
        if (entries) {
            setOptions({
                chart: {
                  width: 380,
                  type: 'donut',
                },
                labels: ['Homme', 'Femme']
              });
              let labels = {'H': 0, 'F': 0}
              for(const e of entries) {
                  if (e.sexeAss == 2) {
                    labels['F']+=1;
                  } else {
                    labels['H']+=1;
                  }
              }
              setSeries([labels['H'], labels['F']])
        }
    }, [entries]);

  return (
    <Chart options={options} series={series} type="pie" width={380} />
  )
}

export default PieChartSexe