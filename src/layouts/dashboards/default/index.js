// @mui material components
import {useEffect, useState, useMemo } from "react";
import Cookies from 'universal-cookie';
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import axios from 'api/axios';
import useAuth from "hooks/useAuth";
import useRefreshToken from "hooks/useRefreshToken";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Skeleton from '@mui/material/Skeleton';
import CardMUI from "@mui/material/Card";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import SalesTableCargando from "examples/Tables/SalesTableCargando";
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
import Card from "assets/theme/components/card";

function Default() {
  const { auth } = useAuth();
  const { values } = breakpoints;
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const cookies = new Cookies();
  const refresh = useRefreshToken();
  const jwtInterceoptor = axios.create({});

  //Variables de datos
  const [TotalEstudiantes, setTotalEstudiantes] = useState(null)
  const [TotalDocentes, setTotalDocentes] = useState(null)
  const [TotalVoluntarios, setTotalVoluntarios] = useState(null)
  const [ComisionesEstudiantesCargando, setComisionesEstudiantescargando] = useState([
    {
      comisión: <Skeleton animation="wave" />,
      estudiantes: <Skeleton animation="wave" />,
      porcentaje: <Skeleton animation="wave" />,
      siglas: <Skeleton animation="wave" />
    },
    {
      comisión: <Skeleton animation="wave" />,
      estudiantes: <Skeleton animation="wave" />,
      porcentaje: <Skeleton animation="wave" />,
      siglas: <Skeleton animation="wave" />
    },
    {
      comisión: <Skeleton animation="wave" />,
      estudiantes: <Skeleton animation="wave" />,
      porcentaje: <Skeleton animation="wave" />,
      siglas: <Skeleton animation="wave" />
    },
    {
      comisión: <Skeleton animation="wave" />,
      estudiantes: <Skeleton animation="wave" />,
      porcentaje: <Skeleton animation="wave" />,
      siglas: <Skeleton animation="wave" />
    },
    {
      comisión: <Skeleton animation="wave" />,
      estudiantes: <Skeleton animation="wave" />,
      porcentaje: <Skeleton animation="wave" />,
      siglas: <Skeleton animation="wave" />
    },
    {
      comisión: <Skeleton animation="wave" />,
      estudiantes: <Skeleton animation="wave" />,
      porcentaje: <Skeleton animation="wave" />,
      siglas: <Skeleton animation="wave" />
    },
    {
      comisión: <Skeleton animation="wave" />,
      estudiantes: <Skeleton animation="wave" />,
      porcentaje: <Skeleton animation="wave" />,
      siglas: <Skeleton animation="wave" />
    },
    {
      comisión: <Skeleton animation="wave" />,
      estudiantes: <Skeleton animation="wave" />,
      porcentaje: <Skeleton animation="wave" />,
      siglas: <Skeleton animation="wave" />
    },
  ])
  const [ComisionesEstudiantes, setComisionesEstudiantes] = useState(null);
  const [Estudiantes, setEstudiantes] = useState(null);

  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  //GET de datos
  useEffect(() => {

    axios.get('/ESTUDIANTES2019')
    .then((response)=> {
      setEstudiantes(response.data)
    });

    axios.get('/TOTAL_ESTUDIANTES')
    .then((response)=>{
      setTotalEstudiantes(response.data.total)
    });

    axios.get('/TOTAL_DOCENTES')
    .then((response)=>{
      setTotalDocentes(response.data.total)
    });

    jwtInterceoptor.get('https://minumeapi.azurewebsites.net/api/TOTAL_VOLUNTARIOS')
    .then((response)=>{
      setTotalVoluntarios(response.data.total)
    });

    axios.get('/ESTUDIANTE_COMISION')
    .then((response)=> {
      setComisionesEstudiantescargando(null);
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
      ],
  };

  const grafica = useMemo(() => regionalData, [Estudiantes]);

  return(
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
                  title={{ text: "Del. Internacionales", fontWeight: "bold" }}
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
                {ComisionesEstudiantes === null ? <SalesTableCargando title="Estudiantes por comisiones" rows={ComisionesEstudiantesCargando}/>
                : <SalesTable title="Estudiantes por comisiones" rows={ComisionesEstudiantes} />}
              </SuiBox>
            </Grid>
          </Grid>
          
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;

/*<Grid container spacing={3}>
            <Grid item xs={12}>
              <SuiBox mb={3} position="relative">
                {Estudiantes === null 
                ?<SuiBox my={3}>
                <CardMUI>
                  <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                    <SuiBox lineHeight={1}>
                      <SuiTypography variant="h5" fontWeight="medium">
                        Estudiantes por Regional
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiBox pl={3} pr={3} pb={3}><Skeleton animation="wave" variant="rectangular"  height={300}/></SuiBox>
                </CardMUI>
              </SuiBox>
                : <GradientLineChart
                  title="Estudiantes por Regional"
                  height={660}
                  chart={grafica}
                />}
                
              </SuiBox>
              
            </Grid>
          </Grid>*/