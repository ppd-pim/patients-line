import { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";

export default function Homemedical(props) {
  const [homemedicals, setHomemedical] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/PharConnect/api/LineUsers/homemedical/" +
           props.phn,
          //'64004451',
        {
          method: "GET",
        }
      );

        const result = await res.json();

        if (result.status == "success") {
          await setHomemedical(result.data);
          
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
              <div className="text-title">ส่วนที่ 3 ยากลับบ้าน</div>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th className="col-6">ชื่อยา</th>
                  <th className="col-6">วิธีใช้</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(homemedicals).length > 0 ? (
                  homemedicals.map(function (homemedical) {
                    return (
                      <tr>
                        <td>{homemedical.drugName}</td>
                        <td>{homemedical.freeText1}, {homemedical.freeText2}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      ไม่มีข้อมูลยากลับบ้าน
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
