import React, { useState, useEffect } from 'react';
import { fetchImages } from '../service/api';
import { Container } from './App.styled';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImagesData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchImages(query, page);

        if (data.hits.length === 0) {
          setLoadMore(false);
          setIsLoading(false);
          toast.info('Sorry, no images found. Try something else! 🤔', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
        setImages(prevImages => [...prevImages, ...data.hits]);
        setLoadMore(page < Math.ceil(data.totalHits / 12));
      } catch (error) {
        toast.error(`Error fetching images: ${error} ⛔️`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagesData();
  }, [page, query]);

  const handleSearchSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = largeImageURL => {
    setSelectedImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {loadMore && !isLoading && <Button onClick={loadMoreImages} />}
      {selectedImage && (
        <Modal largeImageURL={selectedImage} onClose={handleCloseModal} />
      )}
      <ToastContainer />
    </Container>
  );
}
