const style = {
  backgroundColor: "#4CAF50",
  border: "none",
  color: "white",
  padding: "10px 10px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer",
};

const Loading = () => (
  <div className="loading">
   
    <div className="box-loading">
      <div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>        
        <span>Loading</span>
      </div>
    </div>
  </div>
);

export default Loading;
