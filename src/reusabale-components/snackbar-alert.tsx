import { Snackbar, Alert } from '@mui/material';

// enum SeverityTypes {"warning", "sucess", "error", "info"}
// const [snackbarSeverity, setSnackbarSeverity] = 
// useState<"warning" | "success" | "info" | "error">("success")
type severityValues = "warning" | "success" | "error" | "info"

interface SnackbarProps {
    open: boolean;
    snackbarseverity: severityValues
    snackbarmsg: string;
    onClose: () => void    
    // toggleOption: ({id}) => void
}


export const SnackbarComp = (props : SnackbarProps) => {
    
    const handleSnackbarClose = () => {
        props.open = false;
        console.log(props.open)
    }

    return (
        <Snackbar
            open={props.open}
            autoHideDuration={1000}
            onClose={props.onClose}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        >
            <Alert 
                onClose={props.onClose} 
                severity={props.snackbarseverity}
                sx={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '80px'
                }}>
                    {props.snackbarmsg}
            </Alert>
        </Snackbar> 
    )

}