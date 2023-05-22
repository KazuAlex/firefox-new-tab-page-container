import useContextualIdentities from '@/hooks/useContextualIdentities';
import type { ContextualIdentity } from '@/types/contextual-identities';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

type Props = {
  create: () => void;
  edit: (container: ContextualIdentity) => void;
};

function ListContainers({ create, edit }: Props) {
  const { identities } = useContextualIdentities();

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
      }}
    >
      {identities.map((identity: ContextualIdentity) => (
        <>
          <ListItemButton onClick={() => edit(identity)}>
            <ListItem
              key={identity.cookieStoreId}
              alignItems="center"
              disablePadding
            >
              <ListItemAvatar>
                <Avatar
                  aria-label={identity.icon}
                  style={{
                    maskImage: `url(${identity.iconUrl})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center center',
                    minInlineSize: '32px',
                    minBlockSize: '32px',
                    inlineSize: '32px',
                    blockSize: '32px',
                    display: 'block',
                    borderRadius: 0,
                    backgroundColor: identity.colorCode,
                    // backgroundColor: 'var(--color)',
                  }}
                  src=""
                  alt=""
                >
                  &nbsp;
                </Avatar>
              </ListItemAvatar>
              <ListItemText>
                {identity.name}
              </ListItemText>
            </ListItem>
          </ListItemButton>
          <Divider variant="inset" component="li" />
        </>
      ))}
      <ListItemButton onClick={create}>
        <ListItem
          key="new-container"
          alignItems="center"
          disablePadding
        >
          <ListItemText>
            Create new container
          </ListItemText>
        </ListItem>
      </ListItemButton>
    </List>
  );
}

export default ListContainers;
