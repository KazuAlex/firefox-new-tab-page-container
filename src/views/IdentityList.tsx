import { Unstable_Grid2 as Grid } from '@mui/material';
import { KeyboardEvent, useEffect, useMemo } from 'react';
import useContextualIdentities from '@/hooks/useContextualIdentities';
import type { ContextualIdentity } from '@/types/contextual-identities';
import { TileSizeByBreakpoint } from '@/types/tile-size';
import useSettingsStore from '@/stores/useSettingsStore';

function IdentityList() {
  const { filteredIdentities: identities, switchIdentity, switchToNoIdentity } = useContextualIdentities();

  const tileSize = useSettingsStore((state) => state.tileSize);

  const resizeBoxes = () => {
    document.querySelectorAll('.identity-tile').forEach((element: Element) => {
      (element as HTMLElement).style.height = `${(element as HTMLElement).offsetWidth}px`;
    });
  };

  const currentTileSizes = useMemo(
    () => TileSizeByBreakpoint[tileSize],
    [tileSize],
  );

  useEffect(() => {
    window.addEventListener('resize', resizeBoxes);
    return () => {
      window.removeEventListener('resize', resizeBoxes);
    };
  }, []);

  resizeBoxes();

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>, identity?: ContextualIdentity) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (identity) {
        switchIdentity(identity);
      } else {
        switchToNoIdentity();
      }
    }
  };

  return (
    <div className="IdentityList">
      <Grid container className="identities">
        {identities.map((identity: ContextualIdentity) => (
          <Grid
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...currentTileSizes}
          >
            <div className="identity-container">
              <div
                role="button"
                tabIndex={0}
                className="identity-tile"
                style={{
                  backgroundColor: identity.colorCode,
                  height: '100%',
                }}
                onClick={() => switchIdentity(identity)}
                onKeyUp={(event) => handleKeyUp(event, identity)}
              >
                <div>
                  <span
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
                      backgroundColor: 'var(--color)',
                    }}
                  />
                </div>
                <div>
                  {identity.name}
                </div>
              </div>
            </div>
          </Grid>
        ))}
        <Grid
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...currentTileSizes}
        >
          <div className="identity-container">
            <div
              role="button"
              tabIndex={0}
              className="identity-tile no-identity"
              style={{
                height: '100%',
              }}
              onClick={() => switchToNoIdentity()}
              onKeyUp={(event) => handleKeyUp(event)}
            >
              No identity
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default IdentityList;
