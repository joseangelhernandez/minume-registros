// @mui material components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";

// Soft UI Dashboard PRO React components
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Custom styles for the SidenavCard
import { card, cardContent, cardIconBox, cardIcon } from "examples/Sidenav/styles/sidenavCard";

// Soft UI Dashboard PRO React context
import { useSoftUIController } from "context";

function SidenavCard() {
  const [controller] = useSoftUIController();
  const { miniSidenav, sidenavColor } = controller;

  return (
    <Card sx={(theme) => card(theme, { miniSidenav })}>
      <CardContent sx={(theme) => cardContent(theme, { sidenavColor })}>
        <SuiBox
          bgColor="white"
          width="2rem"
          height="2rem"
          borderRadius="md"
          shadow="md"
          mb={2}
          sx={cardIconBox}
        >
          <Icon fontSize="medium" sx={(theme) => cardIcon(theme, { sidenavColor })}>
            question_mark 
          </Icon>
        </SuiBox>
        <SuiBox lineHeight={1}>
          <SuiTypography variant="h6" color="white">
            ¿Tienes alguna duda?
          </SuiTypography>
          <SuiBox mb={1.825} mt={-1}>
            <SuiTypography variant="caption" color="white" fontWeight="medium">
              Escríbeme directo a mi Whatsapp
            </SuiTypography>
          </SuiBox>
          <SuiButton
            component={Link}
            href="https://wa.me/18098200522?text=Hola,%20José%20Angel%20tengo%20una%20consulta%20sobre%20MINUME%20APP"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth
          >
            Escribirle a José Angel
          </SuiButton>
        </SuiBox>
      </CardContent>
    </Card>
  );
}

export default SidenavCard;


