import React, { useState } from "react";
import { Box, Chip, Rating, Stack, IconContainerProps } from "@mui/material";
import {
  SentimentVerySatisfied as SentimentVerySatisfiedIcon,
  SentimentSatisfiedAlt as SentimentSatisfiedAltIcon,
  SentimentSatisfied as SentimentSatisfiedIcon,
  SentimentDissatisfied as SentimentDissatisfiedIcon,
  SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

type Rating = {
  label: string;
  value: number | null;
  useStar?: boolean;
}

const initialRatings : Rating[] = [
  { label: "集中度", value: 3 },
  { label: "進捗度", value: 3 },
  { label: "成長度", value: 3 },
  {
    label: "ストレスレベル",
    value: 2,
    useStar: false,
  },
];

const RatingsComponent = () => {
  const [ratings, setRatings] = useState<Rating[]>(initialRatings);

  const handleRatingChange = (index: number, newValue: number | null) => {
    const updatedRatings = ratings.map((rating, i) => {
      if (index === i) {
        return { ...rating, value: newValue };
      }
      return rating;
    });
    setRatings(updatedRatings);
  };
  

  return (
    <Box>
      {ratings.map((rating, index) => (
        <Stack
          key={rating.label}
          direction="row"
          alignItems="center"
          spacing={1}
          mb={2}
        >
          <Chip label={rating.label} variant="outlined" />
          {rating.useStar !== false ? (
            <Rating
              name={`rating-${index}`}
              value={rating.value}
              precision={0.5}
              onChange={(event, newValue) => {
                handleRatingChange(index, newValue);
              }}
            />
          ) : (
            <RadioGroupRating />
          )}
        </Stack>
      ))}
    </Box>
  );
};

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const RadioGroupRating = () => {
  return (
    <StyledRating
      name="highlight-selected-only"
      defaultValue={3}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIcons[value].label}
      highlightSelectedOnly
    />
  );
};

export default RatingsComponent;
