import React, { Component } from "react";
import { connect } from "react-redux";
import Pages from "../../components/pages/pages";

class PagesContainer extends Component {
  render() {
    return <Pages />;
  }
}

export default connect()(PagesContainer);
