import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ConfirmDialog from "./ConfirmDialog"; // Asegúrate de ajustar la ruta de importación según tu estructura
import {
  elegiblePrescriptions,
  markWithdrawal,
  registerWithdrawal,
} from "../services";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { format } from "date-fns";

const WithdrawalListDialog = ({ open, onClose, patientId }) => {
  const [prescriptions, setPrescriptions] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const fetchPrescriptions = async (patientId) => {
    try {
      const prescriptions = await elegiblePrescriptions(patientId);
      setPrescriptions(prescriptions);
      setLoading(false);
    } catch (err) {
      console.log("Error al obtener las recetas", err);
    }
  };

  useEffect(() => {
    if (open && patientId) {
      setLoading(true);
      fetchPrescriptions(patientId);
    }
  }, [open, patientId]);

  const handleSelectPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setConfirmDialogOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedPrescription) {
      try {
        // Realiza la acción de retiro con el prescription_id y withdrawal_number
        await markWithdrawal(
          selectedPrescription.prescription_id,
          selectedPrescription.withdrawal_number,
          true
        );
        await registerWithdrawal(
          selectedPrescription.patient_id,
          selectedPrescription.prescription_id,
          selectedPrescription.medication,
          selectedPrescription.withdrawal_number
        );
        enqueueSnackbar("Retiro exitoso", {
          autoHideDuration: 900,
          variant: "success",
        });
        // Manejar la respuesta si es necesario
        console.log(selectedPrescription);
        setConfirmDialogOpen(false);
        onClose(); // Cierra el diálogo después de la confirmación
      } catch (error) {
        enqueueSnackbar("Error al registrar el retiro", {
          autoHideDuration: 900,
          variant: "error",
        });
        console.error("Error al confirmar el retiro:", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"sm"}>
      <DialogTitle>Seleccionar receta para retiro</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {prescriptions.length ? (
              prescriptions.map((prescription) => (
                <ListItem key={prescription.prescription_id} divider>
                  <ListItemText
                    primary={`Medicamentos: ${JSON.parse(
                      prescription.medication
                    )
                      .map((medication, index) => medication)
                      .join(", ")} `}
                    secondary={`Vencimiento: ${format(
                      new Date(prescription.expiration),
                      "dd/MM/yyyy"
                    )}`}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleSelectPrescription(prescription)}
                  >
                    Retirar
                  </Button>
                </ListItem>
              ))
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Typography variant="subtitle1">
                  Sin Retiros Disponibles
                </Typography>
              </Box>
            )}
          </List>
        )}
        {/* 
        {prescriptions && prescriptions.length > 0 ? (
          <ul>
            {prescriptions.map((prescription) => (
              <li key={prescription.prescription_id}>
                {prescription.medication}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSelectPrescription(prescription)}
                >
                  Retirar
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay recetas disponibles para retiro.</p>
        )} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cerrar
        </Button>
      </DialogActions>
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        title="Confirmar retiro"
        description={`¿Desea efectuar el retiro de los medicamentos?`}
        onAction={handleConfirm}
        actionButton="Confirmar"
      />
    </Dialog>
  );
};

export default WithdrawalListDialog;
