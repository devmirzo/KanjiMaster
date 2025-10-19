/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Dark mode toggle uchun
  theme: {
    extend: {
      colors: {
        // Light mode ranglari
        light: {
          primary: "#384B70", // Asosiy brend rangi
          background: "#FCFAEE", // Asosiy fon
          secondary: "#7081A1", // Ikkilamchi element
          accent: "#F2C46D", // Aksent rang
          textPrimary: "#2E2E2E", // Matn asosiy
          textSecondary: "#6B6B6B", // Matn ikkilamchi
          border: "#E5E5E0", // Ajratuvchi chiziq
          success: "#4CAF50", // Muvaffaqiyat
          error: "#E63946", // Xato
          hover: "#2E3E5E", // Hover/focus
          links: "#51648F", // Linklar/ikonlar
          card: "#FFFFFF", // Panel/card fon
        },
        // Dark mode ranglari
        dark: {
          primary: "#FCFAEE", // Asosiy aksent
          background: "#1E2A3C", // Qoramtir fon
          secondary: "#51648F", // Ikkilamchi
          accent: "#F2C46D", // Iliq aksent
          textPrimary: "#FFFFFF", // Asosiy matn
          textSecondary: "#BFC8D8", // Kam ahamiyatli matn
          border: "#2F3D57", // Chiziq
          success: "#7DCE82", // Muvaffaqiyat
          error: "#FF6B6B", // Xato
          hover: "#E8E4D0", // Hover/focus
          links: "#F2C46D", // Linklar/ikonlar
          card: "#263347", // Panel/card fon
        },
      },
    },
  },
  plugins: [],
};

// Endi shuni shu ranglarga moslab berchihar bir rangni kerakli joyga ishlat hech biri ishlatilmay qolmasin.
