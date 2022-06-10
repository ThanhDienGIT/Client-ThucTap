import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
function FindSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Quận</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Thốt Nốt</MenuItem>
          <MenuItem value={10}>Phong Điền</MenuItem>
          <MenuItem value={10}>Vĩnh Thạnh</MenuItem>
          <MenuItem value={20}>Bình Minh</MenuItem>
          <MenuItem value={30}>Hồng Ngự</MenuItem>
          
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Cần Thơ</MenuItem>
          <MenuItem value={20}>Vĩnh Long</MenuItem>
          <MenuItem value={30}>Đồng Tháp</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default FindSelect