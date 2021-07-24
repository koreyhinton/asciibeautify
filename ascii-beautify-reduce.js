const ascii_beautify_reduce = (theme, ascii) => {
  var subtheme = {};
  subtheme.name=theme.name;
  subtheme.colors={};
  var keys = Object.keys(theme.colors);
  for (var i=0; i<keys.length; i++) {
    if (ascii.includes(keys[i])) {
      subtheme.colors[keys[i]] = theme.colors[keys[i]];
    }
  }
  return subtheme;
}

export default ascii_beautify_reduce;
