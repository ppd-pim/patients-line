import { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";

export default function Appointment(props) {
  const [appointmentLoading, setappointmentLoading] = useState(false);
  const [appointments, setAppointment] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/PharConnect/api/LineUsers/appointment/" +
          props.phn,
          // '58007029',
        {
          method: "GET",
        }
      );

      const result = await res.json();

      if (result.status == "success") {
        await setAppointment(result.data);      
      }
    };
    fetchData();
  }, []);

  return (
    <section>
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
                  <th className="col-6">วันที่ เวลา </th>
                  <th className="col-6">ห้องตรวจ</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(appointments).length > 0 ? (
                  appointments.map(function (appointment) {
                    return (
                      <tr>
                        <td>{appointment.appointmentDttm}</td>
                        <td>{appointment.locationName}</td>
                      </tr>
                    );
                  })
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
    </section>
  );
}
