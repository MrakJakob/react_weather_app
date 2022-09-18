import { Card } from "./Card";
import { Flex } from "@chakra-ui/react";

export const Forecast = ({ forecast }) => {
  let time = 0;

  var children = [];
  var num = 0;
  if (forecast != undefined) {
    for (let i = 0; i < forecast.length; i++) {
      // to get weather forecast for next days ()
      if (i == 0) {
        time = forecast[i].dt; // we get the latest forecast time
        time += 86400; // we add a day
      }
      if (time == forecast[i].dt) {
        // forecast for the next day at the same time
        num++;
        children.push(<Card data={forecast[i]} key={i}></Card>);
        // <Card data={forecast.list[i]}></Card>; // pass the data to Card component
        time += 86400;

        if (num == 3) {
          break;
        }
      }
    }
  }

  return <Flex justify="center">{children}</Flex>;
};
