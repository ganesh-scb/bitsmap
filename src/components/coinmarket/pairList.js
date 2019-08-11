import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export const radioListPairs = pairObj => {
  return(
    <FormControl component="fieldset">
      <FormLabel component="legend" style={{marginBottom: '15px', color: '#000', fontWeight: 700}}>Select currency pair</FormLabel>
      <RadioGroup aria-label="position" name="position" onChange={pairObj.onSelectPair} row>
      {pairObj.pairsData.map((name, index) => {
        return (
          <FormControlLabel
            checked={name === pairObj.selectedPair}
            value={name}
            control={<Radio color="primary" />}
            label={name}
            labelPlacement="end"
            key={name}
          />
          )
      })}
      </RadioGroup>
    </FormControl>
  )
}
