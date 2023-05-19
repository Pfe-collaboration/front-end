import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import tw from "twin.macro";
const Container = tw.div`mt-16 `;
const Donutchart = ({ collab, Quantities, Farmers }) => {
  const [chartWidth, setChartWidth] = useState(700); // Initial width of the chart

  useEffect(() => {
    const handleResize = () => {
      // Calculate the new width based on the screen size
      const newWidth = window.innerWidth >= 768 ? 700 : 400;
      setChartWidth(newWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Container>
      <React.Fragment>
        <Chart
          className="w-full max-w-lg sm:max-w-xl md:max-w-2xl"
          type="donut"
          height={300}
          width={chartWidth}
          series={Quantities || null}
          options={{
            labels: Farmers || null,
            //  title:{
            //     text:"collaborators",
            //    align:"center",
            //  },

            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    total: {
                      show: true,
                      showAlways: false,
                      //formatter: () => '343',
                      //formatter: (value) => `${value.value} Kg`,
                      fontSize: 30,
                      color: "#f90000",
                    },
                  },
                },
              },
            },

            dataLabels: {
              enabled: true,
              label: "done",
            },
          }}
        />
      </React.Fragment>
    </Container>
  );
};
export default Donutchart;
