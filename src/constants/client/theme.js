const commonTheme = {
  fontBase: 'Segoe UI, HelveticaNeue-Light, sans-serif',
  color: {
    primary: '#1DA',
    linkColor: '#1DA57A',
  },
};

const styledTheme = {
  /*
   * Typography
   * ======================================================================== */
  fontFamilyBase: commonTheme.fontBase,

  /*
   * Layout
   * ======================================================================== */
  maxContentWidth: '1000px',

  /*
   * Media queries breakpoints
   * ======================================================================== */

  screenXsMin: '480px' /* Extra small screen / phone */,
  screenSmMin: '768px' /* Small screen / tablet */,
  screenMdMin: '992px' /* Medium screen / desktop */,
  screenLgMin: '1200px' /* Large screen / wide desktop */,
};

const antDTheme = {
  'primary-color': commonTheme.color.primary,
  'link-color': commonTheme.color.linkColor,
  'border-radius-base': '2px',
};

export { commonTheme, styledTheme, antDTheme };
