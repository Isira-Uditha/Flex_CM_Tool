import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//Common text field to be used at the login,signup form
const Select_Item = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <label  htmlFor="Role" className="form-label">Select the Role</label>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={label}

        >
            <MenuItem value={10}>Attendee</MenuItem>
            <MenuItem value={20}>Researcher</MenuItem>
            <MenuItem value={30}>Workshop Presenter</MenuItem>
        </Select>
    </Grid>
);

export default Select_Item;