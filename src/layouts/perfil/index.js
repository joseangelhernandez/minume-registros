// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";

// Settings page components
import BaseLayout from "layouts/perfil/baseComponents/BaseLayout";
import Sidenav from "layouts/perfil/components/Sidenav";
import Header from "layouts/perfil/components/Header";
import BasicInfo from "layouts/perfil/components/BasicInfo";
import ChangePassword from "layouts/perfil/components/ChangePassword";
import Notifications from "layouts/perfil/components/Notifications";
import ChangeProfilePic from "layouts/perfil/components/ChangeProfilePic";

function Settings() {
  return (
    <BaseLayout>
      <SuiBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Sidenav />
          </Grid>
          <Grid item xs={12} lg={9}>
            <SuiBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Header />
                </Grid>
                <Grid item xs={12}>
                  <BasicInfo />
                </Grid>
                <Grid item xs={12}>
                  <ChangePassword />
                </Grid>
                <Grid item xs={12}>
                  <ChangeProfilePic />
                </Grid>
                <Grid item xs={12}>
                  <Notifications />
                </Grid>
              </Grid>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
    </BaseLayout>
  );
}

export default Settings;
