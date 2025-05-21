import { Box, 
    IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    Snackbar,
    Alert,
    Card} 
    from '@mui/material'

{/* Modal Dialog for Adding New Product */}

export default function DiaglogButton(props) {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>

            <DialogTitle>Add New Product</DialogTitle>

            <DialogContent>
                
                <TextField
                    margin="dense"
                    name="title"
                    label="Ingredient Name"
                    type="text"
                    fullWidth
                    value={""}
                    onChange={props.handleChange}
                />

                <Button
                    variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        type="file"
                        hidden
                    />
                </Button>

            </DialogContent>

            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleAddProduct} color="primary" variant="contained">
                    Add Product
                </Button>
            </DialogActions>

        </Dialog> 
    )
}