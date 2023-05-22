import {
  IconButton,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import ListContainers from '@/components/ListContainers';
import EditContainer from '@/components/EditContainer';
import { useState } from 'react';
import { ContextualIdentity } from '@/types/contextual-identities';

type Props = {
  close: () => void,
};

function ManageContainers({ close }: Props) {
  const [currentContainer, setCurrentContainer] = useState<ContextualIdentity | null>(null);
  const [createNewContainer, setCreateNewContainer] = useState<boolean>(false);

  const editContainer = (identity?: ContextualIdentity) => {
    setCurrentContainer(identity ?? null);
  };

  return (
    <div className="ManageContainers">
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
        <h1>Manage containers</h1>
        <div />
      </Grid>
      {!currentContainer && (
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <ListContainers
            create={editContainer}
            edit={editContainer}
          />
        </Grid>
      )}
      {(currentContainer || createNewContainer) && (
        <Grid display="flex" justifyContent="center" alignItems="center">
          <EditContainer
            close={() => {
              setCurrentContainer(null);
              setCreateNewContainer(false);
            }}
            container={currentContainer || undefined}
          />
        </Grid>
      )}
    </div>
  );
}

export default ManageContainers;
