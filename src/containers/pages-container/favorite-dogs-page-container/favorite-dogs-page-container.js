import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getDogsImagesFromLS,
  getNewDogsImagesFromLS,
  getDogsImagesConfig,
  changeDogsImagesCurrentPage,
} from "../../../actions";

import DogCardsList from "../../../components/dog-card-list";

import InfiniteScroll from "react-infinite-scroll-component";

class SelectedBreedPageContainer extends Component {
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

  getDogsImages = (getNewImages) => {
    if (localStorage.hasOwnProperty("favoriteDogsImages")) {
      const favoriteDogsImages = JSON.parse(
        localStorage.getItem("favoriteDogsImages")
      );
      // refactoring
      if (favoriteDogsImages.length > 0) {
        this.props.getDogsImagesConfig(favoriteDogsImages);
        this.getCurrentDogsImages(favoriteDogsImages, getNewImages);
      } else {
        this.setState({ hasMore: false });
      }
    }
  };

  fetchMoreData = () => {
    const {
      favoriteDogsImages,
      dogsImagesTotalLength,
      changeDogsImagesCurrentPage,
      getNewDogsImagesFromLS,
    } = this.props;
    if (favoriteDogsImages.length >= dogsImagesTotalLength) {
      this.setState({ hasMore: false });
      return;
    }
    changeDogsImagesCurrentPage();
    this.getDogsImages(getNewDogsImagesFromLS);
  };

  // regactoring
  componentDidUpdate(prevProps) {
    if (prevProps.dogsImagesTotalLength !== this.props.dogsImagesTotalLength) {
      if (this.props.dogsImagesTotalLength === 1) {
        this.setState({ hasMore: false });
      }
    }
  }

  componentDidMount() {
    this.getDogsImages(this.props.getDogsImagesFromLS);
  }

  render() {
    const { favoriteDogsImages } = this.props;

    const scrollWithDogCards = (
      <InfiniteScroll
        dataLength={favoriteDogsImages.length}
        next={this.fetchMoreData}
        hasMore={this.state.hasMore}
        scrollThreshold={"5px"}
        loader={<h4>Loading...</h4>}
      >
        <DogCardsList dogsImages={favoriteDogsImages} />
      </InfiniteScroll>
    );

    const ifFavoriteDogsImagesEmpty = <p>Избранные песели отсутствуют</p>;

    const pageContent =
      favoriteDogsImages.length > 0
        ? scrollWithDogCards
        : ifFavoriteDogsImagesEmpty;

    return <div className="home-page-container">{pageContent}</div>;
  }
}

const mapStateToProps = ({
  dogsImages,
  dogsImagesTotalPages,
  dogsImagesPerPage,
  dogsImagesCurrentPage,
  dogsImagesTotalLength,
  favoriteDogsImages,
}) => {
  return {
    dogsImages,
    dogsImagesTotalPages,
    dogsImagesPerPage,
    dogsImagesCurrentPage,
    dogsImagesTotalLength,
    favoriteDogsImages,
  };
};

const mapDispatchToProps = {
  getDogsImagesFromLS,
  getNewDogsImagesFromLS,
  getDogsImagesConfig,
  changeDogsImagesCurrentPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedBreedPageContainer);



