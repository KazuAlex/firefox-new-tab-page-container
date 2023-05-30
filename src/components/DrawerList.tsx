import Changelog from '@/components/Changelog';
import Theme from '@/types/theme';
import useSettingsStore from '@/stores/useSettingsStore';
import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import type {
  SelectChangeEvent,
} from '@mui/material';
import {
  AllInbox as AllInboxIcon,
  NewReleases as NewReleasesIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

type Props = {
  openSettings: () => void,
  openManageContainers: () => void,
};

function DrawerList({ openManageContainers, openSettings }: Props) {
  const [theme, setTheme] = useSettingsStore(
    (state) => [state.theme, state.setTheme],
    shallow,
  );
  const [changelogOpen, setChangelogOpen] = useState(false);

  const handleThemeChange = (event: SelectChangeEvent<Theme>) => {
    setTheme(event.target.value as Theme);
  };

  const handleChangelogOpen = () => {
    setChangelogOpen(true);
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
          <ListItem key="changelog" disablePadding>
            <ListItemButton onClick={handleChangelogOpen}>
              <ListItemIcon>
                <NewReleasesIcon />
              </ListItemIcon>
              <ListItemText primary="Changelog" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Changelog
        open={changelogOpen}
        onClose={() => setChangelogOpen(false)}
      />
    </>
  );
}

export default DrawerList;
