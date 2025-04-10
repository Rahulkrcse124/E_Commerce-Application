import "./NotFound.css";

import ErrorIcon from '@mui/icons-material/Error';
import { Typography} from '@mui/material';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
