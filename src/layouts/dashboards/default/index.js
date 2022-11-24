// @mui material components
import {useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import axios from 'axios';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Globe from "examples/Globe";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";
import breakpoints from "assets/theme/base/breakpoints";

// Data
import salesTableData from "layouts/dashboards/default/data/salesTableData";
import reportsBarChartData from "layouts/dashboards/default/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboards/default/data/gradientLineChartData";

function Default(props) {
  const { values } = breakpoints;
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const cookies = new Cookies();

  //Variables de datos
  const [TotalEstudiantes, setTotalEstudiantes] = useState(null)
  const [TotalDocentes, setTotalDocentes] = useState(null)
  const [TotalVoluntarios, setTotalVoluntarios] = useState(null)
  const [ComisionesEstudiantes, setComisionesEstudiantes] = useState(null)
  const [Estudiantes, setEstudiantes] = useState(null)

  //GET de datos
  useEffect(() => {

    axios.get('http://jose03-001-site1.htempurl.com/api/ESTUDIANTES2019')
    .then((response)=> {
      setEstudiantes(response.data)
    });

    axios.get('http://jose03-001-site1.htempurl.com/api/TOTAL_ESTUDIANTES')
    .then((response)=>{
      setTotalEstudiantes(response.data.total)
    });

    axios.get('http://jose03-001-site1.htempurl.com/api/TOTAL_DOCENTES')
    .then((response)=>{
      setTotalDocentes(response.data.total)
    });

    axios.get('http://jose03-001-site1.htempurl.com/api/TOTAL_VOLUNTARIOS')
    .then((response)=>{
      setTotalVoluntarios(response.data.total)
    });

    axios.get('http://jose03-001-site1.htempurl.com/api/ESTUDIANTE_COMISION')
    .then((response)=> {
      setComisionesEstudiantes(response.data)
    });
  }, [])

  const est = ComisionesEstudiantes;

  const regionalData = {
      labels: ["Reg. 1", "Reg. 2", "Reg. 3", "Reg. 4", "Reg. 5", "Reg. 6", "Reg. 7", "Reg. 8", "Reg. 9", "Reg. 10", "Reg. 11", "Reg. 12", "Reg. 13","Reg. 14","Reg. 15","Reg. 16","Reg. 17","Reg. 18"],
      datasets: [
        {
          label: "Estudiantes 2019",
          color: "info",
          data: Estudiantes,
        },
        {
          label: "Estudiantes 2022",
          color: "dark",
          data: [0],
        },
      ],
  };

  return ComisionesEstudiantes && (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <Grid container>
          <Grid item xs={12}>
            <SuiBox mb={3} p={1}>
              <SuiTypography
                variant={window.innerWidth < values.sm ? "h3" : "h2"}
                textTransform="capitalize"
                fontWeight="bold"
              >
                Estadísticas MINUME 2022
              </SuiTypography>
            </SuiBox>

            <Grid container>
              <Grid item xs={12}>
                <Globe
                  display={{ xs: "none", md: "block" }}
                  position="absolute"
                  top="10%"
                  right={0}
                  mt={{ xs: -12, lg: 1 }}
                  mr={{ xs: 0, lg: 10 }}
                  canvasStyle={{ marginTop: "3rem" }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Estudiantes", fontWeight: "bold" }}
                    count={TotalEstudiantes}
                    icon={{ color: "info", component: "local_library" }}
                  />
                  
                </SuiBox>
                <MiniStatisticsCard
                  title={{ text: "Invitados", fontWeight: "bold" }}
                  count={TotalDocentes}
                  icon={{ color: "info", component: "volunteer_activism" }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Voluntarios", fontWeight: "bold" }}
                    count={TotalVoluntarios}
                    icon={{ color: "info", component: "volunteer_activism" }}
                  />
                  
                </SuiBox>
                <MiniStatisticsCard
                  title={{ text: "Delegaciones", fontWeight: "bold" }}
                  count={TotalDocentes}
                  icon={{ color: "info", component: "volunteer_activism" }}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Docentes", fontWeight: "bold" }}
                    count={TotalDocentes}
                    icon={{ color: "info", component: "co_present" }}
                  />
                </SuiBox>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Comisiones", fontWeight: "bold" }}
                    count="12"
                    icon={{
                      color: "info",
                      component: "business_center",
                    }}
                  />
                </SuiBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SuiBox mb={3} position="relative">
                <SalesTable title="Estudiantes por comisiones" rows={ComisionesEstudiantes} />
              </SuiBox>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <GradientLineChart
                title="Estudiantes por Regional"
                description={
                  <SuiBox display="flex" alignItems="center">
                    <SuiBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                    </SuiBox>
                    <SuiTypography variant="button" color="text" fontWeight="medium">
                      En el 2022 hay un aumento del 30% {" "}
                      <SuiTypography variant="button" color="text" fontWeight="regular">
                        de estudiantes participando
                      </SuiTypography>
                    </SuiTypography>
                  </SuiBox>
                }
                chart={regionalData}
              />
            </Grid>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
