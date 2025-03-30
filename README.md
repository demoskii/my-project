# 📝 React To-Do App

Това е семпло, но функционално React приложение за управление на задачи. Създадено е като курсова работа и включва вход, регистрация, добавяне на задачи, светъл/тъмен режим и т.н.

---

## 🛠️ Какво използвах

- **React** с Vite – за бърза и модерна разработка
- **React Router** – за навигация
- **Hooks (useState, useEffect)** – за динамично поведение
- **JSON Server** – фалшив бекенд за съхранение на задачите
- **CSS** – за стил и анимации
- **GitHub** – за версиите

---

## ✅ Какво може приложението

- Регистрация и вход с потребителско име и парола
- Навигация според това дали си логнат
- Добавяне, редактиране и триене на задачи
- Всички задачи се пазят във фалшива база (`db.json`)
- Темен превключвател (тъмна и светла тема)
- Анимации при добавяне и премахване на задачи

---

## ▶️ Стартиране на базата данни и приложението

npx json-server --watch db.json --port 5000
npm run dev
