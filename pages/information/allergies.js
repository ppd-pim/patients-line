import { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";

export default function Allergies(props) {
  const [allergiesLoading, setallergiesLoading] = useState(false);
  const [allergiess, setallergies] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      console.log("appoint" + props.phn);

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/PharConnect/api/LineUsers/allergybyhn/" +
          props.phn,
        {
          method: "GET",
        }
      );

    //   const result = await res.json();

    //   if (result.status == "success") {
    //     await setallergies(result.data);
    //     // await setallergiesLoading(true);
    //     console.log("appintment");
    //     console.log(allergiess);
    //   }
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
              <div className="text-title">ส่วนที่ 2 ประวัติแพ้</div>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th className="col-4">รูปแบบ</th>
                  <th className="col-4">ชื่อยา</th>
                  <th className="col-4">ประวัติแพ้ยา</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(allergiess).length > 0 ? (
                  allergiess.map(function (allergies) {
                    return (
                      <tr>
                        <td>{allergies.allergiesDttm}</td>
                        <td>{allergies.locationName}</td>
                      </tr>
                    );
                  })
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
      </div>
    </section>
  );
}
