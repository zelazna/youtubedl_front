import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Request } from "../contexts/RequestsContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const VideoCard = ({ content }: { content: Request }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <video style={{ minWidth: 800 }} controls>
        <source
          src={content.download.url}
          type={`video/${content.extension}`}
        />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </Card>
  );
};

const AudioCard = ({ content }: { content: Request }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        image={content.download.thumbnail_url}
        alt="random"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {content.download.name}
        </Typography>
      </CardContent>
      <audio
        style={{ margin: "0 auto", width: "100%" }}
        controls
        src={content.download.url as string}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </Card>
  );
};

export default function PlayModal({ content }: { content: Request }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton aria-label="play" onClick={handleOpen}>
        <PlayArrowIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {content.extension === "mp3" ? (
            <AudioCard content={content} />
          ) : (
            <VideoCard content={content} />
          )}
        </Box>
      </Modal>
    </div>
  );
}
