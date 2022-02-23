import styled from "@emotion/styled";

export const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;
  @media (max-width: 600px) {
    width: 300px;
  }

  .cart-manage {
    display: flex;
    justify-content: space-between;
  }
`;