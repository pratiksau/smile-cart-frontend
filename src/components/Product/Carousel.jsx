import { useEffect, useState, useRef } from "react";

import classNames from "classnames";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";
import { append } from "ramda";
import { useParams } from "react-router-dom";

export const Carousel = () => {
  const { slug } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeRef = useRef(null);

  const { data: { imageUrl, imageUrls: partialImageUrls, title } = {} } =
    useShowProduct(slug);

  const imageUrls = append(imageUrl, partialImageUrls);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
    resetTimer();
  };

  const resetTimer = () => {
    clearInterval(timeRef.current);
    timeRef.current = setInterval(handleNext, 3000);
  };

  useEffect(() => {
    timeRef.current = setInterval(handleNext, 3000);

    return () => clearInterval(timeRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={handlePrevious}
        />
        <img
          alt={title}
          className="max-w-56 h-56 max-h-56 w-56"
          src={imageUrls[currentIndex]}
        />
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={() => {
            handleNext();
            resetTimer();
          }}
        />
      </div>
      <div className="flex space-x-1">
        {imageUrls.map((_, index) => (
          <span
            key={index}
            className={classNames(
              "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
              { "neeto-ui-bg-black": index === currentIndex }
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
