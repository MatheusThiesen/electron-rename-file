import styled from 'styled-components'

export const Container = styled.header`
  width: 100%;
  margin-bottom: 20px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > h1 {
    font-size: 1.7rem;
    color: #fff;
    margin-bottom: 40px;
  }
`

export const ContainerCheck = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  height: 45px;
  max-width: 750px;

  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  overflow: hidden;

  button {
    border-radius: 0px;
    flex: 1;

    background: ${props => props.theme.colors.text};
    font-weight: bold;
    color: #333;
    font-size: 1rem;
  }

  button:first-child {
    border-right: 2px solid ${props => props.theme.colors.primary};
  }

  button:last-child {
    border-left: 2px solid ${props => props.theme.colors.primary};
  }

  .check {
    background: ${props => props.theme.colors.primary};
    color: #fff;
  }
`
