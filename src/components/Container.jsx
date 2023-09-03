import { styled } from "styled-components";
import { node } from "prop-types";

const ContainerStyles = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: auto;
  padding: 1rem;
`;

const Container = ({ children }) => {
  return <ContainerStyles>{children}</ContainerStyles>;
};

Container.propTypes = {
  children: node,
};

export default Container;
