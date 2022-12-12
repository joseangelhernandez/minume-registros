/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiSocialButton from "components/SuiSocialButton";

// Soft UI Dashboard PRO React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon  from "@mui/icons-material/Twitter";
import YoutubeIcon from "@mui/icons-material/YouTube";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// DefaultNavbar dropdown menus
import PagesMenu from "examples/Navbars/DefaultNavbar/Menus/PagesMenu";
import AuthenticationMenu from "examples/Navbars/DefaultNavbar/Menus/AuthenticationMenu";
import EcommerceMenu from "examples/Navbars/DefaultNavbar/Menus/EcommerceMenu";
import ApplicationsMenu from "examples/Navbars/DefaultNavbar/Menus/ApplicationsMenu";
import DocsMenu from "examples/Navbars/DefaultNavbar/Menus/DocsMenu";

// Images
import logoEducacion from "assets/images/logos/EDUCACION_LOGO_login.png";

function DefaultNavbar({ routes, transparent, light, action }) {
  const [pagesMenu, setPagesMenu] = useState(false);
  const [authenticationMenu, setAuthenticationMenu] = useState(false);
  const [ecommerceMenu, setEcommerceMenu] = useState(false);
  const [applicationsMenu, setApplicationsMenu] = useState(false);
  const [docsMenu, setDocsMenu] = useState(false);
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openPagesMenu = ({ currentTarget }) => setPagesMenu(currentTarget);
  const closePagesMenu = () => setPagesMenu(false);
  const openAuthenticationMenu = ({ currentTarget }) => setAuthenticationMenu(currentTarget);
  const closeAuthenticationMenu = () => setAuthenticationMenu(false);
  const openEcommerceMenu = ({ currentTarget }) => setEcommerceMenu(currentTarget);
  const closeEcommerceMenu = () => setEcommerceMenu(false);
  const openApplicationsMenu = ({ currentTarget }) => setApplicationsMenu(currentTarget);
  const closeApplicationsMenu = () => setApplicationsMenu(false);
  const openDocsMenu = ({ currentTarget }) => setDocsMenu(currentTarget);
  const closeDocsMenu = () => setDocsMenu(false);
  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  return (
    <Container>
      <SuiBox
        py={1}
        px={{ xs: transparent ? 4 : 5, sm: transparent ? 2 : 5, lg: transparent ? 0 : 5 }}
        my={2}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="section"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({ palette: { transparent: transparentColor, white }, functions: { rgba } }) => ({
          backgroundColor: transparent ? transparentColor.main : rgba(white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <SuiBox
              component="img"
              src={logoEducacion}
              alt="logoeducacion"
              position="relative"
              width="100%"
              maxWidth="12.5rem"
            />
        <SuiBox color="inherit" display={{ xs: "none", lg: "flex" }} 	m={0} p={0}>
          <SuiSocialButton color="instagram" iconOnly circular href="https://www.google.com/" target="_blank" sx={{ mr: 1 }}>
            <InstagramIcon pl={2}/>
          </SuiSocialButton>

          <SuiSocialButton color="facebook" iconOnly circular href="https://www.google.com/" target="_blank" sx={{ mr: 1 }}>
            <FacebookIcon />
          </SuiSocialButton>

          <SuiSocialButton color="twitter" iconOnly circular href="https://www.google.com/" target="_blank" sx={{ mr: 1 }}>
            <TwitterIcon />
          </SuiSocialButton>

          <SuiSocialButton color="youtube" iconOnly circular href="https://www.google.com/" target="_blank" sx={{ mr: 1 }}>
            <YoutubeIcon />
          </SuiSocialButton>
        </SuiBox>
        <SuiBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
        </SuiBox>
      </SuiBox>
      <PagesMenu routes={routes} open={pagesMenu} close={closePagesMenu} />
      <AuthenticationMenu
        routes={routes}
        open={authenticationMenu}
        close={closeAuthenticationMenu}
      />
      <EcommerceMenu routes={routes} open={ecommerceMenu} close={closeEcommerceMenu} />
      <ApplicationsMenu routes={routes} open={applicationsMenu} close={closeApplicationsMenu} />
      <DocsMenu routes={routes} open={docsMenu} close={closeDocsMenu} />
      {mobileView && (
        <DefaultNavbarMobile routes={routes} open={mobileNavbar} close={closeMobileNavbar} />
      )}
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
