import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import Masonry from "react-masonry-css";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState([1, 2, 3, 4, 5, 6]);

  const deleteHandler = async (_id) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:8000/notes/${_id}`,
      });
      const newNotes = notes.filter((note) => note._id !== _id);
      setNotes(newNotes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: `http://localhost:8000/notes/`,
      }).then((res) => {
        setNotes(res.data);
        setLoading([]);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {loading.map((e) => (
          <div key={e}>
            <Skeleton height={200} />
          </div>
        ))}
        {notes.map((note) => (
          <div key={note._id}>
            <NoteCard note={note} deleteHandler={deleteHandler} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
