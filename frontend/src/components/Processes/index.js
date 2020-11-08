import React from "react";
import CardProcess from "../CardProcess";
import * as S from "./styles";

class Processes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <S.CardProcessStyle className="m-3">
          {this.props.processes.map((i) => {
            return (
              <CardProcess
                href={
                  i.inprogress
                    ? "/process/?_id=" + i._id
                    : "/old-process/?" + i._id
                }
                title={i.title}
                date_end={i.date_end}
                total_aid={i.aid_name.length}
                color={i.inprogress ? "#5CB85C" : ""}
              />
            );
          })}
        </S.CardProcessStyle>
      </>
    );
  }
}

export default Processes;