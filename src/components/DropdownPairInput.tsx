import { Autocomplete, TextField } from '@mui/material';
import { FC, memo, SyntheticEvent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { usePairs } from '../hooks';
import { Pair } from '../types';

type DropdownPairInputProps = {
  defaultPair: Pair;
  onSelect: (pair: Pair) => void;
};

const DropdownPairInput: FC<DropdownPairInputProps> = memo(
  ({ defaultPair, onSelect }) => {
    const [keyword, setKeyword] = useState<string>(defaultPair.label);
    const { pairs } = usePairs(keyword);

    const handleSearchChange = useDebouncedCallback((value: string) => {
      setKeyword(value);
    }, 300);

    return (
      <Autocomplete
        disablePortal
        defaultValue={defaultPair}
        isOptionEqualToValue={(option: Pair, value: Pair) =>
          option.symbol === value.symbol
        }
        options={pairs}
        renderInput={(params) => <TextField {...params} label="PAIR" />}
        onChange={(event: SyntheticEvent, newPair: Pair | null) => {
          if (newPair) onSelect(newPair);
        }}
        onInputChange={(e, inputValue) => handleSearchChange(inputValue)}
      />
    );
  }
);

export default DropdownPairInput;
