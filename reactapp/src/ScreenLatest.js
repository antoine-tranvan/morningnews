import React, { useState, useEffect } from "react";
import "./App.css";
import { Card, Icon, Badge } from "antd";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import { Modal } from "antd";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenLatest(props) {
  const [articlesList, setArticlesList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState([]);

  const category = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  var { id } = useParams();

  console.log("test: " + id);

  useEffect(() => {
    async function loadData() {
      var array2 = [];
      for (var i = 0; i < category.length; i++) {
        var rawResponse = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${category[i]}&language=fr&sortBy=publishedAt&apiKey=f2902093791644f9ab5bc909efd35172`
        );
        var response = await rawResponse.json();
        console.log(response.articles[0]);

        array2.push(response.articles[0]);
      }

      setArticlesList(array2);
      console.log(array2);
    }
    loadData();
  }, []);

  const showModal = (index) => {
    var array3 = [...isModalVisible];
    array3[index] = true;
    setIsModalVisible(array3);
  };

  const handleOk = (index) => {
    var array4 = [...isModalVisible];
    array4[index] = false;
    setIsModalVisible(array4);
  };

  async function addToDatabase(title, description, image) {
    var rawResponse = await fetch("/updateArticles", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.token}&title=${title}&description=${description}&img=${image}`,
    });
  }

  const handleCancel = (index) => {
    var array5 = [...isModalVisible];
    array5[index] = false;
    setIsModalVisible(array5);
  };

  var cardList = articlesList.map((element, i) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: 300,
          margin: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        cover={<img alt="example" src={element.urlToImage} />}
        actions={[
          <Icon type="read" key="ellipsis2" onClick={() => showModal(i)} />,
          <Icon
            type="like"
            key="ellipsis"
            style={{ color: "grey" }}
            onClick={() =>
              addToDatabase(
                element.title,
                element.description,
                element.urlToImage
              )
            }
          />,
        ]}
      >
        <div style={{ color: "red" }}> {category[i]} </div>
        <Modal
          title={element.title}
          visible={isModalVisible[i]}
          onOk={() => handleOk(i)}
          onCancel={() => handleCancel(i)}
        >
          <p>{element.description}</p>
        </Modal>
        <Meta title={element.title} description={element.description} />
      </Card>
    </div>
  ));

  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">{cardList}</div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (article) {
      dispatch({
        type: "addArticle",
        article: article,
      });
    },
  };
}

function mapStateToProps(state) {
  return { language: state.language, token: state.token };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenLatest);
