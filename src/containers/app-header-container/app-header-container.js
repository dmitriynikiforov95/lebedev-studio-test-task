import React from "react";
import { connect } from "react-redux";
import { toHomePage , toFavoriteDogsPage} from "../../actions";

import AppHeader from "../../components/app-header";

const AppHeaderContainer = ({ toHomePage, toFavoriteDogsPage }) => {
  return <AppHeader toHomePage={toHomePage} toFavoriteDogsPage={toFavoriteDogsPage} />;
};

const mapDispatchToProps = {
  toHomePage,
  toFavoriteDogsPage,
};

export default connect(null, mapDispatchToProps)(AppHeaderContainer);
