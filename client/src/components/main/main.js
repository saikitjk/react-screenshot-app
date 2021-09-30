import React from "react";
import SearchBox from "./searchBox/searchBox";
import { Card, CardTitle, CardBody } from "reactstrap";
import "./main.css";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <CardTitle>
            <CardBody>
              <SearchBox />
            </CardBody>
          </CardTitle>
        </Card>
      </div>
    );
  }
}

export { Main as default };
