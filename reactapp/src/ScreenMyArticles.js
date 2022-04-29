import React, { useState, useEffect } from "react";
import "./App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenMyArticles(props) {
  const [myarticles, setMyArticles] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState([]);

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch("/sendArticles", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${props.token}`,
      });
      var response = await rawResponse.json();
      setMyArticles(response.myarticles);
      var array2 = [];

      for (var k = 0; k < response.myarticles.length; k++) {
        array2.push(false);
      }
      setIsModalVisible(array2);
    }
    loadData();
  }, []);

  async function deleteArticle(title) {
    var rawResponse = await fetch("/deleteArticles", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.token}&title=${title}`,
    });
    var rawResponse = await fetch("/sendArticles", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.token}`,
    });
    var response = await rawResponse.json();
    setMyArticles(response.myarticles);
  }

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

  const handleCancel = (index) => {
    var array5 = [...isModalVisible];
    array5[index] = false;
    setIsModalVisible(array5);
  };

  var newArticles = myarticles.map((element, i) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: 300,
          margin: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        cover={<img alt="example" src={element.img} />}
        actions={[
          <Icon type="read" key="ellipsis2" onClick={() => showModal(i)} />,
          <Icon
            type="delete"
            key="ellipsis"
            onClick={() => deleteArticle(element.title)}
          />,
        ]}
      >
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

  console.log(newArticles);
  var message = "";
  if (newArticles.length == 0) {
    message = "No Articles";
  }

  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">{newArticles}</div>
      <div>{message}</div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function (article) {
      dispatch({
        type: "deleteArticle",
        article: article,
      });
    },
  };
}

function mapStateToProps(state) {
  return { myArticles: state.myArticles, token: state.token };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
