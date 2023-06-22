import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Alert,
  Table,
} from "react-bootstrap";
import React from "react";
import Apointment from "./information/appointment";
import Allergies from "./information/allergies";
import Homemedical from "./information/homemedical";

export default function Register(props) {
  const [profile, setProfile] = useState({});
  const [users, setUsers] = useState({});

  var data = props.profile;
  var data_user = props.users;

  useEffect(() => {
    const fetchData = async () => {
      var obj_user = {};
      var res_user = Object.keys(data_user).map(function (name) {
        obj_user[name] = data_user[name];
        return obj_user;
      });
      await setUsers(res_user[0]);
    };
    fetchData();
  }, [props.phn]);

  return (
    <div fluid="sm" className="m-0 p-2 profile">
      <div className="card card-header-p">
        <Row className="justify-content-md-center p-2">
          <Col span={12} className="text-center">
            <h3 className="mb-0">ข้อมูลผู้ป่วย</h3>
          </Col>
        </Row>
      </div>
      <div className="card ">
        <Row className="justify-content-md-center p-2">
          <Col span={12} className="text-start">
            <div className="d-flex">
              <div className="box-title"></div>
              <div className="text-title">ส่วนที่ 1 ข้อมูลผู้ป่วย</div>
            </div>
          </Col>
        </Row>
        <div className="detail">
          <Row>
            <Col xs={7} sm={6} md={6} className="fw-bold">
              HN
            </Col>
            <Col xs={5} sm={6} md={6}>
              {users.hn}
            </Col>
          </Row>
          <Row>
            <Col xs={7} sm={6} md={6} className="fw-bold">
              ชื่อ-สกุล
            </Col>
            <Col xs={5} sm={6} md={6}>
              {users.fullname}
            </Col>
          </Row>
          <Row className="id-card">
            <Col xs={7} sm={6} md={6} className="fw-bold">
              เลขที่บัตรประจำตัวประชาชน
            </Col>
            <Col xs={5} sm={6} md={6}>
              0000000000000
            </Col>
          </Row>
          <Row>
            <Col xs={7} sm={6} md={6} className="fw-bold">
              อายุ
            </Col>
            <Col xs={5} sm={6} md={6}>
              999
            </Col>
          </Row>
          <Row>
            <Col xs={7} sm={6} md={6} className="fw-bold">
              เพศ
            </Col>
            <Col xs={5} sm={6} md={6}>
              00000
            </Col>
          </Row>
          <Row>
            <Col xs={7} sm={6} md={6} className="fw-bold">
              สัญชาติ
            </Col>
            <Col xs={5} sm={6} md={6}>
              0000000
            </Col>
          </Row>
        </div>
      </div>
      <Allergies phn={props.phn} />
      <Homemedical phn={props.phn} />   
      <Apointment phn={props.phn} />
    </div>
  );
}
