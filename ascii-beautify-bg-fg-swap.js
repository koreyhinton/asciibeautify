const ascii_beautify_bg_fg_swap = (theme, color) => {
  var has_color = false;
  var has_space = false;
  var cks = Object.keys(theme.colors); //color keys
  console.log(cks.length);
  var sp_idx = -1;
  var color_idx = -1;
  for (var i = 0; i < cks.length; i++) {
    var k = cks[i]; //key
    console.log(k);
    if (k === " ") {
      has_space = true;
      sp_idx = i;
    }
    if (theme.colors[k] == color) {
      has_color = true;
      color_idx = i;
    }
  }
  console.log("check swap");
  if (!has_color && !has_space) return theme;
  console.log("can swap");
  var temp = theme.colors[cks[sp_idx]];
  theme.colors[cks[sp_idx]] = theme.colors[color_idx];
  theme.colors[cks[color_idx]] = temp;
  console.log("sp: " + theme.colors[cks[sp_idx]]);
  return theme;
};

export default ascii_beautify_bg_fg_swap;
