import React from 'react'
import Chart from 'react-apexcharts';

function PieChartAge({entries}) {

    const [options, setOptions] = React.useState({});
    const [series, setSeries] = React.useState([]);
    React.useEffect(() => {
        if (entries) {
            let data = {'0-10': 0, '11-25': 0, '26-50': 0, '50+': 0}
            for(const e of entries) {
                if (e.age < 11) {
                    data['0-10']+=1;
                } else if (e.age < 25) {
                    data['11-25']+=1;
                } else if (e.age < 50) {
                    data['26-50']+=1;
                } else {
                    data['50+']+=1;
                }
            }
            
            setOptions({
                chart: {
                  width: 380,
                  type: 'donut',
                },
                labels: ['0-10', '11-25', '26-50', '50+']
              });
              
              setSeries([data['0-10'], data['11-25'], data['26-50'], data['50+']])
        }
    }, [entries]);

  return (
    <Chart options={options} series={series} type="pie" width={380} />
  )
}

export default PieChartAge