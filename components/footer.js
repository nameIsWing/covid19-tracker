import { FlexContainer } from './utils/reusables';
import styled from 'styled-components';
import Image from 'next/image';

const resources = [
    { name: 'COVID 19 API', link: 'https://www.covid19api.com'},
    { name: 'Rapid API: World Population', link: 'https://rapidapi.com/search/world%20population'},
]

const Footer = () => {
    return (
        <FooterContainer >
            <FooterContent direction="row" responsive>
                <AppName>
                    <h4>
                        COVID-19 Tracker
                    </h4>
                </AppName>
                <Resources>
                    <h3>
                        Resources
                    </h3>
                    <ul>
                        {resources.map(resource => (
                            <li key={resource.name}>
                                <a 
                                    href={resource.link} 
                                    rel="noreferrer" 
                                    target="_blank"
                                >
                                {resource.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Resources>
            </FooterContent>
            <PoweredBy responsive direction="row" align="center">
                <h4>Powered by:</h4>
                <Image src="/icons/reactjs.svg" height="32" width="32"/>
                &nbsp;&nbsp;&nbsp;
                <Image src="/icons/nextjs.svg" height="48" width="48"/>
                &nbsp;&nbsp;&nbsp;
                <Image src="/icons/vercel.svg" height="62" width="62"/>
            </PoweredBy>
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.footer`
    background-color: var(--grey100);
    position: relative;
    width: 100%;

    /* &::before {
        content: '';
        position: absolute;
        top: -2rem;
        left: 0;
        width: 100%;
        height: 2rem;
        background-color: inherit;
    }
    &::after {
        content: '';
        position: absolute;
        top: -4rem;
        left: 0;
        width: 100%;
        height: 4rem;
        background-color: white;
        border-radius: 10rem;
    } */
`
const FooterContent = styled(FlexContainer)`
    background-color: var(--grey100);
    
    padding: 1.5rem 2rem;

    @media only screen and (max-width: 36rem) {
        flex-direction: column;
        justify-content: space-between;
    }
`
const AppName = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    
    h4 {
        font-family : var(--font-alt-2);
        color: var(--white90);
        font-size: 1rem;
        font-weight: 700;
    }

    @media only screen and (max-width: 36rem) {
        width: 100%;
        align-items: center;
        padding-block: .5rem 2rem;
    }
    `
const Resources = styled.div`
    width: 50%;
    
    h3 {
        color: var(--white90);
        font-family : var(--font-alt-2);
        font-size: 1rem;

        @media only screen and (max-width: 36rem) {
            text-align: center;
        }
    }
    ul {
        margin-inline: 0;
        padding: 0;
    }
    li {
        list-style: none;
        margin-bottom: .5rem;
        @media only screen and (max-width: 36rem) {
        text-align: center;
    }
    }
    a {
        font-size: .875rem;
        color: var(--grey50);
    }
    a:hover {
        text-decoration: underline;
        color: var(--white90);
    }

    @media only screen and (max-width: 36rem) {
        width: 70%;
        margin: auto
    }
`
const PoweredBy = styled(FlexContainer)`
    /* background-color: var(--grey90); */
    padding: 1rem .5rem;
    position: relative;
    color: var(--grey70);
    font-weight: 700;
    justify-content: center;

    h4 {
        display: inline-block;
        color: var(--grey70);
        margin-right: 1rem;
    }
    img {
        margin-left: .5rem;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: .0625rem;
        background-color: var(--grey70);
    }
`