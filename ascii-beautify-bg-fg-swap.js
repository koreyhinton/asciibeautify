const ascii_beautify_bg_fg_swap = (theme) => {
  var has_white = false;
  var has_space = false;
  var cks = Object.keys(theme.colors);//color keys
  console.log(cks.length);
  var sp_idx=-1;
  var wht_idx=-1;
  for (var i=0;i<cks.length;i++) {
    var k = cks[i]; //key
    console.log(k);
    if (k===' ') {
      has_space = true;
      sp_idx=i;
    }
    if (theme.colors[k] == "#fff" ||theme.colors[k] == "#ffffff" || theme.colors[k]=="white"||theme.colors[k] == "#FFF"|theme.colors[k] == "#FFFFFF") {
      has_white=true;
      wht_idx=i;
    }
  }
  console.log("check swap");
  if (!has_white && !has_space) return theme;
  console.log("can swap");
  var temp = theme.colors[sp_idx];
  theme.colors[cks[sp_idx]] = theme.colors[wht_idx];
  theme.colors[cks[wht_idx]] = temp;
  console.log("sp: " + theme.colors[sp_idx]);
  return theme;
}

export default ascii_beautify_bg_fg_swap;
