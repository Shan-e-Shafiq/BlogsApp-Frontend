import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AppContext } from '../context/ContextAPI';

export default function SnackbarAlert() {


    const { showSnackbarAlert, setshowSnackbarAlert } = React.useContext(AppContext)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setshowSnackbarAlert(prev => { return { ...prev, show: false } });
    };

    return (
        <div>
            <Snackbar open={showSnackbarAlert.show} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert
                    onClose={handleClose}
                    severity={showSnackbarAlert.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {showSnackbarAlert.msg}
                </Alert>
            </Snackbar>
        </div>
    );
}
