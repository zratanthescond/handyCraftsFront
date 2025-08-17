import { LazyLoadImage } from 'react-lazy-load-image-component';

const LazyImage = ({ src, ...rest }) => (
  <div>
    <LazyLoadImage
      src={src}
      {...rest} />
  </div>
);

export default LazyImage;