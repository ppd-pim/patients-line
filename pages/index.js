import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Login from "./login";
import Loading from "../components/loading";
import Header from "../components/header";
import Footer from "../components/footer";
import Profile from "./profile";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [users, setUsers] = useState(false);

  const verify_line = async (uid) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/PharConnect/api/LineUsers/Verify/" +
          uid+6,
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
      const liff = (await import("@line/liff")).default;
      await liff.ready;
      const profile = await liff.getProfile();
      await setProfile(profile);

      const verifyData = await verify_line(profile.userId);
      if (verifyData.status == "success") {
        await setUsers(verifyData.data);
        setLoading(true);
      } else {
        setLoading(true);
      }
    };

    fetchData();
  }, [profile.userId]);

  return (
    <section className="main-body">
      <Head>
        <script
          type="module"
          src="https://pdp.kku.ac.th/api/v1/widget"
        ></script>
      </Head>
      <kku-cookie-widget ></kku-cookie-widget>
      <Header></Header>
      <Container fluid="" className="main-block">
        {!loading || profile.userId == undefined ? (
          <Loading></Loading>
        ) : !users ? (
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Login profile={profile} />
            </div>
          </div>
        ) : users ? (
          <Profile profile={profile} users={users} phn={users.hn}/>
        ) : (
          <Loading></Loading>
        )}
      </Container>
      <Footer></Footer>
    </section>
  );
}
