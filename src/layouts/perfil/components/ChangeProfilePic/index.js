import useAuth from 'hooks/useAuth';

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiDropzone from "components/SuiDropzone";

// sweetalert2 components
import Swal from "sweetalert2";

function ProfilePic() {
  const { auth } = useAuth();

  const picRequirements = [
    "Foto con calidad estimada de 720px x 720px.",
    "Debe ser desde los hombros hacia arriba.",
    "Preferiblemente con fondo de color neutro o desenfocado.",
  ];

  const renderpicRequirements = picRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <SuiBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <SuiTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </SuiTypography>
      </SuiBox>
    );
  });

    return (
      <Card id="cambiar-foto">
        <SuiBox pl={3} pt={3}>
          <SuiTypography variant="h5">Cambiar foto de perfil</SuiTypography>
        </SuiBox>
        <SuiBox pl={2.5} pr={2.5} pt={-1} pb={3}>
        <SuiDropzone options={{ addRemoveLinks: true, 
            autoProcessQueue: false,
            uploadMultiple: false,
            paramName: "FormFile",
            renameFile: function () {
              let newName = `${auth.usuario + '.png'}`;
              return newName;
          },
            maxFiles: 1, init: function() {
              let myDropzone = this;

              document.getElementById('enviar-foto').addEventListener("click", function (e) {
                  e.preventDefault();
                  myDropzone.processQueue();
              });

              this.on("maxfilesexceeded", function(file) {
                    this.removeAllFiles();
                    this.addFile(file);
              })

              this.on('complete', function () {
                setTimeout(Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Foto de perfil modificada satisfactoriamente',
                  timerProgressBar: true,
                  timer: 2500,
                  showConfirmButton: false,
                }), 1000)
                setTimeout(location.reload.bind(location), 3200);
              });

          },
            acceptedFiles: ".png, .jpeg, .jpg", 
            dictDefaultMessage: 'Suba o arrastre su nueva foto de perfil aquí'}} />
            <SuiBox mt={6} mb={1}>
              <SuiTypography variant="h5">Requisitos de la foto de perfil</SuiTypography>
            </SuiBox>
            <SuiBox mb={1}>
              <SuiTypography variant="body2" color="text">
                Por favor seguir esta guía para realizar un cambio en su foto de perfil
              </SuiTypography>
            </SuiBox>
            <SuiBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
              <SuiBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
              {renderpicRequirements}
              </SuiBox>
              <SuiBox ml="auto">
                <SuiButton 
                variant="gradient" 
                color="dark" 
                size="small"
                type="submit"
                id="enviar-foto"
                //onClick={EsoMismo}
                >
                  Cambiar foto
                </SuiButton>
              </SuiBox>
            </SuiBox>
        </SuiBox>
      </Card>
    );
}

export default ProfilePic;
