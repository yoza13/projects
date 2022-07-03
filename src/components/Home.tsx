import * as React from "react";
import {
  Box,
  Stack,
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Link,
} from "@mui/material";
import { useStyles } from "../useStyles";
import axios from "axios";
import MultiProgress from "./MultiProgress";
import FolderZipIcon from "@mui/icons-material/FolderZip";

interface languageProps {
  value: number;
  name: string;
}

interface ProjectInformationProp {
  name: string;
  description: string;
  size: number;
  html_url: string;
  languages: languageProps[];
}

export const Home: React.FC = () => {
  const classes = useStyles();
  const [projectInformation, setProjectInformation] = React.useState<
    ProjectInformationProp[]
  >([]);

  React.useEffect(() => {
    async function callGithub() {
      const { data: weather } = await axios.post(
        "https://j43tz4y7t0.execute-api.us-east-1.amazonaws.com/dev/weather-api",
        {
          state: "",
          city: "Edison",
          zip: "",
        }
      );
      console.log(weather);
      const { data: repoDetails } = await axios.get(
        "https://api.github.com/users/yoza13/repos"
      );
      const languagesPromise = repoDetails.map((repo: any) =>
        axios.get(repo.languages_url)
      );
      const data = await axios.all(languagesPromise);
      const languages = data.map(({ data }) => data);
      const projectDetails = repoDetails.map((repo: any, index: number) => {
        const languageObj = languages[index];
        const values = Object.values(languageObj);
        const total: number = values.reduce<number>(
          (a: number, b: number) => a + b,
          0
        );
        const langObjToSend = Object.keys(languageObj).map((lang) => {
          return {
            name: lang,
            value: (languageObj[lang] / total) * 100,
          };
        });

        return {
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          languages: langObjToSend,
          size: repo.size,
        };
      });
      console.log(projectDetails);
      setProjectInformation(projectDetails);
    }
    callGithub();
  }, []);
  const cellClass: any = {
    HTML: "#3A2E39",
    JavaScript: "#f1e05a",
    TypeScript: "3178c6",
    SQL: "purple",
    JAVA: "turqoise",
    ".NET": "maroon",
  };
  return (
    <Container className={classes.appContainer}>
      {projectInformation.map((project) => {
        return (
          <Card raised={true} sx={{ width: "80%", margin: "auto", mt: 4 }}>
            <CardHeader
              title={project.name}
              subheader={project.description}
            ></CardHeader>
            <MultiProgress elements={project.languages} />
            <CardContent>
              <Box>
                <Typography align="right" sx={{ float: "right" }}>
                  <FolderZipIcon />
                  {project.size}KB
                </Typography>
                <Typography variant="body1">Languages Used -</Typography>
                <ul>
                  {project.languages.map((lang) => {
                    return (
                      <li style={{ color: cellClass[lang.name] }}>
                        <Typography sx={{ color: "black" }}>
                          {lang.name}
                        </Typography>
                      </li>
                    );
                  })}
                </ul>
              </Box>
            </CardContent>
            <CardActions>
              <Link href={project.html_url} variant="body2" target="_blank">
                Learn More
              </Link>
            </CardActions>
          </Card>
        );
      })}
    </Container>
  );
};
