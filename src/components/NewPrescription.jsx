import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Autocomplete,
  InputLabel,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { addPrescription } from "../services"; // Importa el método
import { useSnackbar } from "notistack";

const NewPrescription = ({ open, handleClose, patient }) => {
  const [medicationsList, setMedicationsList] = useState([undefined]);
  const [fotoReceta, setFotoReceta] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [validityPeriod, setValidityPeriod] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const medications = [
    "Paracetamol",
    "Ibuprofeno",
    "Amoxicilina",
    "Azitromicina",
    "Loratadina",
    "Omeprazol",
    "Metformina",
    "Enalapril",
    "Atorvastatina",
    "Acetaminofén",
    "Diclofenaco",
    "Cefalexina",
    "Losartán",
    "Furosemida",
    "Dexametasona",
    "Ranitidina",
    "Clonazepam",
    "Simvastatina",
    "Levotiroxina",
    "Albuterol",
  ];

  useEffect(() => {
    if (open) {
      setMedicationsList([undefined]);
      setFotoReceta(null);
      setFotoPreview(null);
      setValidityPeriod("");
    }
  }, [open]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFotoPreview(reader.result);
      reader.readAsDataURL(file);
      setFotoReceta(file);
    } else {
      setFotoPreview(null);
    }
  };

  const handleAddMedication = () => {
    setMedicationsList([...medicationsList, undefined]);
  };

  const handleMedicationChange = (index, newValue) => {
    const updatedList = medicationsList.map((medication, i) =>
      i === index ? newValue : medication
    );
    setMedicationsList(updatedList);
  };

  const handleSubmit = async () => {
    // Crear un objeto con los datos de la prescripción
    const prescriptionData = {
      patientId: patient.id,
      medications: medicationsList, // Solo envía medicamentos seleccionados
      fotoReceta,
      validityPeriod,
    };
    console.log("medications", medicationsList);
    try {
      // Llamar al método para agregar la prescripción
      await addPrescription(prescriptionData);
      console.log("Prescripción agregada exitosamente");
      enqueueSnackbar("Receta agregada exitosamente", {
        autoHideDuration: 900,
        variant: "success",
      });
      handleClose();
    } catch (error) {
      enqueueSnackbar("Error al agregar la receta", {
        autoHideDuration: 900,
        variant: "error",
      });
      console.error("Error al agregar la prescripción:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Nueva Receta
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: "absolute", right: 8, top: 8, color: "grey[500]" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Nombre: {patient.first_name} {patient.last_name}
        </Typography>
        <Typography variant="body1">DNI: {patient.dni}</Typography>

        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <InputLabel>Foto de la receta</InputLabel>
          <Button variant="contained" component="label">
            Cargar foto receta
            <input type="file" hidden onChange={handleFotoChange} />
          </Button>

          {fotoPreview && (
            <Box
              mt={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <img
                src={fotoPreview}
                alt="Vista previa"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
              />
              <Typography variant="body2" color="textSecondary">
                {fotoReceta?.name}
              </Typography>
            </Box>
          )}

          {medicationsList.map((medication, index) => (
            <Autocomplete
              key={index}
              disableClearable
              options={medications}
              value={medication || null}
              onChange={(e, newValue) =>
                handleMedicationChange(index, newValue)
              }
              isOptionEqualToValue={(option, value) =>
                option === value || value === null
              }
              renderInput={(params) => (
                <TextField {...params} label={`Medicamento ${index + 1}`} />
              )}
            />
          ))}

          <Button variant="outlined" size="small" onClick={handleAddMedication}>
            Agregar Medicación
          </Button>

          <Typography variant="body1" mt={2}>
            Validez de la receta:
          </Typography>
          <FormControl>
            <RadioGroup
              row
              value={validityPeriod}
              onChange={(e) => setValidityPeriod(e.target.value)}
            >
              <FormControlLabel
                value="30"
                control={<Radio />}
                label="30 Días"
              />
              <FormControlLabel
                value="60"
                control={<Radio />}
                label="60 Días"
              />
              <FormControlLabel
                value="90"
                control={<Radio />}
                label="90 Días"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Observación"
            value={patient.observations}
            disabled
            multiline
            rows={3}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Agregar Receta
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPrescription;
