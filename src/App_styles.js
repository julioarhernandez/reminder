import styled from 'styled-components';

export const AppButtonAdd = styled.div`
    position: absolute;
    top: 37px;
    right: 15px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-family: monospace;
    z-index: 1;
    &:after{
        content: '+';
        font-size: 1.7rem;
        line-height: normal;
        color: white;
        font-weight: bold;
        
        
    }
`;