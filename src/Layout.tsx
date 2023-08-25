import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

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
      name: "그림판",
      path: "/drawing"
    },
    { name: "버튼 키패드", path: "/keypad" },
    { name: "지도", path: "/map" },
    { name: "캐러셀", path: "/carousel" }
  ];

  return (
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
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  border: 2px solid #bbb;
  border-radius: 6px;
  padding: 4px;
  display: flex;
  @media (max-width: 375px) {
    display: block;
  }
  gap: 4px;
`;

const Left = styled.div`
  @media (max-width: 375px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Right = styled.div`
  flex-grow: 1;
  border: 2px solid #bbb;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
  background: white;
  @media (max-width: 375px) {
  }
`;

const Menu = styled.div`
  width: 140px;
  @media (max-width: 375px) {
    width: auto;
  }
  text-align: center;
  border: 2px solid #bbb;
  border-radius: 6px;
  margin-bottom: 10px;
  font-weight: bold;
  padding: 10px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Layout;
