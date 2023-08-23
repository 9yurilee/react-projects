import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import Gallery from "./gallery/Gallery";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";

interface LayoutDefaultProps {
  children?: React.ReactElement;
}

const Layout = ({ children }: LayoutDefaultProps) => {
  const navigate = useNavigate();

  const handleMovePage = (path: string) => {
    navigate(path);
  };

  const list = [
    { name: "메인", path: "/" },
    {
      name: "이미지 갤러리",
      path: "/gallery"
    },
    { name: "버튼 키패드", path: "/keypad" },
    { name: "캐러셀", path: "/carousel" }
  ];

  return (
    <div>
      <Global styles={GlobalStyle} />
      <Container>
        <Left>
          {list.map((item, index) => (
            <Menu key={index} onClick={() => handleMovePage(item.path)}>
              {item.name}
            </Menu>
          ))}
        </Left>
        <Right>{children}</Right>
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid #bbb;
  border-radius: 6px;
  padding: 4px;
  display: flex;
  gap: 20px;
`;

const Left = styled.div``;

const Menu = styled.div`
  width: 140px;
  text-align: center;
  border: 2px solid #bbb;
  border-radius: 6px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  font-weight: bold;
  padding: 10px;
`;

const Right = styled.div`
  width: 100%;
  border: 2px solid #bbb;
  border-radius: 6px;
  padding: 10px;
`;

export default Layout;
