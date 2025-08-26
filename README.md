# 💻 Prueba Técnica Frontend

Aplicación desarrollada en **Next.js 14** con **App Router** y **TailwindCSS**, que implementa autenticación básica con rutas públicas y privadas, un **Dashboard** con KPIs y un módulo de **Withdrawals** para gestión de retiros.

---

## 🚀 Tecnologías utilizadas

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/) (UI rápida y responsive)

---

## 📌 Funcionalidades

### 🔐 Autenticación

- Login simple con cookie de sesión mock.
- Middleware que protege las **rutas privadas**.
- Rutas públicas: `/login`.
- Rutas privadas: `/dashboard`, `/withdrawals`.

**Usuario de prueba**

- Email: `demo@mail.com`
- Password: `123456`

### 📊 Dashboard

- Muestra KPIs:
  - **Saldo disponible**.
  - **En proceso** (retiros pendientes).
  - **Último retiro completado**.
- Datos obtenidos desde la **API interna**.

### 💸 Withdrawals

- Página para gestionar retiros.
- Acciones disponibles:
  - **GET /api/withdrawals** → Lista con paginación.
  - **POST /api/withdrawals** → Crear un nuevo retiro (máx $1000).
  - **POST /api/withdrawals/:id/cancel** → Cancelar si está en proceso.
  - **POST /api/withdrawals/:id/settle** → Marcar como completado.
- UI con tabla, botones de acción y manejo de estados (loading, error, vacío).

---

## 📂 Estructura principal

```
app/
 ├─ (private)/
 │   ├─ layout.tsx       # Layout con Navbar para rutas privadas
 │   ├─ dashboard/       # Dashboard con KPIs
 │   │   └─ page.tsx
 │   └─ withdrawals/     # Página Withdrawals
 │       └─ page.tsx
 ├─ login/
 │   └─ page.tsx         # Login público
 ├─ api/
 │   ├─ auth/            # Login y logout (cookies)
 │   └─ withdrawals/     # Endpoints de Withdrawals
components/
 └─ Navbar.tsx           # Navegación principal
```
