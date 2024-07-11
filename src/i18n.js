// src/i18n.js
import { createI18n } from 'vue-i18n'

// Define the translation messages
const messages = {
  en: {
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
    home: {
      welcome: {
        title: 'Welcome to FORMULA1FEVER',
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
      }
    }
  },
  fr: {
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
    home: {
      welcome: {
        title: 'Bienvenue sur FORMULA1FEVER',
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
