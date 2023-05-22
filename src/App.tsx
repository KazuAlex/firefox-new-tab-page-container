import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline,
  Drawer,
  Fab,
  useMediaQuery,
} from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import './App.scss';
import DrawerList from '@/components/DrawerList';
import useSettingsStore from '@/stores/useSettingsStore';
import Theme from '@/types/theme';
import IdentityList from '@/views/IdentityList';
import Settings from '@/views/Settings';
import ManageContainers from '@/views/ManageContainers';

function App() {
  enum Pages {
    LIST = 'list',
    SETTINGS = 'settings',
    MANAGE_CONTAINERS = 'manage-containers',
  }

  const [currentPage, setCurrentPage] = useState<Pages>(Pages.LIST);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === Theme.Dark);
    document.documentElement.classList.toggle('light', theme === Theme.Light);
  }, [theme]);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const muiTheme = useMemo(() => {
    let currentTheme = Theme.Light;
    if (theme === Theme.System) {
      currentTheme = prefersDarkMode ? Theme.Dark : Theme.Light;
    } else {
      currentTheme = theme;
    }

    return createTheme({
      palette: {
        mode: currentTheme,
      },
    });
  }, [theme, prefersDarkMode]);

  const openSettings = () => {
    setCurrentPage(Pages.SETTINGS);
    setDrawerOpened(false);
  };

  const openManageContainers = () => {
    setCurrentPage(Pages.MANAGE_CONTAINERS);
    setDrawerOpened(false);
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="App">
        {currentPage === Pages.LIST && (
          <>
            <Fab
              size="small"
              aria-label="add"
              className="drawer-open-icon"
              onClick={() => setDrawerOpened(true)}
            >
              <ChevronRightIcon />
            </Fab>
            <Drawer
              anchor="left"
              open={drawerOpened}
              onClose={() => setDrawerOpened(false)}
            >
              <DrawerList
                openSettings={openSettings}
                openManageContainers={openManageContainers}
              />
            </Drawer>
          </>
        )}
        {currentPage === Pages.SETTINGS && (
          <Settings
            close={() => setCurrentPage(Pages.LIST)}
          />
        )}
        {currentPage === Pages.LIST && (
          <IdentityList />
        )}
        {currentPage === Pages.MANAGE_CONTAINERS && (
          <ManageContainers
            close={() => setCurrentPage(Pages.LIST)}
          />
        )}
      </div>
    </MuiThemeProvider>
  );
}

export default App;
