import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";

import Layout from "../Layout";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null); // 지도를 표시할 div

  const [map, setMap] = useState<any>(null); // 지도 객체
  const [addr, setAddr] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (mapRef.current) {
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 1 //지도의 레벨(확대, 축소 정도)
      };

      const map = new kakao.maps.Map(mapRef.current, options);
      const zoomControl = new kakao.maps.ZoomControl();

      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      setMap(() => map);
    }
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddr(e.target.value);
    setIsError(false);
  };

  const searchAddress = (addr: string) => {
    const geo = new kakao.maps.services.Geocoder();

    if (addr) {
      geo.addressSearch(addr, (result: any) => {
        if (kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          new kakao.maps.Marker({
            map: map,
            position: coords
          });

          map.setCenter(coords);
        } else {
          return;
        }
      });
    } else {
      setIsError(true);
      return;
    }
  };

  return (
    <Layout>
      <div>
        <Search>
          <Input
            type="text"
            placeholder="주소를 입력해주세요."
            onChange={(e) => handleOnChange(e)}
            theme={isError ? "error" : "inherit"}
          />
          <SearchIcon
            color={isError ? "error" : "inherit"}
            cursor="pointer"
            onClick={() => searchAddress(addr)}
          >
            검색
          </SearchIcon>
        </Search>
        <KakaoMap ref={mapRef}>Map</KakaoMap>
      </div>
    </Layout>
  );
};

const Search = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  height: 40px;
  font-size: 16px;
  padding: 4px 6px;
  outline: none;
  border: none;
  border-bottom: 1px solid #bbb;
  border-color: ${(props) => (props.theme === "error" ? "red" : "#bbb")};
  flex-grow: 1;
  ::placeholder {
    color: ${(props) => (props.theme === "error" ? "red" : "#bbb")};
  }
`;

const KakaoMap = styled.div`
  width: 100%;
  height: 500px;
  @media (max-width: 375px) {
    height: 450px;
  }
`;

export default Map;
