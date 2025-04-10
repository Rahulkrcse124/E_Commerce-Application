import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};
MetaData.propTypes = {
  title: PropTypes.string.isRequired,
};
export default MetaData;
