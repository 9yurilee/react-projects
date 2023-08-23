/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import Layout from "../Layout";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const KeyPad = () => {
  const [keyPadOn, setKeyPadOn] = useState<boolean>(false);
  const [number, setNumber] = useState<(number | string)[]>([]);
  const [input, setInput] = useState<string>("");
  const [clicked, setClicked] = useState({ index: 0, isClicked: false });

  useEffect(() => {
    setNumber(generateNewNumbers());
  }, [keyPadOn]);

  const generateNewNumbers = () => {
    const newNumbers: (number | string)[] = [];

    while (newNumbers.length < 10) {
      const num = Math.floor(Math.random() * 10);

      if (newNumbers.indexOf(num) === -1) {
        newNumbers.push(num);
      }
    }

    return [...newNumbers, "reset", "←"];
  };

  const handleClickKeyPad = (num: number | string) => {
    if (num === "reset") {
      handleResetClick();
    } else if (num === "←") {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + num);
    }
  };

  const handleResetClick = () => {
    setInput("");
    setNumber(generateNewNumbers());
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
            {number.map((num, index) => (
              <Button
                key={index}
                onClick={() => handleClickKeyPad(num)}
                onMouseDown={() => setClicked({ index, isClicked: true })}
                onMouseUp={() => setClicked({ index, isClicked: false })}
                css={css`
                  color: ${clicked.index === index && clicked.isClicked
                    ? "#ccc"
                    : "#888"};
                  background: ${clicked.index === index && clicked.isClicked
                    ? "#eee"
                    : ""};
                  border-color: ${clicked.index === index && clicked.isClicked
                    ? "#ccc"
                    : "#888"};
                `}
              >
                {num}
              </Button>
            ))}
          </ButtonContainer>
        )}
      </KeyPadContainer>
    </Layout>
  );
};

const KeyPadContainer = styled.div`
  width: 400px;
`;

const textStyle = css`
  font-size: 14px;
  color: #bbb;
  &:hover {
    color: skyblue;
    cursor: pointer;
  }
`;

const Top = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const InputContainer = styled.input`
  width: 80%;
  height: 30px;
  outline: none;
  border: 1px solid $ccc;
  border-radius: 10px;
  padding: 5px 10px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 350px;
  background-color: #eee;
  border-radius: 6px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  place-items: center;
`;

const Button = styled.div`
  width: 80px;
  height: 80px;
  border: 2px solid #666;
  border-radius: 10px;
  line-height: 80px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

export default KeyPad;