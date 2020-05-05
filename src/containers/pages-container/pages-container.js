import React, { Component } from "react";
import { connect } from "react-redux";
import Pages from "../../components/pages/pages";

class PagesContainer extends Component {
  render() {
    const { selectedBreed } = this.props;
    // const selectedBreed = window.location.href.match(/.*\/(.*)\/(.*)$/)[2]
    return <Pages selectedBreed={selectedBreed} />;
  }
}

const mapStateToProps = ({ selectedBreed }) => {
  return {
    selectedBreed,
  };
};

export default connect(mapStateToProps)(PagesContainer);
