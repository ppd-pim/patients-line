import '@/styles/globals.css'
import '@/styles/style.scss'
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css'

import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

function MyApp({ Component, pageProps }) {
  useEffect( () => {
    const loadData = async () => {
      const liff = (await import("@line/liff")).default;
      try {
        await liff.init({ liffId });
      } catch (error) {
        console.error("liff init error", error.message);
      }
      if (!liff.isLoggedIn()) {
        liff.login({
          scope: 'profile,profile%20openid,profile%20openid%20email,openid,openid%20email',
          prompt: 'consent'
        });
      }
    };

    // then call it here
    loadData();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
