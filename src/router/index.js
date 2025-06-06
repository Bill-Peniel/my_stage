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
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next('/login')
      } else if (store.getters.isDpaf) {
        next('/dashboard/dpaf')
      } else if (store.getters.isStructure) {
        next('/dashboard/structure')
      } else if (store.getters.isAdmin) {
        next()
      } else {
        next('/login')
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
    path: '/dashboard/stagiaire',
    component: () => import('../views/dashboard/stagiaire/StagiaireDashboard.vue'),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next('/login')
      } else if (store.getters.isStagiaire) {
        next()
      } else {
        next('/login')
      }
    },
    children: [
      {
        path: '',
        name: 'StagiaireDashboard',
        component: () => import('../views/dashboard/stagiaire/Overview.vue')
      },
      {
        path: 'suivi',
        name: 'StagiaireSuivi',
        component: () => import('../views/dashboard/stagiaire/Suivi.vue')
      },
      {
        path: 'documents',
        name: 'StagiaireDocuments',
        component: () => import('../views/dashboard/stagiaire/Documents.vue')
      },
      
      {
        path: 'messages',
        name: 'StagiaireMessages',
        component: () => import('../views/dashboard/stagiaire/Messages.vue')
      },
      {
        path: 'notifications',
        name: 'StagiaireNotifications',
        component: () => import('../views/dashboard/stagiaire/Notifications.vue')
      },
      {
        path: 'parametres',
        name: 'StagiaireParametres',
        component: () => import('../views/dashboard/stagiaire/Parametres.vue')
      }
    ]
  },
  {
    path: '/dashboard/tuteur',
    component: () => import('../views/dashboard/tuteur/TuteurDashboard.vue'),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next('/login')
      } else if (store.getters.isTuteur) {
        next()
      } else {
        next('/login')
      }
    },
    children: [
      {
        path: '',
        name: 'TuteurDashboard',
        component: () => import('../views/dashboard/tuteur/Overview.vue')
      },
      {
        path: 'stagiaires',
        name: 'TuteurStagiaires',
        component: () => import('../views/dashboard/tuteur/Stagiaires.vue')
      },
      {
        path: 'messages',
        name: 'TuteurMessages',
        component: () => import('../views/dashboard/tuteur/Messages.vue')
      },
      {
        path: 'themes',
        name: 'TuteurThemes',
        component: () => import('../views/dashboard/tuteur/Themes.vue')
      },
      {
        path: 'evaluation',
        name: 'TuteurEvaluation',
        component: () => import('../views/dashboard/tuteur/Evaluation.vue')
      },
      {
        path: 'notifications',
        name: 'TuteurNotifications',
        component: () => import('../views/dashboard/tuteur/Notifications.vue')
      },
      {
        path: 'parametres',
        name: 'TuteurParametres',
        component: () => import('../views/dashboard/tuteur/Parametres.vue')
      }
    ]
  },
  {
    path: '/dashboard/structure',
    component: () => import('../views/dashboard/structure/StructureDashboard.vue'),
    meta: { requiresAuth: true, requiresStructure: true },
    beforeEnter: (to, from, next) => {
      if (!store.getters.isStructure) {
        next('/login')
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        name: 'StructureOverview',
        component: () => import('../views/dashboard/structure/Overview.vue')
      },
      {
        path: 'stagiaires',
        name: 'StructureStagiaires',
        component: () => import('../views/dashboard/Stagiaires.vue')
      },
      {
        path: 'tuteurs',
        name: 'StructureTuteurs',
        component: () => import('../views/dashboard/structure/Tuteurs.vue')
      },
      {
        path: 'evaluations',
        name: 'StructureEvaluations',
        component: () => import('../views/dashboard/structure/Evaluations.vue')
      },
      {
        path: 'profil',
        name: 'StructureProfil',
        component: () => import('../views/dashboard/structure/Profil.vue')
      },
      {
        path: 'affectations',
        name: 'StructureAffectations',
        component: () => import('../views/dashboard/structure/Affectations.vue')
      },
      {
        path: 'parametres',
        name: 'StructureParametres',
        component: () => import('../views/dashboard/structure/Parametres.vue')
      },
      {
        path: 'notifications',
        name: 'StructureNotifications',
        component: () => import('../views/dashboard/structure/Notifications.vue')
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