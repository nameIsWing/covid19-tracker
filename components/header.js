import styled from 'styled-components';
import { FlexContainer } from './utils/reusables';
import Image from 'next/image';
import { useState, useEffect } from 'react';


const Header = ( {data} ) => {

    const [ searchValue, setSearchValue ] = useState('');
    const [ globalValue ] = useState(data)

    function numberWithCommas(value) {
        return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    function search() {
        const elTarget = document.getElementById(`${searchValue.charAt(0).toUpperCase() + searchValue.slice(1)}`);
        elTarget?.children[0].click();
        setTimeout(()=>elTarget?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        }), 100)
        setSearchValue('');
    }

    useEffect(() => {
        window.onscroll = () => {
            const el = document.getElementById('main-header');
            if (window.scrollY > 348) {
                el.style.position = 'sticky';
                el.style.top = '-22rem';
            } else {
                el.style.position = 'relative';
                el.style.top = '0';
            }
        }
    }, [])

    

    return (
        <MainHeader id="main-header">
            <HeadNav responsive direction="row" align="center" justify="space-between">
                <FlexContainer width="50%">
                    <h2>COVID-19 Tracker</h2>
                </FlexContainer>
                <FlexContainer width="50%">
                    <h4>Updated as of: {globalValue.Date.substr(0, 16)}</h4>
                </FlexContainer>
            </HeadNav>
            <GlobalWrapper responsive={true} direction="row">
                <GlobalInfo>
                    <h2>
                        Global<br/>COVID-19<br/>Statistics
                    </h2>
                </GlobalInfo>
                <CasesWrapper>
                    <Cases 
                        title="Total Cases" 
                        data-new={`New Cases: ${numberWithCommas(globalValue.NewConfirmed)}`}
                    >
                        {numberWithCommas(globalValue.TotalConfirmed)}
                    </Cases>
                    <Cases 
                        title="Total Deaths" 
                        data-new={`New Deaths: ${numberWithCommas(globalValue.NewDeaths)}`}
                    >
                        {numberWithCommas(globalValue.TotalDeaths)}
                    </Cases>
                </CasesWrapper>
            </GlobalWrapper>
            <SearchBar responsive align="center">
                <SearchBarInput direction="row" align="center" height="100%">
                    <Image src="/icons/search.svg" width="24" height="24" />
                    <form onSubmit={ e => { e.preventDefault(); search()}}>
                        <input 
                            type="search" 
                            placeholder="Search by Country" 
                            onChange={ e => setSearchValue(e.target.value)} 
                            value={ searchValue }
                        />
                    </form>
                </SearchBarInput>
            </SearchBar>
        </MainHeader>
    )
}

export default Header

const MainHeader = styled(FlexContainer)`
    background: var(--gradient1);
    /* border-radius: 0 0 2rem 2rem; */
    height: 24rem;
    position: relative;
    background-size: cover;
    z-index: 99;
    `
const HeadNav = styled(FlexContainer)`
    z-index: 9;
    flex-grow: 0;

    h2{
        border-radius: .25rem;
        color: var(--white100);
        font-family: var(--font-main);
        font-size: 1.125rem;
        font-weight: 500;
        padding: .875rem;
        margin-block: .25rem;
        width: 100%;
    }
    h4{
        border-radius: .25rem;
        color: var(--green110);
        font-family: var(--font-main);
        font-size: .875rem;
        font-weight: 400;
        padding: .875rem;
        margin-block: .25rem;
        width: 100%;
        text-align: right;
    }
`
const GlobalWrapper = styled(FlexContainer)`
    overflow: hidden;
    @media only screen and (max-width: 32rem) {
            flex-direction: column;
        }
`
const GlobalInfo = styled(FlexContainer)`
    padding-inline: clamp(3rem, 15vw, 5rem);
    flex-grow: 1;
    width: 50%;

    @media only screen and (max-width: 32rem) {
            width: 100%;
        }
    
    h2{
        color: var(--green110);
        font-family: var(--font-alt-2);
        font-size: min(3rem, 8vw);
        opacity: .75;
        font-weight: 800;
    }
`
const CasesWrapper = styled(FlexContainer)`
    /* overflow: hidden;
    padding: 1.25rem .5rem; */
    @media only screen and (max-width: 32rem) {
            flex-direction: row;
            margin-inline: 1.75rem;
        }
`
const Cases = styled(FlexContainer)`
    color: var(--white90);
    font-size: 1.5rem;
    padding-block: 1rem;
    padding-inline: 2rem;
    position: relative;
    letter-spacing: .1rem;
    text-align: center;
    width: max-content;
    margin: 1.5rem auto;

    @media only screen and (max-width: 32rem) {
        margin: 0 auto;
        transform: scale(.92);
        }

    &::before {
        content: attr(title);
        color: var(--white100);
        font-size: .875rem;
        position: absolute;
        top: -1.375rem;
        left: -1rem;
        background: var(--green110);
        padding: .25rem .75rem;
        border-radius: .25rem;
    }
    &::after {
        content: attr(data-new);
        color: var(--green110);
        font-size: .875rem;
        position: absolute;
        bottom: -0.5rem;
        left: 0rem;
        background: transparent;
        padding: .25rem .75rem;
        border-radius: .25rem;
    }
`
const SearchBar = styled(FlexContainer)`
    padding-block: 2rem;
    position: absolute;
    bottom: -4rem;
    left: 50%;
    transform: translateX(-50%);
    `
const SearchBarInput = styled(FlexContainer)`
    background: var(--white100);
    box-shadow: 0 .25rem .75rem #1a5b5822;
    border: .125rem solid var(--green100);
    border-radius: 10rem;
    width: calc(100% - 5rem);
    padding-inline: 1.5rem;
    
    input {
        padding: 1rem 1.25rem;
        color: var(--green120);
        width: clamp(17rem, 60vw, 52rem);
        height: 100%;
        outline: none;
        border: none;
        font-size: 1.125rem;
        /* background: red; */
    }
`