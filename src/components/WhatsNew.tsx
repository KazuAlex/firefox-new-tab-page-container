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

function WhatsNew({ open, onClose }: Props) {
  return (
    <Modal
      aria-labelledby="whats-new-modal-title"
      aria-describedby="whats-new-modal-description"
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
            id="whats-new-modal-title"
            variant="h6"
            component="h2"
          >
            What&apos;s new?
          </Typography>
          <Typography
            id="whats-new-modal-description"
            sx={{ mt: 2 }}
          >
            Changelog coming soon
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}

export default WhatsNew;
