import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Layout from "./Layout";

const Main = () => {
  return (
    <Layout>
      <Text>메뉴를 선택해주세요.</Text>
    </Layout>
  );
};

const Text = styled.div`
  text-align: center;
  font-size: 20px;
`;

export default Main;
