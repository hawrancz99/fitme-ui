import styled from "styled-components";

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  /*margin-left: 60px;*/
`;

export const FooterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  font-size: 0.8rem;

  &:hover {
    color: #000000;
    transition: 300ms ease-in;
  }
`;

export const FooterHeading = styled.p`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
  text-align: center;
`;
