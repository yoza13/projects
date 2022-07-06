import * as React from "react";
import axios from "axios";
import {
  CircularProgress,
  Container,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  Pagination,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { useStyles } from "../../useStyles";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { useForm, Controller } from "react-hook-form";

interface PhotosProp {
  id: number;
  alt: string;
  photographer: string;
  url: string;
  src: {
    original: string;
    tiny: string;
  };
}

interface SearchData {
  search: string;
}

export const PhotoSearch: React.FC = () => {
  const [photos, setPhotos] = React.useState<PhotosProp[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const classes = useStyles();
  const [page, setPage] = React.useState<number>(0);
  const perPage = 10;
  const totalPages = Math.ceil(photos.length / perPage);
  const startVar = page * perPage;
  const endVar = page * perPage + perPage;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const searchPhotos = React.useCallback(async ({ search }: SearchData) => {
    setIsLoading(true);
    const { data: searchedPhoto } = await axios.get(
      "https://api.pexels.com/v1/search",
      {
        params: {
          query: search,
        },
        headers: {
          Authorization:
            "563492ad6f917000010000014fcb65ef95bf436fb53bd99753d64163",
        },
      }
    );
    setIsLoading(false);
    setPhotos(searchedPhoto.photos);
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    async function getPhoto() {
      const { data } = await axios.get("https://api.pexels.com/v1/curated", {
        params: {
          per_page: 80,
        },
        headers: {
          Authorization:
            "563492ad6f917000010000014fcb65ef95bf436fb53bd99753d64163",
        },
      });
      setPhotos(data.photos);
      setIsLoading(false);
    }
    getPhoto();
  }, []);
  return (
    <Container className={classes.appContainer}>
      <Slide direction="left" in={true}>
        <Typography
          variant="h5"
          variantMapping={{ h5: "h1" }}
          sx={{ fontWeight: "bold", mt: 4, mb: 1 }}
          align="center"
        >
          Photos
        </Typography>
      </Slide>
      <Slide direction="right" in={true}>
        <Divider className={classes.dividerStyle} />
      </Slide>
      <Container
        autoComplete="off"
        component="form"
        onSubmit={handleSubmit(searchPhotos)}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Controller
          name="search"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                id="outlined-required"
                label="Search Images"
                placeholder="Nature, People etc..."
                sx={{ marginBottom: "1rem" }}
                helperText={errors?.search && "Enter Search Criteria"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            );
          }}
        ></Controller>
      </Container>

      {isLoading && <CircularProgress aria-busy={true} size={100} />}

      <Typography align="right">
        Page {page + 1} of {totalPages}
      </Typography>
      <ImageList>
        {photos.slice(startVar, endVar).map((photo) => {
          return (
            <ImageListItem key={photo.id}>
              <img
                src={photo.src.tiny}
                srcSet={photo.src.tiny}
                alt={photo.alt}
                loading="lazy"
              />
              <ImageListItemBar
                title={photo.alt || "Photo"}
                subtitle={<span>by: {photo.photographer}</span>}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${photo.alt}`}
                    onClick={() => window.open(photo.url)}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          );
        })}
      </ImageList>
      <Pagination
        sx={{ mt: 4, "& ul": { justifyContent: "center" } }}
        count={totalPages}
        variant="outlined"
        shape="rounded"
        color="primary"
        onChange={(event) =>
          setPage(Number((event.target as HTMLImageElement).textContent) - 1)
        }
      />
    </Container>
  );
};
