import {
  Backdrop,
  Box,
  Fade,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import type {
  SelectChangeEvent,
} from '@mui/material';
import {
  AllInbox as AllInboxIcon,
  NewReleases as NewReleasesIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import Theme from '@/types/theme';
import { shallow } from 'zustand/shallow';
import useSettingsStore from '@/stores/useSettingsStore';
import { useState } from 'react';

type Props = {
  openSettings: () => void;
  openManageContainers: () => void;
};

function DrawerList({ openManageContainers, openSettings }: Props) {
  const [theme, setTheme] = useSettingsStore(
    (state) => [state.theme, state.setTheme],
    shallow,
  );
  const [whatsNewOpen, setWhatsNewOpen] = useState(false);

  const handleThemeChange = (event: SelectChangeEvent<Theme>) => {
    setTheme(event.target.value as Theme);
  };

  const handleWhatsNew = () => {
    setWhatsNewOpen(true);
  };

  return (
    <>
      <Box
        sx={{ width: 250 }}
        role="presentation"
      >
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <ListItem key="settings" disablePadding>
            <ListItemButton onClick={openSettings}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem key="manage-container" disablePadding>
            <ListItemButton onClick={openManageContainers}>
              <ListItemIcon>
                <AllInboxIcon />
              </ListItemIcon>
              <ListItemText primary="Manage containers" />
            </ListItemButton>
          </ListItem>
          <ListItem
            key="spacer"
            sx={{
              flexGrow: 1,
            }}
          />
          <ListItem
            key="theme"
          >
            <FormControl fullWidth size="small">
              <InputLabel id="theme-selection">Theme</InputLabel>
              <Select
                labelId="theme-selection"
                value={theme}
                onChange={handleThemeChange}
                autoWidth
                label="Theme"
              >
                <MenuItem key={Theme.System} value={Theme.System}>System</MenuItem>
                <MenuItem key={Theme.Light} value={Theme.Light}>Light</MenuItem>
                <MenuItem key={Theme.Dark} value={Theme.Dark}>Dark</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem key="whats-new" disablePadding>
            <ListItemButton onClick={handleWhatsNew}>
              <ListItemIcon>
                <NewReleasesIcon />
              </ListItemIcon>
              <ListItemText primary="What's new?" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Modal
        aria-labelledby="whats-new-modal-title"
        aria-describedby="whats-new-modal-description"
        open={whatsNewOpen}
        onClose={() => setWhatsNewOpen(false)}
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
        <Fade in={whatsNewOpen}>
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
    </>
  );
}

export default DrawerList;
