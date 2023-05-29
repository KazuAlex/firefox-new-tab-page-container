import { ContextualIdentity } from '@/types/contextual-identities';
import type { ColorKeys, IconKeys } from '@/types/contextual-identities';
import { useState } from 'react';
import ColorSelection from '@/components/ColorSelection';
import IconSelection from '@/components/IconSelection';
import { LoadingButton } from '@mui/lab';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  TextField,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import useContextualIdentities from '@/hooks/useContextualIdentities';

type Props = {
  container?: ContextualIdentity,
  close: () => void,
};

function EditContainer({ close, container }: Props) {
  const [name, setName] = useState<string>(container?.name ?? '');
  const [color, setColor] = useState<ColorKeys>(container?.color ?? 'toolbar');
  const [icon, setIcon] = useState<IconKeys>(container?.icon ?? 'circle');
  const [isOnDelete, setIsOnDelete] = useState<boolean>(false);
  const [isOnSave, setIsOnSave] = useState<boolean>(false);

  const { createIdentity, updateIdentity, removeIdentity } = useContextualIdentities();

  const onDelete = async () => {
    setIsOnDelete(true);
  };

  const onSave = async () => {
    setIsOnSave(true);
    if (container?.cookieStoreId) {
      await updateIdentity(container.cookieStoreId, {
        name,
        color,
        icon,
      });
      setIsOnSave(false);
    } else {
      await createIdentity({
        name,
        color,
        icon,
      });
      setIsOnSave(false);
    }
    close();
  };

  const handleModalCancel = () => {
    setIsOnDelete(false);
  };

  const handleModalConfirmDelete = async () => {
    setIsOnDelete(false);
    if (container) {
      await removeIdentity(container.cookieStoreId);
    }
    close();
  };

  return (
    <>
      <div className="EditContainer">
        <Grid
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap="5px"
        >
          <IconButton className="go-back-button" onClick={close}>
            <ArrowBackIcon />
          </IconButton>
          Go back to list
        </Grid>
        <div>
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="20px"
          >
            <div>
              <TextField
                id="container-name"
                label="Name"
                variant="standard"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div>
              <ColorSelection
                color={color}
                onChange={setColor}
              />
            </div>
            <div>
              <IconSelection
                icon={icon}
                onChange={setIcon}
              />
            </div>
            <div
              style={{
                alignSelf: 'flex-end',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '15px',
              }}
            >
              <LoadingButton
                variant="outlined"
                color="error"
                loading={isOnDelete}
                loadingPosition="start"
                startIcon={<DeleteIcon />}
                onClick={onDelete}
              >
                Delete
              </LoadingButton>
              <LoadingButton
                variant="contained"
                loading={isOnSave}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                onClick={onSave}
              >
                Save changes
              </LoadingButton>
            </div>
          </Grid>
        </div>
      </div>
      <Dialog
        open={isOnDelete}
        onClose={() => setIsOnDelete(false)}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this container ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalCancel} autoFocus>Cancel</Button>
          <Button onClick={handleModalConfirmDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditContainer;
