// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React icons
import SpaceShip from "examples/Icons/SpaceShip";
import Document from "examples/Icons/Document";
import Cube from "examples/Icons/Cube";
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Settings from "examples/Icons/Settings";
import CreditCard from "examples/Icons/CreditCard";

function Sidenav() {
  const sidenavItems = [
    { icon: <Document />, label: "perfil", href: "perfil" },
    { icon: <Cube />, label: "cambiar contraseña", href: "cambiar-contraseña" },
    { icon: <Settings />, label: "cambiar foto", href: "cambiar-foto" },
    //{ icon: <CustomerSupport />, label: "notificaciones", href: "notificaciones" },
  ];

  const renderSidenavItems = sidenavItems.map(({ icon, label, href }, key) => {
    const itemKey = `item-${key}`;

    return (
      <SuiBox key={itemKey} component="li" pt={key === 0 ? 0 : 1}>
        <SuiTypography
          component="a"
          href={`#${href}`}
          variant="button"
          fontWeight="regular"
          color="text"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem },
            palette: { light },
            transitions,
          }) => ({
            display: "flex",
            alignItems: "center",
            borderRadius: borderRadius.md,
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create("background-color", {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter,
            }),

            "&:hover": {
              backgroundColor: light.main,
            },
          })}
        >
          <SuiBox mr={1.5} lineHeight={1}>
            {icon}
          </SuiBox>
          {label}
        </SuiTypography>
      </SuiBox>
    );
  });

  return (
    <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: "sticky",
        top: "1%",
      }}
    >
      <SuiBox
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: "none" }}
      >
        {renderSidenavItems}
      </SuiBox>
    </Card>
  );
}

export default Sidenav;
