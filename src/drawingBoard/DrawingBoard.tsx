/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Layout from "../Layout";

import SvgIcon from "@mui/material/SvgIcon";
import Brush from "@mui/icons-material/Brush";
import Eraser from "@mui/icons-material/AutoFixHigh";
import Navigator from "@mui/icons-material/Map";
import Undo from "@mui/icons-material/Undo";
import Reset from "@mui/icons-material/RestartAlt";
import Download from "@mui/icons-material/Download";

const DrawingBoard = () => {
  const [mode, setMode] = useState(""); // none, brush, eraser

  const menuList = [Brush, Eraser, Navigator, Undo, Reset, Download];
  const menuList2 = [`Brush`, `Eraser`, `Navigator`];

  const DrawingContainer = css`
    width: 500px;
    display: flex;
  `;

  const ToolBar = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #aaa;
  `;

  const Icon = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
    &:hover {
      background: #eee;
    }
    // background: ${(props) => (props.theme ? "#eee" : "#aaa")};
  `;

  const Canvas = css`
    background: #eee;
  `;

  const handleClickIcon = (now: string) => {
    if (mode === now) {
      setMode("");
    } else {
      setMode(now);
    }
  };

  const handleMouseDown = (mode: string) => {
    if (mode === "") return;

    if (mode === "brush") {
      console.log("");
    }
  };

  // console.log(mode);
  return (
    <Layout>
      <div css={DrawingContainer}>
        <div css={ToolBar}>
          <Icon>
            <Brush onClick={() => handleClickIcon("brush")} />
          </Icon>
          <Icon>
            <Eraser onClick={() => handleClickIcon("eraser")} />
          </Icon>
          <Icon>
            <Navigator onClick={() => handleClickIcon("navigator")} />
          </Icon>
          <Icon>
            <Undo onClick={() => handleClickIcon("undo")} />
          </Icon>
          <Icon>
            <Reset onClick={() => handleClickIcon("reset")} />
          </Icon>
          <Icon>
            <Download onClick={() => handleClickIcon("download")} />
          </Icon>
          <input type="color" />
        </div>
        <div css={Canvas}>
          <canvas className="canvas" id="canvas" width="500" height="500" />
        </div>
      </div>
    </Layout>
  );
};

export default DrawingBoard;
