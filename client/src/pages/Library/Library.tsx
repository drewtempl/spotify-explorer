import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const Library: React.FC = () => {
  const [total, setTotal] = useState();

  const getLibraryTotal = () => {
    axios
      .get("/api/user-tracks/total")
      .then((res) => {
        setTotal(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLibraryTotal();
  }, []);

  return (
    <Stack alignItems="center" gap={5} mt={5} mb={5} textAlign='center'>
      <Container>
        {total ? (
          <Typography variant="h4">
            You have {total} songs saved in your Spotify library
          </Typography>
        ) : null}
      </Container>
    </Stack>
  );
};
