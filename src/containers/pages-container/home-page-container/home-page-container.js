import React, { Component } from "react";
import { connect } from "react-redux";
import { compareRandom } from "../../../helper";
import { getDogsImagesConfig, getDogsImages } from "../../../actions";

import HomePage from "../../../components/pages/home-page";
import withDogApiService from "../../../components/hoc";

class HomePageContainer extends Component {

  getCurrentDogsImages = (images, getNewImages) => {
    const { dogsImagesCurrentPage, dogsImagesPerPage } = this.props;
    let indexOfLastItem = dogsImagesCurrentPage * dogsImagesPerPage;
    let indexOfFirstItem = indexOfLastItem - dogsImagesPerPage;
    let dogsImages = images.slice(indexOfFirstItem, indexOfLastItem);
    return getNewImages(dogsImages);
  };

  getDogsImages = (getImages) => {
    const { dogApiService, getDogsImagesConfig } = this.props;
    dogApiService.getAllBreedsList().then((res) => {
      let breedsList = Object.keys(res.message);

      let requests = breedsList.map((breedName) =>
        dogApiService.getBreedImages(breedName)
      );

      Promise.all(requests)
        .then((responses) => {
          responses = responses.map((response) => response.message);
          responses = [].concat(...responses);
          getDogsImagesConfig(responses);
          responses.sort(compareRandom);
          return responses;
        })
        .then((res) => {
          return this.getCurrentDogsImages(res, getImages);
        });
    });
  };

  componentDidMount() {
    const { getDogsImages } = this.props;
    this.getDogsImages(getDogsImages);
  }

  render() {
    return <HomePage />;
  }
}

const mapStateToProps = ({
  dogsImages,
  dogsImagesTotalPages,
  dogsImagesPerPage,
  dogsImagesCurrentPage,
}) => {
  return {
    dogsImages,
    dogsImagesTotalPages,
    dogsImagesPerPage,
    dogsImagesCurrentPage,
  };
};

const mapDispatchToProps = {
  getDogsImagesConfig,
  getDogsImages,
};

export default withDogApiService(
  connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)
);




