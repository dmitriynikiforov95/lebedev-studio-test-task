import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentDogsImages } from "../../../helper";
import { getDogsImagesConfig, getDogsImages, getNewDogsImages, changeDogsImagesCurrentPage} from "../../../actions";

import SelectedBreedPage from "../../../components/pages/selected-breed-page";
import withDogApiService from "../../../components/hoc";
import DogCardListContainer from "../../dog-card-list-container";

import InfiniteScroll from 'react-infinite-scroll-component';

class SelectedBreedPageContainer extends Component {
  
  state = {
    hasMore: true,
  };

  getDogsImages = (getImages) => {
    const { dogApiService, getDogsImagesConfig, dogsImagesCurrentPage, dogsImagesPerPage } = this.props;

    let breed = window.location.href.match(/.*\/(.*)\/(.*)$/)[2];

    dogApiService
      .getBreedImages(breed)
      .then((res) => {
        getDogsImagesConfig(res.message);
        return res.message;
      })
      .then((res) => {
        return getCurrentDogsImages(res, getImages, dogsImagesCurrentPage, dogsImagesPerPage);
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

  componentDidUpdate(prevProps) {
    if (prevProps.selectedBreed !== this.props.selectedBreed) {
      const { getDogsImages } = this.props;
      this.getDogsImages(getDogsImages);
    }
  }

  componentDidMount() {
    const { getDogsImages } = this.props;
    this.getDogsImages(getDogsImages);
  }

  render() {
    const { dogsImages } = this.props;
    return (
      <div>
        <SelectedBreedPage />
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

const mapStateToProps = ({
  dogsImages,
  dogsImagesTotalPages,
  dogsImagesPerPage,
  dogsImagesCurrentPage,
  dogsImagesTotalLength,
  selectedBreed,
}) => {
  return {
    dogsImages,
    dogsImagesTotalPages,
    dogsImagesPerPage,
    dogsImagesCurrentPage,
    dogsImagesTotalLength,
    selectedBreed,
  };
};

const mapDispatchToProps = {
  getDogsImagesConfig,
  getDogsImages,
  getNewDogsImages,
  changeDogsImagesCurrentPage,
};

export default withDogApiService(
  connect(mapStateToProps, mapDispatchToProps)(SelectedBreedPageContainer)
);



