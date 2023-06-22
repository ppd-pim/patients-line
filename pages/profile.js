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
import Head from "next/head";
// import Image from 'next/image'
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Register(props) {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  const [code, setCode] = useState();
  const [friendFlag, setFriendFlag] = useState();
  const [os, setOs] = useState("ios");
  const [page, setPage] = useState("reward");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [profile, setProfile] = useState({});
  const [users, setUsers] = useState({});

  const [allergies, setAllergies] = useState({});
  const [homeMed, setHomeMed] = useState({});
  const [apointment, setApointment] = useState({});

  var data = props.profile;
  var data_user = props.users;

  const getApointment = async (phn) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/PharConnect/api/LineUsers/appointment/" +
          '58007029',
        {
          headers: {
            // "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const result = await res.json();
      return result;
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // var obj = {};
      // var res = Object.keys(data).map(function (name) {
      //   obj[name] = data[name];
      //   return obj;
      // });
      // setProfile(res[0]);
      var obj_user = {};
      var res_user = Object.keys(data_user).map(function (name) {
        obj_user[name] = data_user[name];
        return obj_user;
      });
      await setUsers(res_user[0]);
      console.log('cccc '+props.phn);
      // if (props.phn ) {
      //   const apointmentData = await getApointment(props.phn);
      //   console.log('1');
      //   if (apointmentData.status == "success") {
      //     if (Object.keys(apointmentData.data).length > 0) {
      //       await setApointment(apointmentData.data);
      //       console.log(apointment);
      //     }
      //     else{
      //       console.log('no booking');
      //     }
      //   }
      // }
    };
    fetchData();
  }, []);

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
      <div className="card ">
        <Row className="justify-content-md-center p-2">
          <Col span={12} className="text-start">
            <div className="d-flex">
              <div className="box-title"></div>
              <div className="text-title">ส่วนที่ 2 ประวัติแพ้</div>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th>รูปแบบ</th>
                  <th>ชื่อยา</th>
                  <th>ประวัติแพ้ยา</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(allergies).length > 0 ? (
                  <>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>2</td>
                      <td>3</td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      ไม่มีข้อมูลประวัติแพ้
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <div className=""></div>
      </div>
      <div className="card ">
        <Row className="justify-content-md-center p-2">
          <Col span={12} className="text-start">
            <div className="d-flex">
              <div className="box-title"></div>
              <div className="text-title">ส่วนที่ 3 ยากลับบ้าน</div>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th>ชื่อยา</th>
                  <th>วิธีใช้</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(homeMed).length > 0 ? (
                  <>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center">
                      ไม่มีข้อมูลยากลับบ้าน
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <div className=""></div>
      </div>
      <div className="card ">
        <Row className="justify-content-md-center p-2">
          <Col span={12} className="text-start">
            <div className="d-flex">
              <div className="box-title"></div>
              <div className="text-title">
                ส่วนที่ 4 วันนัดที่ศูนย์หัวใจสิริกิติ์ฯ
              </div>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th>วันที่ </th>
                  <th>ห้องตรวจ</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(apointment).length > 0 ? (
                  <>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center">
                      ไม่มีข้อมูลวันนัดที่ศูนย์หัวใจสิริกิติ์ฯ
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </div>
  );
}
