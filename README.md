# Razumly app

## Setup

```
yarn install
yarn dev
```

## 🎨 Design Tokens & Tailwind Theme Setup

This project uses a **custom design token system** via CSS variables (`--var`) integrated into Tailwind using `hsl(var(...))` format. It supports light/dark themes, semantic naming, and centralized control over UI appearance.

---

## ✅ Tailwind Theme Configuration

Custom tokens are defined in `core/styles/global.css` and connected via Tailwind's `extend.colors`.

---

## 🎨 Common Text Colors

| Semantic Name        | HEX       | HSL            | Tailwind Class          |
| -------------------- | --------- | -------------- | ----------------------- |
| Primary Text         | `#5766DB` | `231 64% 59%`  | `text-primary`          |
| Muted / Secondary    | `#F0F2FF` | `231 100% 97%` | `text-secondary`        |
| Placeholder (opt-in) | `#333333` | `0 0% 20%`     | `text-muted-foreground` |

---

## 🌗 Theme Tokens (in `theme.css`)

- Defined in `:root {}` for light theme
- Overridden in `.dark {}` for dark theme
- Examples:
  ```css
  --primary: 231 64% 59%; /* #5766DB */
  --secondary: 231 100% 97%; /* #F0F2FF */
  --muted-foreground: 0 0% 20%; /* #333333 */
  ```

---

## 📦 File Structure (theme-related)

```
src/
├── app/
│   └── (marketing)/
│   └── app/
│       └── dashboard/
│       └── history/
│       ...
│   └── auth/page.tsx
│   └── api/auth/[...nextauth]/route.ts
├── core/
│   └── styles/
│       └── theme.css
│   └── ui/
│   └── hooks/
│   └── lib/
│       ...
├── modules/
│   └── marketing/
│   └── auth/
│   └── app/
├── tailwind.config.ts
```

---

## 🧠 Tips

- Avoid using hardcoded HEX colors in JSX.
- Use semantic Tailwind classes: `bg-brand`, `text-muted-foreground`, etc.
- This setup makes it easy to extend themes, create dark/light variations, and apply consistent branding.
