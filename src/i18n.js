// src/i18n.js
import { createI18n } from 'vue-i18n'

// Define the translation messages
const messages = {
  en: {
    loader: {
      loading_message: 'Loading'
    },
    nav: {
      home: 'Home',
      standings: 'Standings',
      grandprix: 'Grand Prix',
      browse: 'Browse',
      records: 'Records',
      drivers: 'Drivers',
      constructors: 'Constructors',
      circuits: 'Circuits',
      analysis: 'Analysis'
    },
    theme: {
      dark: 'Dark',
      light: 'Light'
    },
    countdown: {
      days: 'in {days} day',
      days_plural: 'in {days} days',
      today: 'today',
      past: '{days} day ago',
      past_plural: '{days} days ago'
    },
    home: {
      welcome: {
        title: 'Welcome to F1FEVER',
        description:
          'Explore Formula 1 with ease! Discover standings, drivers, and constructors info, delve into Grand Prix details and more.',
        powered_by: 'Powered by the F1 Ergast database'
      },
      stats: {
        title: 'Formula 1 Statistics',
        description: 'Qualifying and race results, standings, records, driver and team statistics.'
      },
      historical: {
        title: 'Historical Data',
        description: 'Data and statistics of the Formula 1 seasons from 1950 to 2023.'
      },
      analysis: {
        title: 'Data analysis',
        description: 'Detailed race report and lap times comparison between drivers'
      },
      current_grandprix: {
        label: 'Current season Grand Prix list',
        name: 'Name',
        location: 'Location',
        time: 'Time',
        date: 'Date',
        status: 'Status',
        status_completed: 'Completed',
        status_upcoming: 'Upcoming'
      },
      latest_grandprix: {
        label: 'Latest Grand prix'
      }
    }
  },
  fr: {
    loader: {
      loading_message: 'Chargement'
    },
    nav: {
      home: 'Accueil',
      standings: 'Classement',
      grandprix: 'Grand Prix',
      browse: 'Explorer',
      records: 'Records',
      drivers: 'Pilotes',
      constructors: 'Constructeurs',
      circuits: 'Circuits',
      analysis: 'Analyses'
    },
    theme: {
      dark: 'Sombre',
      light: 'Clair'
    },
    countdown: {
      days: 'dans {days} jour',
      days_plural: 'dans {days} jours',
      today: "aujourd'hui",
      past: 'il y a {days} jour',
      past_plural: 'il y a {days} jours'
    },
    home: {
      welcome: {
        title: 'Bienvenue sur F1FEVER',
        description:
          'Découvrez la Formule 1 avec facilité ! Explorez les classements, les pilotes, les informations sur les constructeurs, plongez dans les détails des Grands Prix et bien plus encore.',
        powered_by: 'Powered by the F1 Ergast database'
      },
      stats: {
        title: 'Formula 1 Statistiques',
        description:
          'Qualifications, résultat de course et classement. Statistiques records, pilote et constructeur.'
      },
      historical: {
        title: 'Données historique',
        description: 'Données et statistiques pour les saisons de Formule 1 de 1950 à 2024.'
      },
      analysis: {
        title: 'Analyse de données',
        description: 'Rapport de course détaillé et comparaison de temps aux tours entres pilotes.'
      },
      current_grandprix: {
        label: 'Grand Prix saison actuelle',
        name: 'Nom',
        location: 'Lieu',
        time: 'Heure',
        date: 'Date',
        status: 'État',
        status_completed: 'Terminé',
        status_upcoming: 'Prochainement'
      },
      latest_grandprix: {
        label: 'Dernier Grand Prix'
      }
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'fr',
  messages
})

export default i18n
