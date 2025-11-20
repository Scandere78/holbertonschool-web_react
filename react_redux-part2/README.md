# React Redux - Part 2

Ce projet continue l'apprentissage de Redux avec React, en se concentrant sur l'optimisation des performances et la gestion avancée d'état.

## Structure du projet

### Task 0: Optimisation du re-render des notifications

**Objectif**: Éliminer les re-renders inutiles du composant `Notifications` causés par le state `displayDrawer` dans Redux.

**Changements effectués**:
- ✅ Suppression de `displayDrawer` du state Redux dans `notificationsSlice.js`
- ✅ Suppression des reducers `showDrawer` et `hideDrawer`
- ✅ Utilisation de `useRef` pour gérer l'affichage/masquage du drawer via CSS
- ✅ Ajout de classes CSS `visible` pour contrôler la visibilité
- ✅ Tests mis à jour pour vérifier le toggle via classes CSS

**Résultat**: Le composant `Notifications` ne se re-render plus lors du toggle du drawer.

---

### Task 1: État de chargement

**Objectif**: Implémenter un état de chargement pendant le fetch des notifications.

**Changements effectués**:
- ✅ Ajout de `loading: false` dans l'initial state
- ✅ Gestion de `pending`, `fulfilled`, `rejected` dans `extraReducers`
- ✅ Affichage conditionnel "Loading notifications..." pendant le fetch
- ✅ Tests mis à jour avec `waitFor` pour gérer l'état de chargement

**Résultat**: L'utilisateur voit un indicateur de chargement pendant le fetch.

---

### Task 2: Sélection de cours

**Objectif**: Permettre à l'utilisateur de sélectionner/désélectionner des cours via des checkboxes.

**Changements effectués**:
- ✅ Ajout de `isSelected: false` à chaque cours dans `fetchCourses.fulfilled`
- ✅ Création des actions `selectCourse` et `unSelectCourse` dans `coursesSlice`
- ✅ Ajout de la fonction `onChangeRow` dans `CourseList`
- ✅ Ajout d'un checkbox dans `CourseListRow` pour chaque cours
- ✅ Gestion du state `isSelected` via Redux

**Résultat**: L'utilisateur peut cocher/décocher des cours, et l'état est géré par Redux.

---

### Task 3: Filtrage memoïsé des notifications

**Objectif**: Implémenter un système de filtrage optimisé avec sélecteurs memoïsés.

**Changements effectués**:
- ✅ Nouvelles données JSON avec 14 notifications (10 unread)
- ✅ Filtrage des notifications `isRead: false` dans `fetchNotifications`
- ✅ Création de `notificationsSelector.js` avec `getFilteredNotifications` (memoïsé)
- ✅ Ajout de l'état local `currentFilter` dans `Notifications`
- ✅ Boutons de filtrage: ‼️ (urgent), ❓ (default), All
- ✅ Simplification de `NotificationItem`: suppression du prop `html`, couleurs inline
- ✅ Tests adaptés aux nouveaux changements

**Résultat**: L'utilisateur peut filtrer les notifications par type (urgent/default/all) avec optimisation via memoization.

---

## Installation et Utilisation

### Installation des dépendances

```bash
cd react_redux-part2/task_X/dashboard
npm install
```

### Démarrage en mode développement

```bash
npm run dev
```

### Build de production

```bash
npm run build
```

### Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

---

## Technologies utilisées

- **React** 18.3.1
- **Redux Toolkit** 2.0.1
- **React Redux** 9.0.4
- **Vite** 5.4.8
- **Tailwind CSS** 4.1.16
- **Jest** 29.7.0
- **React Testing Library** 14.2.2

---

## Auteur

Projet réalisé dans le cadre de la formation Holberton School.
