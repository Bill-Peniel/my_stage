import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Application from '../views/Application.vue'
import Contact from '../views/Contact.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Status from '../views/Status.vue'

import Dashboard from '../views/Dashboard.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/application',
    name: 'Application',
    component: Application
  },
  {
    path: '/status',
    name: 'Status',
    component: Status
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
    beforeEnter: (to, from, next) => {
      if (!store.getters.hasAdminAccess) {
        next('/login')
      } else if (store.getters.isDpaf) {
        next('/dashboard/dpaf')
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        name: 'DashboardOverview', 
        component: () => import('../views/dashboard/AdminDashboard.vue')
      },
      {
        path: 'demandes/en-attente',
        name: 'DemandesEnAttente',
        component: () => import('../views/dashboard/DemandesEnAttente.vue')
      },
      {
        path: 'demandes/en-cours',
        name: 'DemandesEnCours',
        component: () => import('../views/dashboard/DemandesEnCours.vue')
      },
      {
        path: 'demandes/historique',
        name: 'DemandesHistorique',
        component: () => import('../views/dashboard/DemandesHistorique.vue')
      },
      {
        path: 'structures',
        name: 'Structures',
        component: () => import('../views/dashboard/Structures.vue')
      },
      {
        path: 'tuteurs',
        name: 'Tuteurs',
        component: () => import('../views/dashboard/Tuteurs.vue')
      },
      {
        path: 'stagiaires',
        name: 'Stagiaires',
        component: () => import('../views/dashboard/Stagiaires.vue')
      },
      {
        path: 'parametres',
        name: 'Parametres',
        component: () => import('../views/dashboard/Parametres.vue')
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: () => import('../views/dashboard/Notifications.vue')
      }
    ]
  },
  {
    path: '/dashboard/dpaf',
    component: () => import('../views/dashboard/DpafDashboard.vue'),
    meta: { requiresAuth: true, requiresDpaf: true },
    beforeEnter: (to, from, next) => {
      if (!store.getters.isDpaf) {
        next('/login')
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        name: 'DpafOverview',
        component: () => import('../views/dashboard/DpafDashboard.vue')
      },
      {
        path: 'toutes-demandes',
        name: 'ToutesDemandes',
        component: () => import('../views/dashboard/dpaf/ToutesDemandes.vue')
      },
      {
        path: 'nouvelles-demandes',
        name: 'NouvellesDemandes',
        component: () => import('../views/dashboard/dpaf/NouvellesDemandes.vue')
      },
      {
        path: 'affectations',
        name: 'Affectations', 
        component: () => import('../views/dashboard/dpaf/Affectations.vue')
      },
      {
        path: 'historique',
        name: 'DpafHistorique',
        component: () => import('../views/dashboard/dpaf/Historique.vue')
      },
      {
        path: 'statistiques',
        name: 'DpafStatistiques',
        component: () => import('../views/dashboard/dpaf/Statistiques.vue')
      },
      {
        path: 'evaluations',
        name: 'DpafEvaluations',
        component: () => import('../views/dashboard/dpaf/Evaluations.vue')
      },
      {
        path: 'parametres',
        name: 'DpafParametres',
        component: () => import('../views/dashboard/dpaf/Parametres.vue')
      },
      {
        path: 'notifications',
        name: 'DpafNotifications',
        component: () => import('../views/dashboard/Notifications.vue')
      },
      {
        path: 'profil',
        name: 'DpafProfil',
        component: () => import('../views/dashboard/dpaf/Profil.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 }
  }
})

export default router