import React, { useState, useEffect } from "react";
import "./App.css";
import { Form, Select, Alert, Input, Button, message } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./Nav";

function ScreenUser(props) {
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <Nav />
      <div className="Banner"></div>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
          rate: 3.5,
        }}
      >
        <Form.Item
          name="select"
          label="Select your favorite language"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please select your country!",
            },
          ]}
        >
          <Select placeholder="Français ou Anglais">
            <Option value="fr">French</Option>
            <Option value="en">English</Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function mapStateToProps(state) {
  return { language: state.language, token: state.token };
}

export default connect(mapStateToProps, null)(ScreenUser);
