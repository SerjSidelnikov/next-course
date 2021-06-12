import React from 'react';
import cn from 'classnames';

import StarIcon from './star.svg';

import { RatingProps } from './types';

import classes from './Rating.module.css';

const Rating: React.FC<RatingProps> = ({
  className,
  rating,
  onRating,
  isEditable = false,
  ...props
}) => {
  const [ratingArray, setRatingArray] = React.useState<JSX.Element[]>(new Array(5).fill(<></>));

  const constructRating = (currentRating: number) => {
    const updateArray = ratingArray.map((it: JSX.Element, idx: number) => {
      return (
        <StarIcon
          className={cn({ [classes.filled]: idx < currentRating, [classes.editable]: isEditable })}
          onMouseEnter={changeDisplay(idx + 1)}
          onMouseLeave={changeDisplay(rating)}
          onClick={handleChangeRating(idx + 1)}
          onKeyDown={handleKeyPress(idx + 1)}
          tabIndex={isEditable ? 0 : -1}
        />
      );
    });

    setRatingArray(updateArray);
  };

  const changeDisplay = (num: number) => () => {
    if (isEditable) {
      constructRating(num);
    }
  };

  const handleChangeRating = (rating: number) => () => {
    if (isEditable && onRating) {
      onRating(rating);
    }
  };

  const handleKeyPress = (rating: number) => (event: React.KeyboardEvent<SVGElement>) => {
    if (isEditable && onRating && event.code === 'Space') {
      onRating(rating);
    }
  };

  React.useEffect(() => {
    constructRating(rating);
  }, [rating]);

  return (
    <div className={cn(classes.rating, className)} {...props}>
      {ratingArray.map((it, i) => (
        <React.Fragment key={i}>{it}</React.Fragment>
      ))}
    </div>
  );
};

export default Rating;
