/** 
  All of the routes for the Soft UI Dashboard PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/
import React from 'react'
import { Icon } from '@iconify/react';

// Soft UI Dashboard PRO React layouts
import Default from "layouts/dashboards/default";
import SmartHome from "layouts/dashboards/smart-home";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Teams from "layouts/pages/profile/teams";
import AllProjects from "layouts/pages/profile/all-projects";
import Reports from "layouts/pages/users/reports";
import NewUser from "layouts/pages/users/new-user";
import Settings from "layouts/pages/account/settings";
import Billing from "layouts/pages/account/billing";
import Invoice from "layouts/pages/account/invoice";
import Security from "layouts/pages/account/security";
import General from "layouts/pages/projects/general";
import Timeline from "layouts/pages/projects/timeline";
import NewProject from "layouts/pages/projects/new-project";
import Widgets from "layouts/pages/widgets";
import Charts from "layouts/pages/charts";
import SweetAlerts from "layouts/pages/sweet-alerts";
import Notifications from "layouts/pages/notifications";
import PricingPage from "layouts/pages/pricing-page";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import Analytics from "layouts/applications/analytics";
import Overview from "layouts/ecommerce/overview";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import ProductsList from "layouts/ecommerce/products/products-list";
import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";
import Referral from "layouts/ecommerce/referral";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpBasic from "layouts/authentication/sign-up/basic";
import SignUpCover from "layouts/authentication/sign-up/cover";
import SignUpIllustration from "layouts/authentication/sign-up/illustration";
import ResetBasic from "layouts/authentication/reset-password/basic";
import ResetCover from "layouts/authentication/reset-password/cover";
import ResetIllustration from "layouts/authentication/reset-password/illustration";
import LockBasic from "layouts/authentication/lock/basic";
import LockCover from "layouts/authentication/lock/cover";
import LockIllustration from "layouts/authentication/lock/illustration";
import VerificationBasic from "layouts/authentication/2-step-verification/basic";
import VerificationCover from "layouts/authentication/2-step-verification/cover";
import VerificationIllustration from "layouts/authentication/2-step-verification/illustration";
import Error404 from "layouts/authentication/error/404";
import Error500 from "layouts/authentication/error/500";
import RegEstudiante from "layouts/estudiantes/reg-estudiante"
import GestEstudiante from "layouts/estudiantes/gest-estudiante"
import RegUser from "layouts/usuarios/reg-usuario"
import GestUser from "layouts/usuarios/gest-usuario"
import Perfil from "layouts/perfil"
import Calificaciones from "layouts/calificaciones/gest-calificaciones"

// Soft UI Dashboard PRO React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import SettingsIcon from "examples/Icons/Settings";
import Basket from "examples/Icons/Basket";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import { layouts } from "chart.js";


const routes = [
  {
    type: "individual",
    name: "Inicio",
    key: "Inicio",
    route: "/Inicio",
    component: <Default/>,
    icon: <Icon icon="flat-color-icons:home" />,
    noCollapse: true,
  },{
    type: "individual",
    name: "Perfil",
    key: "Perfil",
    route: "/Perfil",
    component: <Perfil/>,
    icon: <Icon icon="flat-color-icons:info" />,
    noCollapse: true,
  },
  { type: "title", title: "ADM", key: "title-adm" },
  {
    type: "collapse",
    name: "Estudiantes",
    key: "estudiantes",
    icon: <Icon icon="flat-color-icons:graduation-cap" />,
    collapse: [
      {
        name: "Gestión de estudiantes",
        key: "gestionar-estudiantes",
        route: "/estudiantes/gestionar-estudiantes",
        component: <GestEstudiante/>,
      },
      {
        name: "Registrar estudiante",
        key: "registrar-estudiante",
        route: "/estudiantes/registrar-estudiante",
        component: <RegEstudiante/>,
      },
    ],
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "usuarios",
    icon: <Icon icon="flat-color-icons:key" />,
    collapse: [
      {
        name: "Cuentas",
        key: "cuentas",
        collapse: [
          {
            name: "Gestionar cuentas",
            key: "gestionar-cuentas",
            route: "/usuarios/cuentas/gestionar-cuentas",
            component: <GestUser/>,
          },
          {
            name: "Crear cuenta",
            key: "crear-cuenta",
            route: "/usuarios/cuentas/crear-cuenta",
            component: <RegUser/>,
          },
        ],
      },
      {
        name: "Estudiantes",
        key: "users",
        collapse: [
          {
            name: "Reports",
            key: "reports",
            route: "/pages/users/reports",
            component: Reports,
          },
          {
            name: "Registrar Estudiantes",
            key: "registrar-estudiantes",
            route: "/pages/users/new-user",
            component: NewUser,
          },
        ],
      },
      {
        name: "Account",
        key: "account",
        collapse: [
          {
            name: "Settings",
            key: "settings",
            route: "/pages/account/settings",
            component: Settings,
          },
          {
            name: "Billing",
            key: "billing",
            route: "/pages/account/billing",
            component: Billing,
          },
          {
            name: "Invoice",
            key: "invoice",
            route: "/pages/account/invoice",
            component: Invoice,
          },
          {
            name: "Security",
            key: "security",
            route: "/pages/account/security",
            component: Security,
          },
        ],
      },
      {
        name: "Projects",
        key: "projects",
        collapse: [
          {
            name: "General",
            key: "general",
            route: "/pages/projects/general",
            component: General,
          },
          {
            name: "Timeline",
            key: "timeline",
            route: "/pages/projects/timeline",
            component: Timeline,
          },
          {
            name: "New Project",
            key: "new-project",
            route: "/pages/projects/new-project",
            component: NewProject,
          },
        ],
      },
      {
        name: "Pricing Page",
        key: "pricing-page",
        route: "/pages/pricing-page",
        component: PricingPage,
      },
      { name: "Widgets", key: "widgets", route: "/pages/widgets", component: Widgets },
      { name: "Charts", key: "charts", route: "/pages/charts", component: Charts },
      {
        name: "Sweet Alerts",
        key: "sweet-alerts",
        route: "/pages/sweet-alerts",
        component: SweetAlerts,
      },
      {
        name: "Notfications",
        key: "notifications",
        route: "/pages/notifications",
        component: Notifications,
      },
    ],
  },
  {
    type: "individual",
    name: "Calificaciones",
    key: "Calificaciones",
    route: "/Calificaciones",
    component: <Calificaciones/>,
    icon: <Icon icon="flat-color-icons:view-details" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Applications",
    key: "applications",
    icon: <SettingsIcon size="12px" />,
    collapse: [
      {
        name: "Kanban",
        key: "kanban",
        route: "/applications/kanban",
        component: Kanban,
      },
      {
        name: "Wizard",
        key: "wizard",
        route: "/applications/wizard",
        component: Wizard,
      },
      {
        name: "Data Tables",
        key: "data-tables",
        route: "/applications/data-tables",
        component: DataTables,
      },
      {
        name: "Calendar",
        key: "calendar",
        route: "/applications/calendar",
        component: Calendar,
      },
      {
        name: "Analytics",
        key: "analytics",
        route: "/applications/analytics",
        component: Analytics,
      },
    ],
  },
  /*{
    type: "collapse",
    name: "Ecommerce",
    key: "ecommerce",
    icon: <Basket size="12px" />,
    collapse: [
      {
        name: "Overview",
        key: "overview",
        route: "/ecommerce/overview",
        component: Overview,
      },
      {
        name: "Products",
        key: "products",
        collapse: [
          {
            name: "New Product",
            key: "new-product",
            route: "/ecommerce/products/new-product",
            component: NewProduct,
          },
          {
            name: "Edit Product",
            key: "edit-product",
            route: "/ecommerce/products/edit-product",
            component: EditProduct,
          },
          {
            name: "Product Page",
            key: "product-page",
            route: "/ecommerce/products/product-page",
            component: ProductPage,
          },
          {
            name: "Products List",
            key: "products-list",
            route: "/ecommerce/products/products-list",
            component: ProductsList,
          },
        ],
      },
      {
        name: "Orders",
        key: "orders",
        collapse: [
          {
            name: "Order List",
            key: "order-list",
            route: "/ecommerce/orders/order-list",
            component: OrderList,
          },
          {
            name: "Order Details",
            key: "order-details",
            route: "/ecommerce/orders/order-details",
            component: OrderDetails,
          },
        ],
      },
      {
        name: "Referral",
        key: "referral",
        route: "/ecommerce/referral",
        component: Referral,
      },
    ],
  },*/
  { type: "divider", key: "divider-1" },
  { type: "title", title: "Docs", key: "title-docs" },
  {
    type: "collapse",
    name: "Basic",
    key: "basic",
    icon: <SpaceShip size="12px" />,
    collapse: [
      {
        name: "Getting Started",
        key: "getting-started",
        collapse: [
          {
            name: "Overview",
            key: "overview",
            href: "https://www.creative-tim.com/learning-lab/react/overview/soft-ui-dashboard/",
          },
          {
            name: "License",
            key: "license",
            href: "https://www.creative-tim.com/learning-lab/react/license/soft-ui-dashboard/",
          },
          {
            name: "Quick Start",
            key: "quick-start",
            href: "https://www.creative-tim.com/learning-lab/react/quick-start/soft-ui-dashboard/",
          },
          {
            name: "Build Tools",
            key: "build-tools",
            href: "https://www.creative-tim.com/learning-lab/react/build-tools/soft-ui-dashboard/",
          },
        ],
      },
      {
        name: "Foundation",
        key: "foundation",
        collapse: [
          {
            name: "Colors",
            key: "colors",
            href: "https://www.creative-tim.com/learning-lab/react/colors/soft-ui-dashboard/",
          },
          {
            name: "Grid",
            key: "grid",
            href: "https://www.creative-tim.com/learning-lab/react/grid/soft-ui-dashboard/",
          },
          {
            name: "Typography",
            key: "base-typography",
            href: "https://www.creative-tim.com/learning-lab/react/base-typography/soft-ui-dashboard/",
          },
          {
            name: "Borders",
            key: "borders",
            href: "https://www.creative-tim.com/learning-lab/react/borders/soft-ui-dashboard/",
          },
          {
            name: "Box Shadows",
            key: "box-shadows",
            href: "https://www.creative-tim.com/learning-lab/react/box-shadows/soft-ui-dashboard/",
          },
          {
            name: "Functions",
            key: "functions",
            href: "https://www.creative-tim.com/learning-lab/react/functions/soft-ui-dashboard/",
          },
          {
            name: "Routing System",
            key: "routing-system",
            href: "https://www.creative-tim.com/learning-lab/react/routing-system/soft-ui-dashboard/",
          },
        ],
      },
    ],
  },
  {
    type: "collapse",
    name: "Components",
    key: "components",
    icon: <CustomerSupport size="12px" />,
    collapse: [
      {
        name: "Alerts",
        key: "alerts",
        href: "https://www.creative-tim.com/learning-lab/react/alerts/soft-ui-dashboard/",
      },
      {
        name: "Avatar",
        key: "avatar",
        href: "https://www.creative-tim.com/learning-lab/react/avatar/soft-ui-dashboard/",
      },
      {
        name: "Badge",
        key: "badge",
        href: "https://www.creative-tim.com/learning-lab/react/badge/soft-ui-dashboard/",
      },
      {
        name: "Badge Dot",
        key: "badge-dot",
        href: "https://www.creative-tim.com/learning-lab/react/badge-dot/soft-ui-dashboard/",
      },
      {
        name: "Box",
        key: "box",
        href: "https://www.creative-tim.com/learning-lab/react/box/soft-ui-dashboard/",
      },
      {
        name: "Buttons",
        key: "buttons",
        href: "https://www.creative-tim.com/learning-lab/react/buttons/soft-ui-dashboard/",
      },
      {
        name: "Date Picker",
        key: "date-picker",
        href: "https://www.creative-tim.com/learning-lab/react/datepicker/soft-ui-dashboard/",
      },
      {
        name: "Dropzone",
        key: "dropzone",
        href: "https://www.creative-tim.com/learning-lab/react/dropzone/soft-ui-dashboard/",
      },
      {
        name: "Editor",
        key: "editor",
        href: "https://www.creative-tim.com/learning-lab/react/quill/soft-ui-dashboard/",
      },
      {
        name: "Input",
        key: "input",
        href: "https://www.creative-tim.com/learning-lab/react/input/soft-ui-dashboard/",
      },
      {
        name: "Pagination",
        key: "pagination",
        href: "https://www.creative-tim.com/learning-lab/react/pagination/soft-ui-dashboard/",
      },
      {
        name: "Progress",
        key: "progress",
        href: "https://www.creative-tim.com/learning-lab/react/progress/soft-ui-dashboard/",
      },
      {
        name: "Select",
        key: "select",
        href: "https://www.creative-tim.com/learning-lab/react/select/soft-ui-dashboard/",
      },
      {
        name: "Snackbar",
        key: "snackbar",
        href: "https://www.creative-tim.com/learning-lab/react/snackbar/soft-ui-dashboard/",
      },
      {
        name: "Social Button",
        key: "social-button",
        href: "https://www.creative-tim.com/learning-lab/react/social-buttons/soft-ui-dashboard/",
      },
      {
        name: "Tag Input",
        key: "tag-input",
        href: "https://www.creative-tim.com/learning-lab/react/tag-input/soft-ui-dashboard/",
      },
      {
        name: "Typography",
        key: "typography",
        href: "https://www.creative-tim.com/learning-lab/react/typography/soft-ui-dashboard/",
      },
    ],
  },
  {
    type: "collapse",
    name: "Change Log",
    key: "changelog",
    href: "https://github.com/creativetimofficial/ct-soft-ui-dashboard-pro-material-ui/blob/main/CHANGELOG.md",
    icon: <CreditCard size="12px" />,
    noCollapse: true,
  },
];

export default routes;
