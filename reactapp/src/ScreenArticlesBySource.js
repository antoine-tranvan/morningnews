import React, { useState, useEffect } from "react";
import "./App.css";
import { Card, Icon } from "antd";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import { Modal, message, Drawer, Button, List } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  const [articlesList, setArticlesList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState([]);
  const [isLiked, setIsLiked] = useState([]);
  const [test, setTest] = useState(0);
  const [visible, setVisible] = useState(false);
  const [sourceList, setSourceList] = useState([]);

  var { id } = useParams();

  console.log("test: " + id);

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=f2902093791644f9ab5bc909efd35172&language=${props.language}`
      );
      var response = await rawResponse.json();
      var array2 = [];
      for (var k = 0; k < response.articles.length; k++) {
        array2.push(false);
      }

      setArticlesList(response.articles);
      setIsModalVisible(array2);

      var rawArticles = await fetch("/sendArticles", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${props.token}`,
      });
      var myarticles = await rawArticles.json();

      var array3 = [];

      for (let i = 0; i < response.articles.length; i++) {
        var color = "grey";
        console.log("test");
        for (let j = 0; j < myarticles.myarticles.length; j++) {
          console.log("test2");
          if (response.articles[i].title == myarticles.myarticles[j].title) {
            color = "blue";
          }
        }
        array3.push(color);
      }
      setIsLiked(array3);

      var rawArticles = await fetch(
        `https://newsapi.org/v2/top-headlines/sources?apiKey=f2902093791644f9ab5bc909efd35172&language=${props.language}`
      );
      var articles = await rawArticles.json();
      setSourceList(articles.sources);
    }
    loadData();
  }, [test]);

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

  async function addToDatabase(title, description, image, isliked) {
    var rawResponse = await fetch("/updateArticles", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.token}&title=${title}&description=${description}&img=${image}`,
    });
    setTest(test + 1);
    if (isliked == "blue") {
      message.warning("Article déjà dans les favoris", 2);
    } else {
      message.success("Article ajouté aux favoris", 2);
    }
  }

  function coucou() {
    setTest(test + 1);
    setVisible(false);
  }

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
            style={{ color: isLiked[i] }}
            onClick={() =>
              addToDatabase(
                element.title,
                element.description,
                element.urlToImage,
                isLiked[i]
              )
            }
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

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Nav />
      <div className="Banner">
        <Button type="primary" onClick={showDrawer}>
          Liste des sources
        </Button>
        <Drawer
          title="Mes sources"
          placement="left"
          onClose={onClose}
          visible={visible}
        >
          <List
            itemLayout="horizontal"
            dataSource={sourceList}
            renderItem={(item) => (
              <List.Item>
                <Link
                  to={`/screenarticlesbysource/${item.id}`}
                  onClick={() => coucou()}
                >
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item.name}</a>}
                  />
                </Link>
              </List.Item>
            )}
          />
        </Drawer>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
