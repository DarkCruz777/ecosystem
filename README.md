# Guide d'installation du simulateur d'écosystème

Ce guide vous aidera à installer et exécuter le simulateur d'écosystème.

## Prérequis

- Node.js (version 14 ou supérieure)
- pnpm (ou npm/yarn)

## Installation

1. Clonez le repository :

2. Installez les dépendances :

```bash
pnpm install
```

## Exécution

Pour lancer l'application en mode développement :

```bash
pnpm dev
```

Le navigateur s'ouvrira automatiquement à l'adresse http://localhost:5173 (ou un autre port si 5173 est déjà utilisé).

## Construction pour la production

Pour construire l'application pour la production :

```bash
pnpm build
```

Les fichiers optimisés seront générés dans le dossier `dist`.

Pour prévisualiser la version de production :

```bash
pnpm preview
```

## Structure du projet

- `src/components/` : Composants React pour l'interface utilisateur
- `src/simulation/` : Classes de simulation pour la logique du simulateur
- `src/styles/` : Fichiers CSS de base
- `uno.config.js` : Configuration UnoCSS avec thèmes et shortcuts personnalisés

## Fonctionnalités

- Simulation en temps réel de créatures suivant l'algorithme des boids
- Interface utilisateur épurée avec UnoCSS
- Contrôles de base : démarrer, pause, réinitialiser
- Effets visuels : particules d'arrière-plan, créatures colorées

## Personnalisation

Vous pouvez facilement personnaliser l'apparence en modifiant le fichier `uno.config.js` qui contient tous les thèmes, couleurs et raccourcis CSS utilisés dans l'application.

Pour modifier le comportement des créatures, ajustez les paramètres dans les fichiers `creature.js` et `simulation.js`.