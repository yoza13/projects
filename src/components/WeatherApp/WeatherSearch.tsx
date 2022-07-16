import * as React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useStyles } from "../../useStyles";
import TemperatureDetails from "./TemperatureDetails";
import axios from "axios";

interface callApiProps {
  city: string;
  state: string;
  zip: string;
}

export const WeatherSearch: React.FC = () => {
  const [temperature, setTemperature] = React.useState<object>({});
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const callApi = async (data: callApiProps) => {
    const { state, city, zip } = data;
    setIsLoading(true);
    const {
      data: { weatherData },
    } = await axios.post(process.env.WEATHER_URL, {
      state,
      city,
      zip,
    });
    setIsLoading(false);
    if (weatherData.cod === 200) {
      setIsError(false);
      setTemperature(weatherData);
    } else {
      setIsError(true);
      setTemperature({});
    }
    reset();
  };

  return (
    <Container className={classes.appContainer}>
      <Card raised={true} className={classes.contentBox}>
        <CardHeader
          title="Weather App"
          subheader="Enter any of the below details for getting the temperature in celsious to the entered place."
        />
        <Box sx={{ width: "50%", margin: "auto" }}>
          <form autoComplete="off" onSubmit={handleSubmit(callApi)}>
            <Stack direction="column">
              <Controller
                name="city"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      id="outlined-required"
                      label="City"
                      placeholder="Enter City"
                      sx={{ marginBottom: "1rem" }}
                      helperText={errors?.city && "Enter City"}
                    />
                  );
                }}
              ></Controller>
              <Controller
                name="state"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      id="outlined-required"
                      label="State"
                      placeholder="Enter State"
                      sx={{ marginBottom: "1rem" }}
                      helperText="Enter state only for US"
                    />
                  );
                }}
              ></Controller>
              <Controller
                name="zip"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      id="outlined-required"
                      label="Zip"
                      placeholder="Enter Zip"
                      sx={{ marginBottom: "1rem" }}
                      helperText="Enter zip only for US"
                    />
                  );
                }}
              ></Controller>
            </Stack>
            <Button
              type="submit"
              size="large"
              sx={{ margin: "auto", width: "100%" }}
            >
              Get Details
            </Button>
          </form>
        </Box>
      </Card>

      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {Object.keys(temperature) && Object.keys(temperature).length > 0 && (
        <TemperatureDetails {...temperature} />
      )}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Please try again
        </Alert>
      )}
    </Container>
  );
};
