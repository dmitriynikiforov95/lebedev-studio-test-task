import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  dogsImagesRequest,
  dogsImagesError,
  loadDogsImages,
  loadNewDogsImages,
} from "../../actions";
import DogCardList from "../../components/dog-card-list";
import withDogApiService from "../../components/hoc";

import { compareRandom, sortAlphabetically } from "../../helper";
import ErrorIndicator from "./../../components/error-indicator/error-indicator";

const DogCardListContainer = ({
  dogApiService,
  dogs,
  loadDogsImages,
  loadNewDogsImages,
  dogsImagesRequest,
  isDogsImagesLoading,
  isDogsImagesLoadingError,
}) => {
  const initialDogImagesOptions = {
    dogsPerPage: 20,
    dogsTotalLength: null,
  };

  const [dogsOptions, getDogsOptions] = useState(initialDogImagesOptions);
  const { dogsPerPage, dogsTotalLength } = dogsOptions;

  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(1);

  const location = useLocation();
  const currentBreed = location.pathname.slice(1);

  const inintialFavoriteDogs = localStorage.getItem("favoriteDogs")
    ? JSON.parse(localStorage.getItem("favoriteDogs"))
    : [];

  const sliceDogImages = (res) => {
    const indexOfLastItem = page * dogsPerPage;
    const indexOfFirstItem = indexOfLastItem - dogsPerPage;
    const dogsImages = res.slice(indexOfFirstItem, indexOfLastItem);
    return dogsImages;
  };

  let isFetchCancelled = false;

  const getDogImagesSelectedBreed = (getImages) => {
    dogsImagesRequest();
    dogApiService
      .getBreedImages(currentBreed)
      .then(({ message }) => {
        getDogsOptions((prevDogImagesOptions) => {
          return {
            ...prevDogImagesOptions,
            dogsTotalLength: message.length,
          };
        });
        return message;
      })
      .catch((error) => {
        dogsImagesError(error.message);
      })
      .then((dogsImages) => {
        !isFetchCancelled && getImages(sliceDogImages(dogsImages));
      });
  };

  const getDogsImagesAllBreeds = (getImages) => {
    dogsImagesRequest();
    dogApiService.getAllBreedsList().then(({ message }) => {
      const breedsList = Object.keys(message);

      let requests = breedsList.map((breedName) =>
        dogApiService.getBreedImages(breedName)
      );

      Promise.all(requests)
        .then((responses) => {
          responses = responses.map(({ message }) => message);
          responses = [].concat(...responses);
          getDogsOptions((prevDogImagesOptions) => {
            return {
              ...prevDogImagesOptions,
              dogsTotalLength: responses.length,
            };
          });
          responses.sort(compareRandom);
          return responses;
        })
        .catch((error) => {
          dogsImagesError(error.message);
        })
        .then((res) => {
        !isFetchCancelled && getImages(sliceDogImages(res));
        });
    });
  };

  const getFavoriteDogImages = (getImages) => {
    getImages(sliceDogImages(inintialFavoriteDogs), currentBreed);
  };

  useEffect(() => {
    setHasMore(true);
    setPage(1);
  }, [currentBreed]);

  useEffect(() => {
    if (dogs.length === dogsTotalLength) {
      setHasMore(false);
      return;
    }
  }, [dogs.length]);

  useEffect(() => {
    if (page === 1) {
      if (currentBreed === "favorites") {
        getDogsOptions((prevDogImagesOptions) => {
          return {
            ...prevDogImagesOptions,
            dogsTotalLength: inintialFavoriteDogs.length,
          };
        });
        getFavoriteDogImages(loadDogsImages);
      } else if (currentBreed) {
        getDogImagesSelectedBreed(loadDogsImages);
      } else {
        getDogsImagesAllBreeds(loadDogsImages);
      }
    } else {
      if (currentBreed === "favorites") {
        getFavoriteDogImages(loadNewDogsImages);
      } else if (currentBreed) {
        getDogImagesSelectedBreed(loadNewDogsImages);
      } else {
        getDogsImagesAllBreeds(loadNewDogsImages);
      }
    }
    return () => {
      isFetchCancelled = true;
    }
  }, [page, currentBreed]);

  const loadMoreDogsImages = () => {
    if (isDogsImagesLoading) {
      return;
    }
    setPage(page + 1);
  };

  const content = (
    <InfiniteScroll
      dataLength={dogs.length}
      next={loadMoreDogsImages}
      hasMore={hasMore}
      scrollThreshold={"5px"}
      loader={<h4>Loading...</h4>}
    >
      <DogCardList dogs={dogs} currentBreed={currentBreed} />
      {currentBreed === "favorites" && dogs.length === 0 && (
        <p>Сохраненные собаки отсутствуют</p>
      )}
    </InfiniteScroll>
  );

  const hasData = !isDogsImagesLoadingError ? content : <ErrorIndicator />;

  return <>{hasData}</>;
};

const sortDogImages = (dogs, isSortAlphabetically) => {
  let newDogs = dogs.slice();

  if (isSortAlphabetically) {
    return newDogs.sort(sortAlphabetically);
  }
  return newDogs;
};

const mapStateToProps = ({
  dogs,
  isDogsImagesLoading,
  isDogsImagesLoadingError,
  isSortDogsImagesAlphabetically,
}) => {
  return {
    isDogsImagesLoading,
    isDogsImagesLoadingError,
    dogs: sortDogImages(dogs, isSortDogsImagesAlphabetically),
  };
};

const mapDispatchToProps = {
  loadDogsImages,
  loadNewDogsImages,
  dogsImagesRequest,
  dogsImagesError,
};

export default withDogApiService(
  connect(mapStateToProps, mapDispatchToProps)(DogCardListContainer)
);
