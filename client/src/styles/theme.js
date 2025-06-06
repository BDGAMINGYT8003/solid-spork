export const theme = {
  colors: {
    primary: '#FFC0CB', // Soft Pink
    secondary: '#FFB6C1', // Light Pink
    accent: '#FF69B4', // Hot Pink (use sparingly for accents)
    roseGold: '#B76E79',
    blush: '#DE5D83',
    warmWhite: '#FFF8F0', // A slightly warm white
    pastelHarmony1: '#FFDAB9', // Peach Puff
    pastelHarmony2: '#E6E6FA', // Lavender
    textColor: '#5C3317', // A deep, warm brown for readability
    borderColor: '#FFDAE9', // Light pink for borders
  },
  fonts: {
    main: "'Dancing Script', cursive", // A romantic, flowing script for headings/accents
    body: "'Nunito Sans', sans-serif", // A clean, soft, and readable sans-serif for body text
    materialIcons: "'Material Icons'", // For Material Design icons
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  typography: {
    h1: {
      fontSize: '2.8rem', // Responsive units later
      fontWeight: '700',
      fontFamily: "'Dancing Script', cursive",
      lineHeight: '1.2',
    },
    h2: {
      fontSize: '2.2rem',
      fontWeight: '700',
      fontFamily: "'Dancing Script', cursive",
      lineHeight: '1.3',
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: '700',
      fontFamily: "'Nunito Sans', sans-serif",
      lineHeight: '1.4',
    },
    body: {
      fontSize: '1rem', // Base font size
      fontWeight: '400',
      fontFamily: "'Nunito Sans', sans-serif",
      lineHeight: '1.6',
    },
    caption: {
      fontSize: '0.8rem',
      fontWeight: '400',
      fontFamily: "'Nunito Sans', sans-serif",
      lineHeight: '1.5',
    }
  },
  shadows: {
    soft: '0px 4px 15px rgba(183, 110, 121, 0.1)', // Soft pinkish shadow
    medium: '0px 8px 25px rgba(183, 110, 121, 0.15)',
  },
  borderRadius: '8px',
  // More Material Design 3 inspired tokens can be added here
  // e.g., elevation, shape scales, motion easing functions
};
