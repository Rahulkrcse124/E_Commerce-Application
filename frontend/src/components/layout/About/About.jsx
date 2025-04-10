import "./aboutSection.css";
import rahulImage from "../About/Rahul_image.jpg"
import { Button, Typography, Avatar } from '@mui/material';
import jietLogo from "../About/jiet.png";
import InstagramIcon from '@mui/icons-material/Instagram'; 


const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/model_rahul_0047";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={rahulImage}
              alt="Founder"
            />
            <Typography>Rahul Kumar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @Rahul. 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.jietjodhpur.ac.in/"
              target="blank"
            >
              {/* <YouTubeIcon className="youtubeSvgIcon" /> */}

              <img src={jietLogo} alt="JIET Logo" className="jietLogo"   />
            </a>

            <a href="https://instagram.com/model_rahul_0047" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
