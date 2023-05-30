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
            Changelog coming soon
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}

export default Changelog;
