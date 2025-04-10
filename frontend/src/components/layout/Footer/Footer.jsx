import playstore from "../../../images/appstore.png";
import appstore from "../../../images/playstore.png"
import './Footer.css'
const  Footer = ()=>  {
  return (
    <footer  className="footer" >

      <div className='left-footer'>
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App For Android & IOS Mobile Phone</p>
        <img src={playstore} alt="playstore"  className='playstore'/>
        <img src={appstore} alt="appstore"  className='appstore'/>
      </div>

      <div className="middle-footer">
        <h1>ECommerce</h1>
        <p>High Quality Is First Priority</p>
        <p>Coryrights 2025 &copy; Rahul </p>
      </div>

      <div className="right-footer">
        <h4>Follow us</h4>
        <a href="https://www.linkedin.com/in/rahul-kumar-b99aa6288/">LinkedIn</a>
        <a href=" https://www.instagram.com/model_rahul_0047/">Instagram</a>
        <a href="https://github.com/Rahulkrcse124">GitHub</a>
      </div>

      
    </footer>
  )
}
export default Footer;