import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const footer = () => (
  <footer class="footer footer-black  footer-white ">
    <div class="container-fluid">
      <div class="row">
        <div className="col-6 pl-0">
          <a href="https://heart.kku.ac.th/" target="_blank">
            ศูนย์หัวใจสิริกิติ์ ภาคตะวันออกเฉียงเหนือ
          </a>
        </div>
        <div className="col-6 text-end pr-0">
          <span class="copyright">
            {/* <script>document.write(new Date().getFullYear())</script> */}
            ©2023, made
            <FontAwesomeIcon
            className="heart"
              icon={faHeart}
              style={{ fontSize: 10, color: "red" ,padding:"0px 5px 0px 5px"}}
            />
            with <i class="fa fa- heart"></i> by IT QSHC
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default footer;
