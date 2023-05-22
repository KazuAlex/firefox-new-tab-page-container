import { ColorValues } from '@/types/contextual-identities';
import type { ColorKeys } from '@/types/contextual-identities';
import { Unstable_Grid2 as Grid } from '@mui/material';
import { useState } from 'react';
import type { KeyboardEvent } from 'react';

type Props = {
  color: ColorKeys,
  onChange: (color: ColorKeys) => void,
};

function ColorSelection({ color, onChange }: Props) {
  const [selected, setSelected] = useState<ColorKeys>(color);

  const onKeyUp = (event: KeyboardEvent, name: ColorKeys) => {
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
      {Object.entries(ColorValues).map(([name, value]) => (
        <div
          role="button"
          tabIndex={0}
          aria-label={name}
          onClick={() => {
            setSelected(name as ColorKeys);
            onChange(name as ColorKeys);
          }}
          onKeyUp={(event) => onKeyUp(event, name as ColorKeys)}
        >
          <div
            style={{
              borderRadius: '50%',
              border: selected === name ? '1px solid #fff' : 'none',
              padding: selected === name ? '2px' : '3px',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: value,
                borderRadius: '50%',
              }}
            />
          </div>
        </div>
      ))}
    </Grid>
  );
}

export default ColorSelection;
