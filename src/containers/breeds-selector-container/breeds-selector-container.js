import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBreedList } from "../../actions";
import withDogApiService from "../../components/hoc";
import BreedListContainer from "../breed-list-container";
import SwitchBtnContainer from "../switch-btn-container";

class BreedsSelectorContainer extends Component {
  state = {
    isBreedListOpened: false,
  };

  openBreedList = () => {
    this.setState(({ isBreedListOpened }) => {
      return {
        isBreedListOpened: !isBreedListOpened,
      };
    });
  };

  componentDidMount() {
    this.props.fetchBreedList();
  }

  render() {
    const { isBreedListOpened } = this.state;
    const {selectedBreed} = this.props;
    return (
      <div>
        <button type="button" onClick={this.openBreedList}>
          Породы
        </button>
        {isBreedListOpened && <BreedListContainer />}
        {!selectedBreed && <SwitchBtnContainer />}
      </div>
    );
  }
}

const mapStateToProps = ({ selectedBreed }) => {
  return {
    selectedBreed,
  };
};

const mapDispatchToProps = (dispatch, { dogApiService }) => {
  return {
    fetchBreedList: fetchBreedList(dispatch, dogApiService),
  };
};

export default withDogApiService(
  connect(mapStateToProps, mapDispatchToProps)(BreedsSelectorContainer)
);
