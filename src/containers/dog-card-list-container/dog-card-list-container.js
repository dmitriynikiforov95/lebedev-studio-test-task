
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  dogsImagesRequest,
  dogsImagesError,
  loadDogsImages,
} from "../../actions";
import DogCardList from "../../components/dog-card-list";
import withDogApiService from "../../components/hoc";

import { compareRandom, sortAlphabetically } from "../../helper";
import ErrorIndicator from "./../../components/error-indicator/error-indicator";
import Spinner from './../../components/spinner/spinner';
import SearchHint from './../../components/search-hint/search-hint';

const DogCardListContainer = ({
  dogApiService,
  dogs,
  favoriteDogs,
  isSortDogsImagesAlphabetically,
  loadDogsImages,
  dogsImagesRequest,
  isDogsImagesLoading,
  isDogsImagesLoadingError,
  breed,
}) => {


  const [dogsTotalLength, getDogsTotalLength] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);


  let isFetchCancelled = false;

  const dogsPerPage = 15;

  const sliceDogImages = (dogApiImages) => dogApiImages.slice(0, page * dogsPerPage);

  const sortDogImages = (dogs, isSortAlphabetically) => {
    let sortedDogs = dogs.slice();

    if (isSortAlphabetically) {
      return sortedDogs.sort(sortAlphabetically);
    }
    return sortedDogs;
  };

  let slicedDogs = (breed === "favorites") ? sliceDogImages(favoriteDogs) : sliceDogImages(dogs);

  if (!breed) {
    slicedDogs = sortDogImages(slicedDogs, isSortDogsImagesAlphabetically);
  }

  const getDogImagesSelectedBreed = (getImages) => {
    dogsImagesRequest();
    dogApiService
      .getBreedImages(breed)
      .then(({ message }) => {
        getDogsTotalLength(message.length);
        return message;
      })
      .then((dogsImages) => {
        !isFetchCancelled && getImages(dogsImages);
      })
      .catch((error) => {
        dogsImagesError(error.message);
      });
  };

  const getDogsImagesAllBreeds = (getImages) => {
    dogsImagesRequest();
    dogApiService.getAllBreedsList()
      .then(({ message }) => {
        const breedsList = Object.keys(message);

        let requests = breedsList.map((breedName) =>
          dogApiService.getBreedImages(breedName)
        );

        Promise.all(requests)
          .then((responses) => {
            responses = responses.map(({ message }) => message);
            responses = [].concat(...responses);
            getDogsTotalLength(responses.length);
            responses.sort(compareRandom);
            return responses;
          })
          .then((dogsImages) => {
            !isFetchCancelled && getImages(dogsImages);
          })
      })
      .catch((error) => {
        dogsImagesError(error.message);
      });

  };

  useEffect(() => {
    setHasMore(true);
    setPage(1);
  }, [breed]);

  useEffect(() => {
    if (slicedDogs.length === dogsTotalLength) {
      setHasMore(false);
      return;
    }
  }, [slicedDogs.length, dogsTotalLength]);

  useEffect(() => {
    if (page === 1) {
      if (breed === "favorites") {
        getDogsTotalLength(favoriteDogs.length);
      } else if (breed) {
        getDogImagesSelectedBreed(loadDogsImages);
      } else {
        getDogsImagesAllBreeds(loadDogsImages);
      }
    }
    return () => {
      isFetchCancelled = true;
    }
  }, [page, breed]);


  const loadMoreDogsImages = () => {
    if (isDogsImagesLoading) {
      return;
    }
    setPage(page + 1);
  };

  const content = (
    <InfiniteScroll
      style={{ overflow: "visible" }}
      dataLength={slicedDogs.length}
      next={loadMoreDogsImages}
      hasMore={hasMore}
      scrollThreshold={"5px"}
      loader={<Spinner />}
    >
      <DogCardList dogs={slicedDogs} currentBreed={breed} />
    </InfiniteScroll>
  );

  if (breed === "favorites" && favoriteDogs.length === 0) return <SearchHint />;

  const hasData = !isDogsImagesLoadingError ? content : <ErrorIndicator />;

  return <>{hasData}</>;
};

const mapStateToProps = ({
  dogs,
  favoriteDogs,
  isDogsImagesLoading,
  isDogsImagesLoadingError,
  isSortDogsImagesAlphabetically,
}) => {
  return {
    favoriteDogs,
    isDogsImagesLoading,
    isDogsImagesLoadingError,
    dogs,
    isSortDogsImagesAlphabetically
  };
};

const mapDispatchToProps = {
  loadDogsImages,
  dogsImagesRequest,
  dogsImagesError,
};

export default withDogApiService(
  connect(mapStateToProps, mapDispatchToProps)(DogCardListContainer)
);
