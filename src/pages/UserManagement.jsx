import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useChangeUserStatusMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../features/user/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import { deleteCookie } from '../config/functions/useCookie';
import { TOKEN } from '../config/constants/host';

const columns = [
  { field: 'id', headerName: 'ID', width: 210 },
  {
    field: 'name',
    headerName: 'Full name',
    width: 220,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
  },
  {
    field: 'lastLoginTime',
    headerName: 'LastLoginTime',
    width: 190,
    valueGetter: (params) =>
      `${moment(params.row.lastLoginTime).format('D MMMM YYYY')}`,
  },
  {
    field: 'lastRegistrationTime',
    headerName: 'LastaRegistrationTime',
    width: 190,
    valueGetter: (params) =>
      `${moment(params.row.lastRegistrationTime).format('D MMMM YYYY')}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 90,
  },
];

const UserManagement = () => {
  const { isError, isSuccess, error, data, isLoading } = useGetAllUsersQuery();
  const [changeUserStatus] = useChangeUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [allUser, setAllUser] = useState([]);
  const [selectedUsers, setSelectedUSers] = useState([]);

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleChangeUserStatus = (selectedIds, status) => {
    changeUserStatus({ selectedIds, status })
      .then((data) => {
        toast.success(
          `${
            selectedUsers.length === 1
              ? selectedUsersWithNames[0]?.status === 'active'
                ? `${selectedUsersWithNames[0]?.name}'s status successfully blocked`
                : `${selectedUsersWithNames[0]?.name}'s status successfully activated`
              : "All selected users'status changed successfully"
          }`
        );
        setSelectedUSers([]);
        let newUser = data?.data?.users?.find((item) => item._id === user._id);
        dispatch(setUser(newUser));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleDeleteUser = (id) => {
    deleteUser(id)
      .then((data) => {
        toast.success(data?.data?.message);
        setSelectedUSers([]);
        let newUser = data?.data?.users?.find((item) => item._id === user._id);
        dispatch(setUser(newUser));
      })
      .catch((er) => toast.error(er.data?.message));
  };
  let allData = [];
  allUser?.forEach((item) => {
    let user = {
      id: item._id,
      name: item.name,
      lastLoginTime: item.lastLoginTime,
      lastRegistrationTime: item.lastRegistrationTime,
      status: item.status,
      email: item.email,
    };
    allData.push(user);
  });
  let selectedUsersWithNames = allData.filter(
    (item) => item.id === selectedUsers[0]
  );

  useEffect(() => {
    if (isSuccess) {
      setAllUser(data);
    }
    if (isError) {
      toast.error('Something went wrong');
      navigator('/signin');
    }
    if (user?.status === 'blocked' || !user) {
      deleteCookie(TOKEN);
      navigator('/');
    }
  }, [
    isError,
    isSuccess,
    data,
    error,
    navigator,
    user,
    selectedUsers,
    selectedUsersWithNames,
  ]);

  const logoutUser = () => {
    deleteCookie(TOKEN);
    navigator('/');
  };

  return (
    <Box sx={{ padding: '0 10px' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              {user?.name}
            </Typography>

            <IconButton onClick={logoutUser} sx={{ color: 'white' }}>
              <LogoutIcon fontSize='medium' />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
          padding: '10px',
          marginTop: '10px',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
          }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
            }}>
            <Button
              onClick={() =>
                handleChangeUserStatus(
                  selectedUsers.length > 0 ? selectedUsers : selectedUsers,
                  'blocked'
                )
              }
              variant='contained'
              color='primary'>
              Block
            </Button>
            <Button
              onClick={() =>
                handleChangeUserStatus(
                  selectedUsers.length > 0 ? selectedUsers : selectedUsers,
                  'active'
                )
              }
              color='success'
              variant='contained'>
              Unblock
            </Button>
            <IconButton
              onClick={() =>
                handleDeleteUser(
                  selectedUsers.length > 0 ? selectedUsers : selectedUsers
                )
              }
              disabled={isLoading}
              color='error'
              aria-label='delete'>
              <DeleteIcon fontSize='medium' />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <DataGrid
                rows={allData}
                columns={columns}
                rowSelectionModel={selectedUsers}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowSelectionModelChange={(row) => setSelectedUSers(row)}
                hideFooterSelectedRowCount
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagement;
