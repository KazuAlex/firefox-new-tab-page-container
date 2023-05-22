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
  Settings as SettingsIcon,
  AllInbox as AllInboxIcon,
} from '@mui/icons-material';
import Theme from '@/types/theme';
import { shallow } from 'zustand/shallow';
import useSettingsStore from '@/stores/useSettingsStore';

type Props = {
  openSettings: () => void;
  openManageContainers: () => void;
};

function DrawerList({ openManageContainers, openSettings }: Props) {
  const [theme, setTheme] = useSettingsStore(
    (state) => [state.theme, state.setTheme],
    shallow,
  );

  const onThemeChange = (event: SelectChangeEvent<Theme>) => {
    setTheme(event.target.value as Theme);
  };

  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
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
        <ListItem key="theme">
          <FormControl fullWidth size="small">
            <InputLabel id="theme-selection">Theme</InputLabel>
            <Select
              labelId="theme-selection"
              value={theme}
              onChange={onThemeChange}
              autoWidth
              label="Theme"
            >
              <MenuItem key={Theme.System} value={Theme.System}>System</MenuItem>
              <MenuItem key={Theme.Light} value={Theme.Light}>Light</MenuItem>
              <MenuItem key={Theme.Dark} value={Theme.Dark}>Dark</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
      </List>
    </Box>
  );
}

export default DrawerList;
