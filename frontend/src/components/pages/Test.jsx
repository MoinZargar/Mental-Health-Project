import React from "react";
import Card from '../Card.jsx'
import Container from "../Container/Container.jsx";
function Test(){
    return(
        <div className="container mx-auto mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16">
        <Card children="Take Depression Test" url='/tests/depression' title="Depression Test" content="For people experiencing overwhelming sadness or despair, low energy, or negative self-image"/>
        <Card children="Take Anxiety Test" url='/tests/anxiety' title="Anxiety Test" content="For people experiencing extreme worry, fear, nervousness, and restlessness that affects their ability to function day to day."/>
        <Card children="Take Bipolar Test" url='/tests/bipolar'title="Bipolar Test" content="For people experiencing extreme mood swings or unusual shifts in mood and energy, such as feeling irritated or agitated."/>
        <Card children="Take Schizophrenia Test" url='/tests/schizophrenia' title="Schizophrenia Test" content="For people who feel like their brain is playing tricks on them (seeing, hearing, or believing things that don't seem real or quite right)"/>
        </div>
      </div>
  
    )
}
export default Test