
import {Chart as ChartJS
    , PolarAreaController
    , RadialLinearScale
    ,Title
    ,Tooltip
    ,Legend
    ,Filler
    , ArcElement} from "chart.js"

import { useMemo } from "react"

import Style from "./PolarGraph.module.css"

import { PolarArea } from "react-chartjs-2"

ChartJS.register(PolarAreaController
    ,RadialLinearScale
    ,Title
    ,Tooltip
    ,Legend
    ,Filler
    ,ArcElement)

export default function PolarGraph(event){

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
           radial:{
            grid:{
                color:"rgb(122, 122, 122)"
            }
           }
        }
    }
    const data = useMemo(function(){
        return {
            datasets: [
                {
                    label:"Ventas actuales",
                    data:ventas,
                    backgroundColor:["rgb(156, 156, 200)"],
                    color:"white"
                }
            ],labels
        }
    },[])

    return(
        <div className={Style.containerGraphic}>
            <div className={Style.graphic}>
             <PolarArea data={data} options={options}/>
            </div>
        </div>
    )
}