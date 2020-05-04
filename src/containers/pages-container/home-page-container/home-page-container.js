import React, { Component } from "react";
import { connect } from "react-redux";
import { compareRandom } from "../../../helper";
import { getDogsImagesConfig, getDogsImages, getNewDogsImages, changeDogsImagesCurrentPage} from "../../../actions";

import HomePage from "../../../components/pages/home-page";
import withDogApiService from "../../../components/hoc";
import DogCardList from "../../../components/dog-card-list";

import InfiniteScroll from 'react-infinite-scroll-component';
class HomePageContainer extends Component {
  state = {
    hasMore: true,
  };

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
          <DogCardList dogsImages={dogsImages} />
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = ({
  dogsImages,
  dogsImagesTotalPages,
  dogsImagesPerPage,
  dogsImagesCurrentPage,
  dogsImagesTotalLength,
}) => {
  return {
    dogsImages,
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




