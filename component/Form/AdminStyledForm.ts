import styled, { css } from 'styled-components'
type Props ={
    primary?: boolean
    flex?: boolean
    w?: boolean
  }
  export const WrapperForm = styled.div<Props>`
  ${props => props.flex && css` display:flex; flex-direction:column;`}
  margin:auto;
  `
  export const Input = styled.input<Props>`
  ${props => props.w && css`
  width:4rem;`}
  font-size:16px;
  `
  export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  `
  export const Button = styled.button`
  width: intrinsic;
  margin: 10px auto;
  background-color: #06d6a0;
  border: 1px solid transparent;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  transition: all 200ms;
  &:hover{
    background-color:#01a379;
  }
  
  ` 

  export const Label = styled.label`
  font-size: 1.25em;
  font-weight: 700;
  color: black;
  background-color:none;
  display: inline-block;
  text-align:center;
  &:hover{
    color:green;
    cursor:pointer;
    outline: 1px dotted #000;
}
  `
  export const InputFile = styled.input`
  height: 0.1px;
  opacity: 0;
  position: absolute;
  border: 10px solid blue;
  /* text-align: center; */
  accent-color: ;
  `