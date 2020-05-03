import React from "react";
import { connect } from "react-redux";
import {toHomePage} from "../../actions";

import AppHeader from "../../components/app-header";

const AppHeaderContainer = () => {
  return <AppHeader toHomePage={toHomePage}/>;
};

const mapDispatchToProps = {
  toHomePage,
};

export default connect(null, mapDispatchToProps)(AppHeaderContainer);
