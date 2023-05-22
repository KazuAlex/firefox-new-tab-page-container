import { IconValues } from '@/types/contextual-identities';
import type { IconKeys } from '@/types/contextual-identities';
import { Unstable_Grid2 as Grid } from '@mui/material';
import { useState } from 'react';
import type { KeyboardEvent } from 'react';

type Props = {
  icon: IconKeys,
  onChange: (icon: IconKeys) => void,
};

function IconSelection({ icon, onChange }: Props) {
  const [selected, setSelected] = useState<IconKeys>(icon);

  const onKeyUp = (event: KeyboardEvent<HTMLDivElement>, name: IconKeys) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setSelected(name);
      onChange(name);
    }
  };

  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      gap="10px"
    >
      {Object.entries(IconValues).map(([name, value]) => (
        <div
          role="button"
          tabIndex={0}
          aria-label={name}
          onClick={() => {
            setSelected(name as IconKeys);
            onChange(name as IconKeys);
          }}
          onKeyUp={(event) => onKeyUp(event, name as IconKeys)}
        >
          <div
            style={{
              borderRadius: '50%',
              border: selected === name ? '1px solid #fff' : 'none',
              padding: selected === name ? '2px' : '3px',
              cursor: 'pointer',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                maskImage: `url(${value})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center center',
                minInlineSize: '24px',
                minBlockSize: '24px',
                inlineSize: '24px',
                blockSize: '24px',
              }}
            />
          </div>
        </div>
      ))}
    </Grid>
  );
}

export default IconSelection;
