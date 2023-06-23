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
  InputGroup,
} from "react-bootstrap";
import Head from "next/head";
// import Image from 'next/image'
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCheckCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import OtpInput from "react-otp-input";

export default function Register(props) {
  const [warning, setwarning] = useState(false);
  const [warningOTP, setwarningOTP] = useState(false);
  const router = useRouter();
  const [profile, setProfile] = useState({});

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalSuccess, setModalOpensuccess] = React.useState(false);
  const [modalOTP, setModalOTP] = React.useState(false);
  const [mobile, setMobile] = useState({});
  const [msg_error, setMsgerror] = useState({});
  const [bd_date, setBDdate] = useState({});
  const [otp, setOtp] = useState("");
  const [step_otp, setSetp_otp] = React.useState(false);
  const [reff_otp, setReff_otp] = useState("");
  const [token_otp, setTeff_otp] = useState("");
  const [btn_load, setBtnLoad] = React.useState(false);

  const registerUserQshc = async (event) => {
    event.preventDefault();
    setBtnLoad(true);
    setBDdate(event.target.birth_date.value);
    const bd_date = event.target.birth_date.value.replaceAll("/", "");
    setSetp_otp(false);
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/MobileAppAPI/api/Patients/Verify",
      {
        body: JSON.stringify({
          idCardNo: event.target.idcard.value,
          birthDate: bd_date,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    const result_qshc_verify = await res.json();

    if (result_qshc_verify.status === "success") {
      setProfile(result_qshc_verify);
      setwarning(false);
      setBtnLoad(false);
      setModalOpen(!modalOpen);
    } else {
      setBtnLoad(false);
      if (result_qshc_verify.message == "Not Found Id Card No") {
        setMsgerror("เลขบัตรประจำตัวประชาชน หรือ วันเดือนปีเกิด ไม่ถูกต้อง");
      } else {
        setMsgerror("เกิดข้อผิดพลาด");
      }
    }
  };

  const condition = async (event) => {
    event.preventDefault();
    setModalOpen(!modalOpen);
    setModalOTP(!modalOTP);
  };

  const registerUser = async (event) => {
    event.preventDefault();
    const res = await fetch("https://portal-otp.smsmkt.com/api/otp-validate", {
      body: JSON.stringify({
        token: token_otp,
        otp_code: otp,
      }),
      headers: {
        "Content-Type": "application/json",
        api_key: process.env.NEXT_PUBLIC_API_KEY_SMSOTP,
        secret_key: process.env.NEXT_PUBLIC_SECRET_KEY_SMSOTP,
      },
      method: "POST",
    });

    const result = await res.json();
    if (result.code && result.code == "5000") {
      setMsgerror("รหัส OPT นี้หมดอายุเเล้ว");
      setwarningOTP(true);
    } else if (result.result) {
      if (result.result.status == true) {
        setModalOTP(!modalOTP);
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL +
            "/PharConnect/api/LineUsers/Register",
          {
            body: JSON.stringify({
              idCardNo: profile.data.idCardNo,
              birthDate: bd_date,
              mobile: mobile,
              uid: props.profile.userId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        );

        const result = await res.json();
        if (result.status === "success") {
          setBtnLoad(false);
          if (result.message == "This Line User is already registed") {
            setMsgerror("Line นี้เคยลงทะเบียนเเล้ว");
            setwarning(true);
          } else {
            setModalOpensuccess(!modalSuccess);
            setTimeout(() => setModalOpensuccess(modalSuccess), 3000);
            const liff = (await import("@line/liff")).default;
            liff.closeWindow();
          }
        } else {
          setMsgerror("เกิดข้อผิดพลาด");
          setwarningOTP(true);
        }
      } else if (result.result.status == false) {
        setMsgerror("รหัส OPT ไม่ถูกต้อง");
        setwarningOTP(true);
      } else {
        setMsgerror("เกิดข้อผิดพลาด");
        setwarningOTP(true);
      }
    }
  };

  const sendOTP = async (event) => {
    setOtp("");
    setwarningOTP(false);
    event.preventDefault();
    setMobile(event.target.mobile.value);

    const res = await fetch("https://portal-otp.smsmkt.com/api/otp-send", {
      body: JSON.stringify({
        phone: event.target.mobile.value,
        ref_code: "",
        project_key: process.env.NEXT_PUBLIC_PROJECT_KEY,
      }),
      headers: {
        "Content-Type": "application/json",
        api_key: process.env.NEXT_PUBLIC_API_KEY_SMSOTP,
        secret_key: process.env.NEXT_PUBLIC_SECRET_KEY_SMSOTP,
      },
      method: "POST",
    });

    const result = await res.json();
    if (result.code === "000") {
      setSetp_otp(true);
      var obj = {};
      var res_otp = Object.keys(result).map(function (name) {
        obj[name] = result[name];
        return obj;
      });
      setReff_otp(res_otp[0].result.ref_code);
      setTeff_otp(res_otp[0].result.token);
    } else {
      setMsgerror("เกิดข้อผิดพลาดในการส่ง OTP");
      setwarningOTP(true);
    }
  };

  return (
    <section>
      <Container fluid="" className="m-0 p-2">
        <div className="card card-login">
          <Row className="justify-content-md-center mb-2">
            <Col span={12} className="text-center">
              <h3>ตรวจสอบข้อมูลผู้ป่วย</h3>
            </Col>
          </Row>
          <Row className="justify-content-md-center mb-3">
            <Col className="text-start">
              กรุณากรอก เลขบัตรประจำตัวประชาชน และ <br></br>
              วัน/เดือน/ปี เกิดให้ถูกต้อง
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form onSubmit={registerUserQshc}>
                <Form.Group>
                  <Form.Label>เลขบัตรประจำตัวประชาชน</Form.Label>
                  <Form.Control
                    id="idcard"
                    name="idcard"
                    type="text"
                    pattern="[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]"
                    title="กรุณาตรวจสอบเลขบัตรประจำตัวประชาชน 13 หลัก"
                    placeholder="เลขบัตรประจำตัวประชาชน"
                    required
                  />
                  <p className="text-danger tx-12 m-1">
                    *เลขบัตรประจำตัวประชาชน ไม่ต้องใส่ขีด(-)
                  </p>
                </Form.Group>

                <Form.Group>
                  <Form.Label>วันเดือนปี เกิด</Form.Label>
                  <Form.Control
                    id="birth_date"
                    name="birth_date"
                    type="text"
                    placeholder="วัน/เดือน/ปี"
                    pattern="[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9]"
                    title="กรุณาตรวจสอบวันเดือนปีเกิดของท่าน เช่น 12/31/2540"
                    required
                  />
                  <p className="text-danger tx-12 m-1">
                    *วัน/เดือน/ปี ของท่าน เช่น 12/31/2540
                  </p>
                </Form.Group>

                {warning && (
                  <Alert className="mb-1 p-1 tx-12" variant="danger">
                    {msg_error}
                  </Alert>
                )}

                <div className="text-center mt-2">
                  {btn_load ? (
                    <Button className="btn-primary" type="submit" disabled>
                      <FontAwesomeIcon
                        className="load-icon tx-16"
                        icon={faSpinner}
                      />{" "}
                      ตรวจสอบข้อมูล
                    </Button>
                  ) : (
                    <Button className="btn-primary" type="submit">
                      ตรวจสอบข้อมูล
                    </Button>
                  )}
                </div>
              </Form>
            </Col>
          </Row>
        </div>

        <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
          <Form onSubmit={condition}>
            <div className=" modal-header pt-1 pb-1">
              <h6 className=" modal-title" id="exampleModalLabel">
                ข้อตกลงและเงื่อนไข
              </h6>
              <button
                aria-label="Close"
                className=" close btn-close-dialog"
                type="button"
                onClick={() => setModalOpen(!modalOpen)}
              >
                <span aria-hidden={true} className="tx-25">
                  ×
                </span>
              </button>
            </div>
            <ModalBody>
              <Form.Group className="mt-2">
                <Form.Check
                  id="condition"
                  name="condition"
                  type="checkbox"
                  label="ยอมรับข้อตกลงและเงื่อนไข"
                  required
                />
              </Form.Group>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                type="button"
                className="btn-warning "
                style={{ fontSize: 14 }}
                onClick={() => setModalOpen(!modalOpen)}
              >
                ยกเลิก
              </Button>
              <Button color="primary" type="submit" style={{ fontSize: 14 }}>
                ยอมรับ
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        <Modal
          toggle={() => setModalOpensuccess(!modalSuccess)}
          isOpen={modalSuccess}
        >
          <div className="text-end ">
            <button
              aria-label="Close"
              className=" close btn-close-dialog mr-4"
              type="button"
              onClick={() => setModalOpensuccess(!modalSuccess)}
            >
              <span aria-hidden={true} className="tx-25">
                ×
              </span>
            </button>
          </div>
          <ModalBody className="pt-0">
            <div className="text-center">
              <FontAwesomeIcon className="CheckCircle" icon={faCheckCircle} />
              <p>ลงทะเบียนสำเร็จ</p>
            </div>
          </ModalBody>
        </Modal>

        <Modal toggle={() => setModalOTP(!modalOTP)} isOpen={modalOTP}>
          {step_otp ? (
            <div>
              <Form onSubmit={registerUser}>
                <ModalBody className="pb-0">
                  <div className="otp-block">
                    <Form.Group>
                      <p className=" mb-0">
                        กรุณากรอกเลข OTP ที่ส่งไปยัง ******{mobile.slice(-4)}
                      </p>
                      <div className="text-center">
                        <p className="mb-1 tx-14">(REF.CODE : {reff_otp})</p>
                        <OtpInput
                          value={otp}
                          containerStyle={"otp-container"}
                          inputStyle={"otp-input"}
                          onChange={setOtp}
                          numInputs={6}
                          required
                          inputType="number"
                          renderInput={(props) => <input {...props} />}
                        />

                        {warningOTP && (
                          <Alert className="mb-1 p-1 tx-12" variant="danger">
                            {msg_error}
                          </Alert>
                        )}
                        <Button type="submit" className="mt-1">
                          ยืนยัน
                        </Button>
                      </div>
                    </Form.Group>
                  </div>
                </ModalBody>
              </Form>
              <Form onSubmit={sendOTP} className="text-center">
                <Form.Control
                  id="mobile"
                  name="mobile"
                  type="hidden"
                  value={mobile}
                />
                <Button type="submit" variant="" className="otp-agian tx-14">
                  ส่งรหัสยืนยันอีกครั้ง
                </Button>
              </Form>
            </div>
          ) : (
            <Form onSubmit={sendOTP}>
              <ModalBody>
                <Form.Group>
                  <Form.Label>หมายเลขโทรศัพท์มือถือ</Form.Label>
                  {warning && (
                    <Alert className="mb-1 p-1 tx-12" variant="danger">
                      {msg_error}
                    </Alert>
                  )}

                  <InputGroup className="">
                    <Form.Control
                      id="mobile"
                      name="mobile"
                      type="number"
                      pattern="[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]"
                      title="กรุณาตรวจสอบหมายเลขโทรศัพท์มือถือ"
                      placeholder="หมายเลขโทรศัพท์มือถือ"
                      required
                      aria-describedby="basic-addon2"
                    />
                    <Button
                      type="submit"
                      variant="outline-secondary"
                      id="button-addon2"
                    >
                      ส่ง
                    </Button>
                  </InputGroup>
                  <p className="text-danger tx-12 m-1">
                    *หมายเลขโทรศัพท์มือถือที่ต้องการใช้ลงทะเบียน
                    เเละรับรหัสยืนยัน OTP
                  </p>
                </Form.Group>
              </ModalBody>
            </Form>
          )}
        </Modal>
      </Container>
    </section>
  );
}
