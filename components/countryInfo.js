import styled, { keyframes } from 'styled-components';
import { FlexContainer, Title } from './utils/reusables';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

    
function numberWithCommas(value) {
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const headers = [
    { title: "Country", width: "40%", sortKey: "Country" },
    { title: "Total Cases", width: "30%", sortKey: "TotalConfirmed" },
    { title: "Total Deaths", width: "30%", sortKey: "TotalDeaths" },
]


const CountryInfo = ({ data }) => {


    const [ covidData, setCovidData ] = useState(data);
    const [ countryData, setCountryData ] = useState(null);
    const [ ascendSort, setAscendSort ] = useState(false);
    const [ targetCountry, setTargetCountry ] = useState(null);
    const [ rateToggle, setRateToggle ] = useState(true);

    function fetchCountryData(name) {
        const options = {
            method: 'GET',
            url: 'https://world-population.p.rapidapi.com/population',
            params: {country_name: `${name}`},
            headers: {
              'x-rapidapi-host': 'world-population.p.rapidapi.com',
              'x-rapidapi-key': 'dfce4cc668mshcb6bde10f5ac570p197726jsn0ea1052caa40'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
              setTargetCountry(response.data.body);
          }).catch(function (error) {
              console.error(error);
          });
    }
    
    function deathRate(a,b) {
        return `${((a/b)*100).toFixed(2)}%`;
    }
    function affectedRate(a,b) {
        return `${((a/b)*100).toFixed(2)}%`;
    }


    function sortKeyValue(sortKey) {
        const sortedData = [...covidData]
        sortedData.sort((a, b) => {
            const valueA = a[sortKey];
            const valueB = b[sortKey];
            if(ascendSort === false) {
                setAscendSort(true);
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
                return 0;
            } 
            else if(ascendSort === true) {
                setAscendSort(false);
                if (valueA < valueB) return 1;
                if (valueA > valueB) return -1;
                return 0;
            }
        });
        setCovidData(sortedData);
    }


    return (
        <FlexContainer responsive align="center" padding="2rem 0" margin="4rem auto">
            <Title direction="row"  borderRadius=".25rem .25rem 0 0">
                {
                    headers.map(({title, width, sortKey}) => {
                        return (
                            <h4 
                                style={{width:`${width}`}}
                                key={title}
                                onClick={() => sortKeyValue(sortKey)}
                            >
                                {title}
                            </h4>
                        )
                    })
                }
            </Title>
            {
                covidData.length > 0 && covidData.map( (data, index) => {
                    return (
                        <Countries 
                            key={data.CountryCode}
                        >
                            <FlexContainer
                                direction="row"
                                justify="space-between"
                                align="center"
                                id={data.Country}
                            >
                                <Header onClick={()=>fetchCountryData(data.Country)}>
                                    <span>{index + 1}.</span> {data.Country}</Header>
                                <Numbers>
                                    {numberWithCommas(data.TotalConfirmed)}
                                </Numbers>
                                <Numbers onClick={() => setRateToggle(x => !x)} style={{cursor: 'pointer'}}>
                                    {
                                        rateToggle ? 
                                        numberWithCommas(data.TotalDeaths) :
                                        deathRate(data.TotalDeaths, data.TotalConfirmed)
                                    }
                                </Numbers>
                            </FlexContainer>
                            {
                                targetCountry !== null && targetCountry.country_name === data.Country &&
                                <CountryDetails>
                                    <FlexContainer>
                                        <h3>
                                        {targetCountry.country_name}
                                        </h3>
                                        <div>
                                            Population: {numberWithCommas(targetCountry.population)}
                                        </div>
                                        <div>
                                            Covid Cases: {affectedRate(data.TotalConfirmed, targetCountry.population)}
                                        </div>
                                    </FlexContainer>
                                </CountryDetails>
                            }
                        </Countries>
                    )
                })
            }
        </FlexContainer>
    )
}

export default CountryInfo

const Countries = styled(FlexContainer)`
    background-color: var(--light-bg);
    margin-block: 0 .25rem;
    padding: .125rem .75rem;
    width: 100%;
    scroll-padding-block-start: 45rem;
    `

const Header = styled.h3`
    font-family: var(--font-main);
    font-size: .875rem;
    font-weight: 500;
    padding: .75rem;
    width: 40%;

    span {
        color: var(--grey60);
        text-decoration: none;
    }

    &:hover, &:active {
        color: var(--green110);
        cursor: pointer;
        filter: brightness(.9);
        text-decoration: underline;
    }

    
`
const Numbers = styled.div`
    color: var(--text-color-info);
    width: 30%;
    font-size: .875rem;
    text-align: center;
`
const entrance = keyframes`
    0% { opacity: 0; transform: translateY(1rem); }
    100% { opacity: 100%; transform: translateY(0); }
`
const CountryDetails = styled(FlexContainer)`
    margin: 0;
    padding-block: 0 1rem;
    padding-inline: 1rem;
    animation: ${entrance} .3s ease-in-out;
    
    h3 {
        color: var(--green100);
        font-size: 1.25rem;
        font-family: var(--font-alt-2);
    }
    div:not(h3) {
        color: var(--grey90);
        font-size: .875rem;
        padding-block: 1rem .25rem;
        padding-inline: 1rem 0;
    }

    @media only screen and (max-width: 48rem) {
        flex-direction: column;
    }
`