import React, { Fragment, useRef, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { useUserDataContext } from "../../context/userContext";
import { updateTimeVideo, updateLastVideo } from "../../services/player";
import { Col, Container, Row } from "react-bootstrap";
import { ListGroup, Tab } from "react-bootstrap";
// import geekLanguage from "../../assets/logo/GeekLanguage.png";

const Player = () => {
  const { userDb, english } = useUserDataContext();
  const [course, setCourse] = useState();
  const [isReady, setIsReady] = useState(false);
  const player = useRef();
  console.log(english.video);

  const onReady = useCallback(() => {
    if (!isReady) {
      player.current.seekTo(english.time, "seconds");
      setIsReady(true);
    }
  }, [isReady, english.time]);

  const handleTime = () => {
    updateTimeVideo(userDb.email, player.current.getCurrentTime(), "english");
  };

  const handlelastVideo = () => {
    if (english.video !== undefined) {
      updateLastVideo(userDb.email, english.video, "english");
    } else {
      updateLastVideo(userDb.email, 1, "english");
    }
    console.log("Agregar condición, si es el mismo video no llamar la función");
  };

  return (
    <Fragment>
      <Container fluid>
        <Row style={{ justifyContent: "center", textAlign: "center" }}>
          <Col xs={12} xl={10} className="player-wrapper">
            <ReactPlayer
              ref={player}
              width="100%"
              height="100%"
              url={
                "https://firebasestorage.googleapis.com/v0/b/trainingalexgeek.appspot.com/o/courses%2Fenglish%2FJanzTeacherAlexZepeda.mp4?alt=media&token=b401c50b-911d-4516-950c-d4975920c9c4"
              }
              controls={true}
              onPlay={handlelastVideo}
              onSeek={handleTime}
              onProgress={handleTime}
              onPause={handleTime}
              onReady={onReady}
            />
          </Col>
          <Col className="text-center">
            <ListGroup>
              <ListGroup.Item action href="#link1">
                Vídeo 1
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Vídeo 2
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <h1>English Course</h1>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Player;
