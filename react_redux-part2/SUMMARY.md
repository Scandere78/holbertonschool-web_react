# React Redux Part 2 - Summary

## Projet Complété ✅

Ce projet implémente 4 tâches avancées de Redux avec React, en se concentrant sur l'optimisation des performances et la gestion d'état.

---

## Task 0: Now You See ME (The easy way) ✅

**Objectif**: Résoudre le problème de re-renders inutiles du composant Notifications.

### Problème identifié
Le state `displayDrawer` dans Redux force un re-render complet du composant Notifications à chaque toggle, même si les données n'ont pas changé.

### Solution implémentée
1. **notificationsSlice.js**:
   - Suppression de `displayDrawer` de l'initialState
   - Suppression des reducers `showDrawer` et `hideDrawer`
   - Export uniquement de `markNotificationAsRead`

2. **Notifications.jsx**:
   - Ajout de `useRef` pour référencer le drawer DOM
   - Fonction `handleToggleDrawer` qui ajoute/supprime la classe CSS `visible`
   - Suppression de toute logique Redux liée à displayDrawer

3. **Notifications.css**:
   - Ajout de `.notifications-drawer { opacity: 0; visibility: hidden; }`
   - Ajout de `.notifications-drawer.visible { opacity: 1; visibility: visible; }`

4. **Tests**:
   - Vérification du toggle via classes CSS au lieu de props
   - Utilisation de `waitFor` pour gérer l'état asynchrone
   - Tests du toggle de visibilité sans trigger de re-render Redux

### Résultat
✅ Le composant ne se re-render plus lors du toggle
✅ 10/10 tests passent
✅ Build sans erreurs

---

## Task 1: Loading state ✅

**Objectif**: Afficher un indicateur de chargement pendant le fetch des notifications.

### Solution implémentée
1. **notificationsSlice.js**:
   ```javascript
   const initialState = {
     notifications: [],
     loading: false,  // Ajouté
     error: null,
   };

   extraReducers: (builder) => {
     builder
       .addCase(fetchNotifications.pending, (state) => {
         state.loading = true;
       })
       .addCase(fetchNotifications.fulfilled, (state, action) => {
         state.loading = false;
         state.notifications = action.payload;
       })
       .addCase(fetchNotifications.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message;
       });
   }
   ```

2. **Notifications.jsx**:
   ```javascript
   {loading ? (
     <p>Loading notifications...</p>
   ) : notifications.length === 0 ? (
     <p>No new notification for now</p>
   ) : (
     // Liste des notifications
   )}
   ```

### Résultat
✅ Indicateur de chargement fonctionnel
✅ Tests avec `waitFor` pour attendre la fin du chargement
✅ Build sans erreurs

---

## Task 2: Implement Course Selection ✅

**Objectif**: Permettre la sélection/désélection de cours via des checkboxes.

### Solution implémentée
1. **coursesSlice.js**:
   ```javascript
   reducers: {
     selectCourse: (state, action) => {
       const course = state.courses.find(c => c.id === action.payload);
       if (course) course.isSelected = true;
     },
     unSelectCourse: (state, action) => {
       const course = state.courses.find(c => c.id === action.payload);
       if (course) course.isSelected = false;
     },
   },

   .addCase(fetchCourses.fulfilled, (state, action) => {
     state.courses = action.payload.map(course => ({
       ...course,
       isSelected: false,
     }));
   })
   ```

2. **CourseList.jsx**:
   ```javascript
   const onChangeRow = (id, checked) => {
     if (checked) {
       dispatch(selectCourse(id));
     } else {
       dispatch(unSelectCourse(id));
     }
   };
   ```

3. **CourseListRow.jsx**:
   ```javascript
   <input
     type="checkbox"
     checked={isSelected}
     onChange={(e) => onChangeRow(id, e.target.checked)}
   />
   ```

### Résultat
✅ Checkboxes fonctionnelles
✅ État Redux mis à jour correctement
✅ Redux DevTools affiche les changements
✅ Build sans erreurs

---

## Task 3: Memoized selector ✅

**Objectif**: Implémenter un filtrage optimisé des notifications avec sélecteurs memoïsés.

### Solution implémentée
1. **Nouvelles données JSON** (14 notifications, 10 unread):
   - Filtrées dans `fetchNotifications` pour ne garder que `isRead: false`
   - Format simplifié: `{ id, type, isRead, value }`

2. **notificationsSelector.js**:
   ```javascript
   import { createSelector } from '@reduxjs/toolkit';

   const selectNotifications = (state) => state.notifications.notifications;

   export const getFilteredNotifications = createSelector(
     [selectNotifications, (state, filter) => filter],
     (notifications, filter) => {
       if (filter === 'all') return notifications;
       return notifications.filter(n => n.type === filter);
     }
   );
   ```

3. **Notifications.jsx**:
   ```javascript
   const [currentFilter, setCurrentFilter] = useState('all');
   const filteredNotifications = useSelector(state =>
     getFilteredNotifications(state, currentFilter)
   );

   // Boutons de filtrage
   <button onClick={() => setCurrentFilter('urgent')}>‼️</button>
   <button onClick={() => setCurrentFilter('default')}>❓</button>
   <button onClick={() => setCurrentFilter('all')}>All</button>
   ```

4. **NotificationItem.jsx** (simplifié):
   ```javascript
   function NotificationItem({ id, type, value, markAsRead }) {
     const color = type === 'urgent' ? 'red' : 'blue';
     return (
       <li
         style={{ color }}
         onClick={() => markAsRead(id)}
         data-notification-type={type}
       >
         {value}
       </li>
     );
   }
   ```

### Résultat
✅ Filtrage urgent/default/all fonctionnel
✅ Memoization optimise les performances
✅ NotificationItem simplifié (pas de html prop)
✅ Build sans erreurs

---

## Tests et Build

### Task 0
```bash
cd task_0/dashboard
npm test -- Notifications.spec.js
# 10 passed
```

### Task 1
```bash
cd task_1/dashboard
npm run build
# ✓ built in 3.67s
```

### Task 2
```bash
cd task_2/dashboard
npm run build
# ✓ built in 3.50s
```

### Task 3
```bash
cd task_3/dashboard
npm run build
# ✓ built in 3.75s
```

---

## Architecture Redux finale

```
src/
├── features/
│   ├── notifications/
│   │   └── notificationsSlice.js (sans displayDrawer)
│   ├── courses/
│   │   └── coursesSlice.js (avec isSelected)
│   └── selectors/
│       └── notificationsSelector.js (memoized)
├── components/
│   ├── Notifications/
│   │   ├── Notifications.jsx (useRef + CSS toggle)
│   │   └── Notifications.css (visible class)
│   └── NotificationItem/
│       └── NotificationItem.jsx (simplifié)
└── pages/
    └── CourseList/
        ├── CourseList.jsx (onChangeRow)
        └── CourseListRow/
            └── CourseListRow.jsx (checkbox)
```

---

## Statut Final

✅ **Toutes les tâches complétées**
✅ **Tous les builds réussis**
✅ **Pas d'erreurs de lint**
✅ **Pas d'erreurs console**
✅ **Tests passants**

**Projet prêt pour soumission ! 🎉**
