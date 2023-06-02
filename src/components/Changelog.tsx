import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Typography,
} from '@mui/material';

type Props = {
  open: boolean,
  onClose: () => void,
};

function Changelog({ open, onClose }: Props) {
  return (
    <Modal
      aria-labelledby="changelog-modal-title"
      aria-describedby="changelog-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            maxHeight: 'calc(100vh - 50px)',
            overflow: 'scroll',
          }}
        >
          <Typography
            id="changelog-modal-title"
            variant="h6"
            component="h2"
          >
            Changelog
          </Typography>
          <Typography
            id="changelog-modal-description"
            sx={{ mt: 2 }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: 2 }}
            >
              Version 4.1.0
            </Typography>
            <Typography sx={{ mt: 2 }}>
              UI tweaks<br />
              New features:
              <ul>
                <li>Change order of containers under Settings page</li>
                <li>Choose tile size under Settings page</li>
                <li>Implement changelog modal</li>
              </ul>
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: 4 }}
            >
              Version 4.0.0
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Complete rework of code<br />
              Many new features:
              <ul>
                <li>Introduce a left drawer pane</li>
                <li>Containers are managed in dedicated page</li>
                <li>New settings page</li>
                <li>Can filter containers list with setting "ignored containers"</li>
                <li>New theme setting : "system" that display light or dark mode depending on your system preference</li>
              </ul>
            </Typography>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}

export default Changelog;
