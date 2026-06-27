export const siteConfig = {
  candidateName: 'Sahithi',
  productName: 'Scholar Submission Hub',
  brandMark: 'SA',
  tagline: 'Student assignment portal with database',
  heroLabel: 'Backend-driven academic system',
  heroTitle: 'Keep student assignments, scores, and reviews organized from end to end.',
  heroCopy:
    'This project combines a React frontend with an Express and MongoDB backend so staff can maintain student records, publish assignments, and track submission progress.',
  theme: {
    primary: '#0f766e',
    primaryDark: '#134e4a',
    accent: '#eab308',
    ink: '#172033',
    muted: '#5f6f83',
    line: '#d7e0ea',
    surface: '#ffffff',
    soft: '#ecfeff',
    background:
      'radial-gradient(circle at top left, rgba(234, 179, 8, 0.18), transparent 28rem), linear-gradient(180deg, #fffbeb 0%, #f5f9ef 100%)',
  },
};

export const themeStyle = {
  '--primary': siteConfig.theme.primary,
  '--primary-dark': siteConfig.theme.primaryDark,
  '--accent': siteConfig.theme.accent,
  '--ink': siteConfig.theme.ink,
  '--muted': siteConfig.theme.muted,
  '--line': siteConfig.theme.line,
  '--surface': siteConfig.theme.surface,
  '--soft': siteConfig.theme.soft,
  '--page-background': siteConfig.theme.background,
};
