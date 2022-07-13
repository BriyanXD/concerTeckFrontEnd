//grafico de barra
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js"

import { useMemo } from "react"

import Style from "./BarGraph.module.css"

import { Bar } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default function BarGraph(event){

    const {
        stockGeneral
        ,stockGeneralLateral
        ,stockPalco
        ,stockStreaming
        ,stockkVIP} = event.event.stock;

    const {maxStockGeneral
        ,maxStockGeneralLateral
        ,maxStockPalco
        ,maxStockStreaming
        ,maxStockVIP
        ,minStock
        ,isBigEvent} = event.event.venue
    const ventas = [(maxStockPalco-stockPalco)
                        ,(maxStockGeneral-stockGeneral),
                        (maxStockGeneralLateral-stockGeneralLateral),
                        (maxStockStreaming-stockStreaming),
                        (maxStockVIP-stockkVIP),]
    const maxVentas = [(maxStockPalco)
                    ,(maxStockGeneral),
                    (maxStockGeneralLateral),
                    (maxStockStreaming),
                    (maxStockVIP),]
const labels = ["Palco","General","Leteral","Streaming","VIP"]

    const options ={
        responsive: true,
        scales:{
            y:{
                beginAtZero:true
            }
        }
    }
    const data = useMemo(function(){
        return {
            datasets: [
                {
                    label:"Ventas actuales",
                    data:ventas,
                    backgroundColor:["rgb(156, 156, 156)","rgb(156, 156, 200)"],
                    color:"white"
                },
                {
                    label:"Capacidad Maxima",
                    data:maxVentas,
                    backgroundColor:"wheat",
                    color:"white"
                }
            ],labels
        }
    },[])

    return(
        <div className={Style.containerGraphic}>
            <div className={Style.graphic}>
             <Bar data={data} options={options}/>
            </div>
        </div>
    )
}