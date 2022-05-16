import React, { useEffect, useLayoutEffect } from 'react'
import { getGroupLocks, deleteGroupLocks, placeLocks, getLocks } from "../redux/Actions/groupAction";
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function groupsLock(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [doors, setDoors] = React.useState([]);


  const dispatch = useDispatch()
  const { state } = useLocation();
  let groupLocks = useSelector(state => state?.groupsdata?.locks)
  let deleteLocks = useSelector(state => state?.groupsdata?.deletelock)
  let placeslock = useSelector(state => state?.groupsdata?.places)
  let locksdata = useSelector(state => state?.groupsdata?.locksdata)

  useEffect(() => {
    dispatch(getGroupLocks(state?.id))

  }, [deleteLocks])
  useLayoutEffect(() => {

    dispatch(getGroupLocks(state?.id))
    dispatch(placeLocks())
    dispatch(getLocks())
  }, [])
  const deleteLock = (e, id) => {
    e.preventDefault()

    dispatch(deleteGroupLocks(id))
    setTimeout(()=>{
      dispatch(getGroupLocks(state?.id))
    },100)

  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangedoors = (event) => {
    const {
      target: { value },
    } = event;
    setDoors(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div>
      <div style={{ marginBottom: 30 }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Places</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Places" />}
          MenuProps={MenuProps}
        >
          {placeslock?.map((place) => (
            <MenuItem
              key={place.name}
              value={place.name}
              style={getStyles(place.name, personName, theme)}
            >
              {place.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Doors</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={doors}
          onChange={handleChangedoors}
          input={<OutlinedInput label="Select Doors" />}
          MenuProps={MenuProps}
        >
          {locksdata?.map((lock) => (
            <MenuItem
              key={lock.name}
              value={lock.name}
              style={getStyles(lock.name, personName, theme)}
            >
              {lock.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{display:"flex",alignSelf:'flex-end'}}>
        <Button variant="outlined" style={{marginLeft:170}} onClick={handleClose}>Cancel</Button>
      <Button variant="contained" style={{marginLeft : 10}}>Add</Button>
      </div>
        </Box>
      </Modal>
        <Button variant="outlined" disableElevation style={{ position: 'absolute', right: 40, top: 50 }} onClick={handleOpen}>
          Add Doors
        </Button>
      </div>
      {
        groupLocks && groupLocks !== undefined && groupLocks?.length > 0 ? groupLocks.map((grouplock, index) => {
          return (
            <div>
              <div class="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-padding MuiListItem-button tss-1aizjzz-listItem mui-1shvljl" tabindex="0" href="/organization/907/groups/39517"><div class="MuiListItemAvatar-root mui-a5kqs7"><div class="MuiAvatar-root MuiAvatar-rounded mui-1qpf83n"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yLjc4MjM1IDIuMzMzMzlDMi43ODIzNSAxLjI4NDk3IDMuNjMyMjYgMC40MzUwNTkgNC42ODA2OCAwLjQzNTA1OUgxMS4zNDczQzEyLjM5NTggMC40MzUwNTkgMTMuMjQ1NyAxLjI4NDk3IDEzLjI0NTcgMi4zMzMzOVYxMy42NjY3QzEzLjI0NTcgMTQuNzE1MSAxMi4zOTU4IDE1LjU2NTEgMTEuMzQ3MyAxNS41NjUxSDQuNjgwNjhDMy42MzIyNiAxNS41NjUxIDIuNzgyMzUgMTQuNzE1MSAyLjc4MjM1IDEzLjY2NjdWMi4zMzMzOVpNNC42ODA2OCAxLjU2NTA2QzQuMjU2MzQgMS41NjUwNiAzLjkxMjM1IDEuOTA5MDUgMy45MTIzNSAyLjMzMzM5VjEzLjY2NjdDMy45MTIzNSAxNC4wOTExIDQuMjU2MzQgMTQuNDM1MSA0LjY4MDY4IDE0LjQzNTFIMTEuMzQ3M0MxMS43NzE3IDE0LjQzNTEgMTIuMTE1NyAxNC4wOTExIDEyLjExNTcgMTMuNjY2N1YyLjMzMzM5QzEyLjExNTcgMS45MDkwNSAxMS43NzE3IDEuNTY1MDYgMTEuMzQ3MyAxLjU2NTA2SDQuNjgwNjhaIiBmaWxsPSIjNzE3MDZFIi8+CjxwYXRoIGQ9Ik0xMC4wMTQgNy41QzEwLjAxNCA3LjIyMzg2IDEwLjIzNzkgNyAxMC41MTQgN0gxMC42NDRDMTAuOTIwMiA3IDExLjE0NCA3LjIyMzg2IDExLjE0NCA3LjVWOC41QzExLjE0NCA4Ljc3NjE0IDEwLjkyMDIgOSAxMC42NDQgOUgxMC41MTRDMTAuMjM3OSA5IDEwLjAxNCA4Ljc3NjE0IDEwLjAxNCA4LjVWNy41WiIgZmlsbD0iIzcxNzA2RSIvPgo8L3N2Zz4K" class="MuiAvatar-img mui-1hy9t21" /></div></div><div class="MuiListItemText-root MuiListItemText-multiline tss-19yy3is-listItemText mui-1fthxyh"><span class="MuiTypography-root MuiTypography-body1 MuiListItemText-primary mui-1i9xwa4"><div class="tss-7roia7-text"><span>{grouplock?.lock?.name}</span></div></span><p class="MuiTypography-root MuiTypography-body2 MuiListItemText-secondary mui-n8ftt8"><span class="tss-1rgro97-textRegular"><span>{grouplock?.place?.name}</span></span><span style={{ marginLeft: 20 }}>{grouplock?.lock?.name}</span></p></div><div class="tss-opxxe6-listItem"></div><span class="tss-n6ci8i-item"><div class="tss-1qpvmbp-wrapper" onClick={(e) => { deleteLock(e, grouplock.id) }}>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMCAzQzkuNDQ3NzIgMyA5IDMuNDQ3NzIgOSA0SDVWNkgxOVY0SDE1QzE1IDMuNDQ3NzIgMTQuNTUyMyAzIDE0IDNIMTBaTTYgN0gxOFYxOEMxOCAxOS42NTY5IDE2LjY1NjkgMjEgMTUgMjFIOUM3LjM0MzE1IDIxIDYgMTkuNjU2OSA2IDE4VjdaIiBmaWxsPSIjNzE3MDZFIi8+Cjwvc3ZnPgo=" />
              </div><div class="tss-1qpvmbp-wrapper"></div></span><span class="tss-n6ci8i-item"><div class="MuiAvatar-root MuiAvatar-circular tss-1j7n32h-avatar mui-qxx1px" data-test-id="timeRestriction"></div><div class="tss-5zhxs0-gap"></div><div class="MuiAvatar-root MuiAvatar-circular tss-1j7n32h-avatar mui-qxx1px" data-test-id="geofenceRestriction"></div><div class="tss-5zhxs0-gap"></div><div class="MuiAvatar-root MuiAvatar-circular tss-1j7n32h-avatar mui-qxx1px" data-test-id="readerRestriction"></div></span><span class="MuiTouchRipple-root mui-w0pj6f"></span></div>

            </div>
          )
        })
          :
          <div>
            <CircularProgress />

          </div>
      }
    </div>
  )
}

export default groupsLock