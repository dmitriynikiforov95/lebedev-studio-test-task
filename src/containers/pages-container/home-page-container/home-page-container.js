import React, { Component } from "react";
import { connect } from "react-redux";
import { compareRandom, sortAlphabetically, getCurrentDogsImages } from "../../../helper";
import {
  getDogsImagesConfig,
  getDogsImages,
  getNewDogsImages,
  changeDogsImagesCurrentPage,
} from "../../../actions";

import HomePage from "../../../components/pages/home-page";
import withDogApiService from "../../../components/hoc";
import DogCardListContainer from "../../dog-card-list-container";

import InfiniteScroll from "react-infinite-scroll-component";
class HomePageContainer extends Component {
  state = {
    hasMore: true,
  };

  getDogsImages = (getImages) => {
    const { dogApiService, getDogsImagesConfig, dogsImagesCurrentPage, dogsImagesPerPage } = this.props;
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
          return getCurrentDogsImages(res, getImages, dogsImagesCurrentPage, dogsImagesPerPage);
        });
    });
  };

  fetchMoreData = () => {
    const {
      dogsImages,
      dogsImagesTotalLength,
      changeDogsImagesCurrentPage,
      getNewDogsImages,
    } = this.props;

    if (dogsImages.length >= dogsImagesTotalLength) {
      this.setState({ hasMore: false });
      return;
    }
    changeDogsImagesCurrentPage();
    this.getDogsImages(getNewDogsImages);
  };

  componentDidMount() {
    const { getDogsImages } = this.props;
    this.getDogsImages(getDogsImages);
  }

  render() {
    const { dogsImages } = this.props;
    return (
      <div>
        <HomePage />
        <InfiniteScroll
          dataLength={dogsImages.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          scrollThreshold={"5px"}
          loader={<h4>Loading...</h4>}
        >
          <DogCardListContainer dogsImages={dogsImages} />
        </InfiniteScroll>
      </div>
    );
  }
}

function sortDogImages(dogsImages, isSortAlphabetically) {
  let images = dogsImages.slice();

  if (isSortAlphabetically) {
    return images.sort(sortAlphabetically);
  } else {
    return images;
  }
}

const mapStateToProps = ({
  dogsImages,
  dogsImagesTotalPages,
  dogsImagesPerPage,
  dogsImagesCurrentPage,
  dogsImagesTotalLength,
  isSortDogsImagesAlphabetically,
}) => {
  return {
    dogsImages: sortDogImages(dogsImages, isSortDogsImagesAlphabetically),
    dogsImagesTotalPages,
    dogsImagesPerPage,
    dogsImagesCurrentPage,
    dogsImagesTotalLength,
  };
};

const mapDispatchToProps = {
  getDogsImagesConfig,
  getDogsImages,
  getNewDogsImages,
  changeDogsImagesCurrentPage,
};

export default withDogApiService(
  connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)
);




