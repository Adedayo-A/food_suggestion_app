type severityValues = "warning" | "success" | "error" | "info";

export default interface iSnackbar {
    snackbarMsg: string
    snackbarOpen: boolean
    snackbarSeverity: severityValues
}