import styled from 'styled-components';

export const AppButtonAdd = styled.div`
    position: absolute;
    top: 78px;
    right: 15px;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-family: monospace;
    z-index: 1;
    box-shadow: -1px 0px 14px 0px rgba(0, 0, 0, 0.4);
    &:after{
        content: '+';
        font-size: 1.7rem;
        line-height: normal;
        color: white;
        font-weight: bold;
        
        
    }
`;