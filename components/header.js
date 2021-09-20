import styled from 'styled-components';
import { FlexContainer } from './utils/reusables';
import Image from 'next/image';
import { useState, useEffect } from 'react';


const Header = ( {data} ) => {

    const [ searchValue, setSearchValue ] = useState('');
    const [ globalValue, setGlobalValue ] = useState(data)

    function numberWithCommas(value) {
        return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    function search(e) {
        e.preventDefault();
        
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
            <HeadNav>
                <FlexContainer responsive={true}>
                    <h2>COVID-19 Tracker</h2>
                </FlexContainer>
            </HeadNav>
            <GlobalWrapper responsive={true} direction="row">
                <GlobalInfo>
                    <h2>
                        Global<br/>COVID-19<br/>Statistics
                    </h2>
                </GlobalInfo>
                <CasesWrapper justify="space-between">
                    <Cases title="Total Cases">
                        {numberWithCommas(globalValue.TotalConfirmed)}
                    </Cases>
                    <Cases title="Total Deaths">
                        {numberWithCommas(globalValue.TotalDeaths)}
                    </Cases>
                </CasesWrapper>
            </GlobalWrapper>
            <SearchBar responsive align="center">
                <SearchBarInput direction="row" align="center" height="100%">
                    <Image src="/icons/search.svg" width="24" height="24" />
                    <form action="submit" onSubmit={ e => search(e)}>
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
    border-radius: 0 0 2rem 2rem;
    height: 24rem;
    position: relative;
    background-size: cover;
    z-index: 99;
    `
const HeadNav = styled(FlexContainer)`
    z-index: 9;
    /* background-color: var(--green-1); */
    flex-grow: 0;

    h2{
        /* background-color: var(--green-1); */
        border-radius: .25rem;
        color: var(--white100);
        font-family: var(--font-alt-2);
        font-size: 1.125rem;
        font-weight: 600;
        padding: .875rem;
        margin-block: .25rem;
        width: 100%;
    }
`
const GlobalWrapper = styled(FlexContainer)`
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
    @media only screen and (max-width: 32rem) {
            flex-direction: row;
        }
`
const Cases = styled(FlexContainer)`
    padding: 1rem 2rem;
    border-radius: 0 2rem 2rem 2rem;
    background: linear-gradient(to top, #ffffff5e 0%, #ffffff3d 100%);
    position: relative;
    letter-spacing: .1rem;
    text-align: center;
    margin: 1.5rem auto;
    width: max-content;

    @media only screen and (max-width: 32rem) {
        margin: 1rem;
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
        border-radius: 1rem;
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
    border-radius: 10rem;
    width: 100%;
    width: calc(100% - 5rem);
    padding: 1rem 1.75rem;
    position: relative;
    
    input {
        color: var(--green120);
        width: 100%;
        outline: none;
        border: none;
        font-size: 1.125rem;
        padding-left: 1rem;
    }
`