import styled from "styled-components"

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
`
export const LoadingPage = () => {
  return (
    <LoadingContainer>
      <img src="/assets/img-loading-page.gif" alt="loading" />
    </LoadingContainer>
  )
}