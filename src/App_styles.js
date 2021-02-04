import styled from 'styled-components';

export const AppButtonAdd = styled.div`
    position:fixed;
    bottom: 20px;
    right:20px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: orange;
    &:after{
        content: '+';
        font-size: 2rem;
        line-height: normal;
        color: white;
        
        
    }
`;