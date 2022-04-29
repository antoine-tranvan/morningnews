import React, { useState, useEffect } from "react";
import "./App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function ScreenSource(props) {
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(
        `https://newsapi.org/v2/top-headlines/sources?apiKey=1b4830bed6fd4008835ab47e6392c88f&language=${props.language}`
      );
      var response = await rawResponse.json();
      setSourceList(response.sources);
    }
    loadData();
  }, [props.language]);

  console.log(sourceList);

  return (
    <div>
      <Nav />

      <div className="Banner">
        <img
          onClick={() => props.changeLanguage("fr")}
          style={{
            borderRadius: "20%",
            overflow: "hidden",
            margin: "5px",
            cursor: "pointer",
          }}
          width={70}
          src="images/france.png"
        />
        <img
          onClick={() => props.changeLanguage("en")}
          style={{
            borderRadius: "20%",
            overflow: "hidden",
            margin: "5px",
            cursor: "pointer",
          }}
          width={70}
          src="images/Anglais.png"
        />
      </div>

      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item) => (
            <List.Item>
              <Link to={`/screenarticlesbysource/${item.id}`}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.description}
                />
              </Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    changeLanguage: function (language) {
      dispatch({
        type: "changeLanguage",
        language: language,
      });
    },
  };
}

function mapStateToProps(state) {
  return { language: state.language, token: state.token };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
