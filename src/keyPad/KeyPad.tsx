/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import Layout from "../Layout";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const KeyPad = () => {
  const [keyPadOn, setKeyPadOn] = useState<boolean>(false);
  const [number, setNumber] = useState<number[]>([]);
  const [input, setInput] = useState<string>("");
  const [clicked, setClicked] = useState({ index: 0, isClicked: false });

  useEffect(() => {
    setNumber(generateNewNumbers());
  }, [keyPadOn]);

  const generateNewNumbers = () => {
    const newNumbers: number[] = [];

    while (newNumbers.length < 10) {
      const num = Math.floor(Math.random() * 10);

      if (newNumbers.indexOf(num) === -1) {
        newNumbers.push(num);
      }
    }

    return [...newNumbers, -1, -2];
  };

  const handleClickKeyPad = (num: number) => {
    if (num === -1) {
      setInput("");
      setNumber(generateNewNumbers());
    } else if (num === -2) {
      setInput(input.slice(0, -1));
    } else {
      num >= 0 && setInput(input + num);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.replace(/[^0-9]/g, ""));
  };

  return (
    <Layout>
      <KeyPadContainer>
        <Top>
          <InputContainer
            type="text"
            value={input}
            onChange={(e) => handleOnChange(e)}
            spellCheck="false"
          />
          <span css={textStyle} onClick={() => setKeyPadOn(!keyPadOn)}>
            키패드 {keyPadOn ? "닫기" : "열기"}
          </span>
        </Top>
        {keyPadOn && (
          <ButtonContainer>
            {number.map((num, index) => {
              const clickedThisButton =
                clicked.index === index && clicked.isClicked;

              return (
                <Button
                  key={index}
                  onClick={() => handleClickKeyPad(num)}
                  onMouseDown={() => setClicked({ index, isClicked: true })}
                  onMouseUp={() => setClicked({ index, isClicked: false })}
                  css={css`
                    color: ${clickedThisButton ? "#ccc" : "#666"};
                    background: ${clickedThisButton ? "#eee" : ""};
                    border-color: ${clickedThisButton ? "#ccc" : "#888"};
                  `}
                >
                  {num === -1 ? "reset" : num === -2 ? "←" : num}
                </Button>
              );
            })}
            <CR>9yurilee</CR>
          </ButtonContainer>
        )}
      </KeyPadContainer>
    </Layout>
  );
};

const KeyPadContainer = styled.div`
  @media (min-width: 768px) {
    width: 400px;
  }
`;

// css props로 넘겨주는 방법
const textStyle = css`
  font-size: 14px;
  color: #bbb;
  &:hover {
    color: #555;
    cursor: pointer;
  }
`;

const Top = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
`;

const InputContainer = styled.input`
  flex-grow: 1;
  height: 30px;
  outline: none;
  border: 1px solid #aaa;
  border-radius: 8px;
  padding: 5px 10px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 250px;
  background: #eee;
  padding: 10px;
  border-radius: 6px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  place-items: center;
`;

const Button = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid #666;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
`;

const CR = styled.span`
  font-size: 10px;
  color: #ccc;
  opacity: 0.3;
  position: absolute;
  pointer-events: none;
`;

export default KeyPad;
