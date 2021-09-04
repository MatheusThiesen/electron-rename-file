import styled from 'styled-components'

export const Form = styled.form`
  width: 100%;
  padding: 10px;
  border-radius: 6px;

  max-width: 750px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  background-color: ${props => props.theme.colors.background};

  h3 {
    font-size: ${props => props.theme.sizes.largeFontSize};
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }

  .field {
    width: 100%;
    /* margin-top: 10px; */
    /* max-width: 360px; */
    margin-bottom: 1rem;
    height: 30px;

    position: relative;
    height: 48px;

    position: relative;

    label {
      position: absolute;
      left: 1rem;
      top: 0.9rem;
      padding: 0 0.25rem;
      background-color: ${props => props.theme.colors.background};
      color: #fff;
      font-size: ${props => props.theme.sizes.normalFontSize};
      transition: 0.2s;
    }

    & > button[type='button'] {
      right: 1rem;
      top: 0.7rem;
      position: absolute;
      z-index: 2;

      cursor: pointer;
      background-color: transparent;
      border: none;
      font-size: 1.5rem;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: ${props => props.theme.sizes.normalFontSize};
      border: 2px solid #fff;
      border-radius: 0.5rem;
      outline: none;
      padding: 1rem;
      background: none;
      z-index: 1;
      color: #fff;
    }

    input:focus + label {
      top: -0.4rem;
      left: 0.8rem;
      color: #fff;
      font-size: ${props => props.theme.sizes.smallFontSize};
      font-weight: 500;
      z-index: 10;
    }

    .active-label {
      top: -0.4rem;
      left: 0.8rem;
      color: #fff;
      font-size: ${props => props.theme.sizes.smallFontSize};
      font-weight: 500;
      z-index: 10;

      input:focus {
        border: 2px solid #fff;
      }
    }

    .active-label-error {
      top: -0.4rem;
      left: 0.8rem;
      color: #fff;
      font-size: ${props => props.theme.sizes.normalFontSize};
      font-weight: 500;
      z-index: 10;

      input:focus {
        border: 2px solid #d93025;
      }
    }

    .error-icon {
      position: absolute;

      top: 0.8rem;
      right: 0.8rem;

      svg {
        color: #d93025;
        width: 22px;
        height: 22px;
      }
    }

    .error-input {
      border: 2px solid #d93025;
    }

    input:not(:placeholder-shown) input:not(:focus) + input {
      top: -0.5rem;
      left: 0.8rem;
      font-size: ${props => props.theme.sizes.normalFontSize};
      font-weight: 500;
      z-index: 10;
    }
  }
`

export const Button = styled.button`
  /* max-width: 360px; */
  width: 100%;
  height: 72px;
  background: ${props => props.theme.colors.primary};
  border-radius: 8px;
  text-decoration: none;

  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 10px;

  span {
    display: block;
    background: rgba(0, 0, 0, 0.08);
    width: 72px;
    height: 72px;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    svg {
      color: #fff;
      width: 20px;
      height: 20px;
    }
  }

  strong {
    flex: 1;
    text-align: center;
    color: #fff;
    font-size: ${props => props.theme.sizes.normalFontSize};
  }

  transition: all 0.4s;

  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline-style: none;
  }
`

export const ContainerDropZone = styled.div`
  width: 100%;
`

export const ContainerPreviews = styled.ul`
  margin-top: 10px;
  width: 100%;

  display: flex;
  justify-content: flex-start;

  li {
    display: flex;
    align-items: center;

    width: 100%;
    display: flex;
    background: #fff;
    padding: 3px 3px;
    border-radius: 8px;

    img {
      height: 60px;
    }

    @media (max-width: 900px) {
      img {
        height: 40px;
        width: 40px;
      }
    }

    strong {
      word-break: break-all;
    }

    .fileInfo {
      color: ${props => props.theme.colors.background};

      margin-left: 5px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;

      div {
        display: flex;
        flex-direction: column;
        margin: 0 5px;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin-right: 10px;
        background: none;
        color: #f00;
      }
    }
  }
`

export const ErrorDropzone = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;

  span {
    margin-left: 4px;
  }
`
