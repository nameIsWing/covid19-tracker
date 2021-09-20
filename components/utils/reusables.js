import styled from 'styled-components';

export const FlexContainer = styled.div`
    display: flex;
    border-radius: ${props => props.borderRadius};
    flex-direction: ${props => props.direction || 'column'};
    justify-content: ${props => props.justify || 'flex-start'};
    align-items: ${props => props.align || 'flex-start'};
    flex-wrap: ${props => props.wrap || 'nowrap'};
    flex-grow: ${props => props.grow || '1'};
    flex-shrink: ${props => props.shrink || '1'};
    flex-basis: ${props => props.basis || 'auto'};
    margin: ${props => props.margin || '0 auto'};
    padding: ${props => props.padding || '0'};
    width: ${props => props.width || '100%'};
    height: ${props => props.height || 'auto'};

    ${ props => {
        if(props.responsive) {
            return `
                @media only screen and (min-width: 48rem) {
                    width: min(80vw, 48rem);
                }
                @media only screen and (min-width: 64rem) {
                    width: min(75vw, 64rem);
                }
            `
        }
    }}
`


// for Title header
export const Title = styled(FlexContainer)`
    border-radius: 1rem 1rem 0 0;
    overflow: hidden;

    h4 {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--green100);
        color: var(--white100);
        font-size: 1rem;
        font-family: var(--font-main);
        font-weight: 500;
        margin: 0;
        text-align: center;
        padding: .75rem 0;

        &:hover {
            filter: brightness(.95);
            cursor: pointer;
        }
        &:active {
            filter: brightness(1);
        }
        @media only screen and (max-width: 24rem) {
            font-size: .875rem;
        }
    }
    h4:first-child {
        padding-inline: 1.25rem 0;
    }
`