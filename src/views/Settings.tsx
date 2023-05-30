import {
  Box,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import type {
  SelectChangeEvent,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  ArrowBack as ArrowBackIcon,
  Info as InfoIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import useSettingsStore from '@/stores/useSettingsStore';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import Theme from '@/types/theme';
import SortOrder from '@/types/sort-order';
import TileSize from '@/types/tile-size';

type Props = {
  close: () => void,
};

function Settings({ close }: Props) {
  const [
    ignoredContainers,
    setIgnoredContainers,
    theme,
    setTheme,
    sortOrder,
    setSortOrder,
    tileSize,
    setTileSize,
  ] = useSettingsStore(
    (state) => [
      state.ignoredContainers,
      state.setIgnoredContainers,
      state.theme,
      state.setTheme,
      state.sortOrder,
      state.setSortOrder,
      state.tileSize,
      state.setTileSize,
    ],
    shallow,
  );

  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [isOnSave, setIsOnSave] = useState(false);

  const [ignoredContainersTemp, setIgnoredContainersTemp] = useState(ignoredContainers);
  const [sortOrderTemp, setSortOrderTemp] = useState<SortOrder>(sortOrder);
  const [tileSizeTemp, setTileSizeTemp] = useState<TileSize>(tileSize);

  const handleIgnoredContainersChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIgnoredContainersTemp(event.target.value);
    setHasUnsaved(true);
  };

  const handleThemeChange = (event: SelectChangeEvent<Theme>) => {
    setTheme(event.target.value as Theme);
  };

  const handleSortOrderChange = (event: SelectChangeEvent<SortOrder>) => {
    setSortOrderTemp(event.target.value as SortOrder);
    setHasUnsaved(true);
  };

  const handleTileSizeChange = (event: SelectChangeEvent<TileSize>) => {
    setTileSizeTemp(event.target.value as TileSize);
    setHasUnsaved(true);
  }

  const [openHelpWithRegexp, setOpenHelpWithRegexp] = useState(false);
  const getHelpWithRegexp = () => {
    setOpenHelpWithRegexp(true);
  };

  const onSave = () => {
    setIsOnSave(true);
    setHasUnsaved(false);
    setIgnoredContainers(ignoredContainersTemp);
    setSortOrder(sortOrderTemp);
    setTileSize(tileSizeTemp);
    setIsOnSave(false);
  };

  return (
    <div className="Settings">
      <Grid
        className="Header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap="5px"
        >
          <IconButton className="go-back-button" onClick={close}>
            <ArrowBackIcon />
          </IconButton>
          Go back
        </Grid>
        <h1>Settings</h1>
        <div>
          <LoadingButton
            variant={hasUnsaved ? 'contained' : 'outlined'}
            loading={isOnSave}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            onClick={onSave}
            disabled={!hasUnsaved}
          >
            {hasUnsaved ? 'Save changes' : 'Saved'}
          </LoadingButton>
        </div>
      </Grid>
      <Container maxWidth="sm">
        <Grid
          id="SettingsList"
          container
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <div>
            <FormControl fullWidth>
              <InputLabel id="theme-selection">Theme</InputLabel>
              <Select
                labelId="theme-selection"
                value={theme}
                onChange={handleThemeChange}
                autoWidth
                label="Theme"
              >
                <MenuItem value={Theme.System}>System</MenuItem>
                <MenuItem value={Theme.Light}>Light</MenuItem>
                <MenuItem value={Theme.Dark}>Dark</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              label="Ignored containers"
              multiline
              rows={4}
              fullWidth
              value={ignoredContainersTemp}
              onChange={handleIgnoredContainersChange}
              variant="filled"
              helperText={
                (
                  <>
                    <span>Regexp separated by comma</span>
                    <IconButton onClick={getHelpWithRegexp}>
                      <InfoIcon />
                    </IconButton>
                  </>
                )
              }
            />
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="sort-order">Sort order</InputLabel>
              <Select
                labelId="sort-order"
                value={sortOrderTemp}
                onChange={handleSortOrderChange}
                autoWidth
                label="Sort Order"
              >
                <MenuItem value={SortOrder.Default}>Default</MenuItem>
                <MenuItem value={SortOrder.Asc}>Ascending</MenuItem>
                <MenuItem value={SortOrder.Desc}>Descending</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="sort-order">Tile size</InputLabel>
              <Select
                labelId="tile-size"
                value={tileSizeTemp}
                onChange={handleTileSizeChange}
                autoWidth
                label="Sort Order"
              >
                <MenuItem value={TileSize.ExtraSmall}>Extra Small</MenuItem>
                <MenuItem value={TileSize.Small}>Small</MenuItem>
                <MenuItem value={TileSize.Default}>Default</MenuItem>
                <MenuItem value={TileSize.Large}>Large</MenuItem>
                <MenuItem value={TileSize.ExtraLarge}>Extra Large</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
      </Container>
      <Modal
        open={openHelpWithRegexp}
        onClose={() => setOpenHelpWithRegexp(false)}
        aria-labelledby="help-regex-title"
        aria-describedby="help-regex-description"
      >
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
            id="help-regexp-title"
            variant="h6"
            component="h2"
          >
            Help with RegExp
          </Typography>
          <Typography
            id="help-regexp-description"
            sx={{ mt: 2 }}
          >
            <div className="RegExpHelp">
              <div>
                You can define multiple regular expressions to hide some containers separated by comma (,).
              </div>
              <div>
                It use the
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test"
                  target="_blank"
                  rel="noreferrer"
                >
                  JavaScript RegExp.test()
                </a>
                function under the hood.
                <br />
              </div>
              <div>
                There is a
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet"
                  target="_blank"
                  rel="noreferrer"
                >
                  Cheatsheet
                </a>
                for Character classes and Assertions.
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Settings;
