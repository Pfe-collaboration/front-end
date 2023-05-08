import React ,{useState, useEffect}from "react";
import Chart from 'react-apexcharts';
import tw from "twin.macro"
const Container = tw.div`mt-16 `
const Donutchart=()=>
{
    // const [contryname, setCountryname]= useState([]);
    // const [medal, setMedal]= useState([]);

    // useEffect( ()=>{
    //  const getdata= async()=>{
    //       const countryname=[];
    //       const getmedal=[];

    //     const reqData= await fetch("http://localhost/reactgraphtutorial/medals"); 
    //     const resData= await reqData.json();
    //     for(let i=0; i<resData.length; i++)
    //     {
    //         countryname.push(resData[i].country);
    //         getmedal.push(parseInt(resData[i].medals));
    //     }
    //     setCountryname(countryname);
    //     setMedal(getmedal);
     

    //  }
    //  getdata();
    // },[]);

    return(
        <Container>

        <React.Fragment>
                    
            <Chart 
            type="donut"
            width={700}
            height={ 300}
            series={[41,12,15,9]}

            options={{
             labels:["Belgacem","Mahmoud","Masoud","Fadhel"],
            //  title:{
            //     text:"collaborators",
            //    align:"center",
            //  },

             plotOptions:{
             pie:{
                donut:{
                    labels:{
                        show:true,
                        total:{
                            show:true,
                            showAlways:false,
                             //formatter: () => '343',
                             //formatter: (value) => `${value.value} Kg`,
                            fontSize:30,
                            color: '#f90000',
                        }
                    }
                    
                }
             }

             },

             dataLabels:{
                enabled:true,
                label: "done"
             }


            }}
            
            />

            
        </React.Fragment>
        </Container>

    );
}
export default Donutchart;