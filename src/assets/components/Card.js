import { Box } from "@chakra-ui/react";
import {
  TiWeatherSunny,
  TiWeatherShower,
  TiWeatherCloudy,
  TiWeatherPartlySunny,
  TiWeatherSnow,
  TiWeatherStormy,
} from "react-icons/ti";
import { TbMist } from "react-icons/tb";

export const Card = ({ data }) => {
  const day = (date) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var numDate = new Date(date * 1000);

    return `${days[numDate.getDay()]}`;
  };

  const renderIcon = (weatherDesc) => {
    if (
      weatherDesc.includes("partly") &&
      (weatherDesc.includes("cloud") || weatherDesc.includes("sun"))
    ) {
      return <TiWeatherPartlySunny fontSize={25}></TiWeatherPartlySunny>;
    } else if (weatherDesc.includes("sun") || weatherDesc.includes("clear")) {
      return <TiWeatherSunny fontSize={25}></TiWeatherSunny>;
    } else if (weatherDesc.includes("cloud")) {
      return <TiWeatherCloudy fontSize={25}></TiWeatherCloudy>;
    } else if (weatherDesc.includes("storm")) {
      return <TiWeatherStormy fontSize={25}></TiWeatherStormy>;
    } else if (weatherDesc.includes("snow")) {
      return <TiWeatherSnow fontSize={25}></TiWeatherSnow>;
    } else if (
      weatherDesc.includes("rain") ||
      weatherDesc.includes("showers")
    ) {
      return <TiWeatherShower fontSize={25}></TiWeatherShower>;
    } else if (weatherDesc.includes("mist")) {
      return <TbMist fontSize={25}></TbMist>;
    } else {
      return <></>;
    }
  };

  return (
    <Box
      flex="1"
      borderWidth="2px"
      borderRadius="md"
      borderColor="gray.200"
      h="full"
      p={4}
      m="4"
      bg="rgba(255, 255, 255, 0.3)"
      borderRadius="10pt"
      maxWidth={300}
    >
      <div className="weatherBox">
        <div className="day">{day(data.dt)}</div>
        <div className="weatherForecast">{data.weather[0].description}</div>
        <div className="iconForecast">
          {renderIcon(data.weather[0].description)}
        </div>
        <div className="temperatureForecast">
          {Math.floor(data.main.temp)}°C
        </div>
      </div>
    </Box>
  );
};
