import { FlexContainer } from './utils/reusables';
import styled from 'styled-components';

const resources = [
    { name: 'COVID 19 API', link: 'http://www.covid19api.com'},
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
                                <a href={resource.link} rel="norefer" target="_blank">
                                {resource.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Resources>
            </FooterContent>
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.footer`
    background-color: var(--grey100);
    `
const FooterContent = styled(FlexContainer)`
    background-color: var(--grey100);
    height: 15rem;
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
    li {
        list-style: none;
        margin-bottom: .5rem;
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