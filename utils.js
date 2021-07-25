export const asciiBeautifyBgFgSwap = (theme, color) => {
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

export const asciiBeautifyColorGrid = (ascii, color_map) => {
  var grid = [];
  var row = [];
  for (var i = 0; i < ascii.length; i++) {
    var a = ascii[i];
    if (a == "\r") {
    } else if (a == "\n") {
      grid.push(row);
      row = null;
      row = [];
    } else {
      var obj = {};
      obj.color = color_map[a];
      row.push(obj);
    }
  }
  if (row.length > 0) {
    grid.push(row);
  }
  return grid;
};

export const asciiBeautifyReduce = (theme, ascii) => {
  var subtheme = {};
  subtheme.name = theme.name;
  subtheme.colors = {};
  var keys = Object.keys(theme.colors);
  for (var i = 0; i < keys.length; i++) {
    if (ascii.includes(keys[i])) {
      subtheme.colors[keys[i]] = theme.colors[keys[i]];
    }
  }
  return subtheme;
};

export const fillBackgroundSpaces = (ascii) => {
  if (ascii == null || ascii.length == 0) {
    return;
  }
  var min_w = 999;
  var max_w = 0;
  var lines = ascii.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var ll = lines[i].length;
    if (ll < min_w) min_w = ll;
    if (ll > max_w) max_w = ll;
  }
  if (min_w == max_w) {
    return;
  }
  var padded_str = "";
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var trailer = "";
    if (line[line.length - 1] == "\r") {
      trailer = "\r";
    }
    var oops = 0;
    while (line.length < max_w) {
      line += " ";
      if (oops > 300) break;
    }
    line += trailer;
    line += "\n";
    padded_str += line;
  }
  return padded_str;
};

export const colorTemplate = {
  0: "#FFFFFF",
  1: "#FFFFFF",
  2: "#FFFFFF",
  3: "#FFFFFF",
  4: "#FFFFFF",
  5: "#FFFFFF",
  6: "#FFFFFF",
  7: "#FFFFFF",
  8: "#FFFFFF",
  9: "#FFFFFF",
  " ": "#FFFFFF",
  "!": "#FFFFFF",
  '"': "#FFFFFF",
  "#": "#FFFFFF",
  $: "#FFFFFF",
  "%": "#FFFFFF",
  "&": "#FFFFFF",
  "'": "#FFFFFF",
  "(": "#FFFFFF",
  ")": "#FFFFFF",
  "*": "#FFFFFF",
  "+": "#FFFFFF",
  ",": "#FFFFFF",
  "-": "#FFFFFF",
  ".": "#FFFFFF",
  "/": "#FFFFFF",
  ":": "#FFFFFF",
  ";": "#FFFFFF",
  "<": "#FFFFFF",
  "=": "#FFFFFF",
  ">": "#FFFFFF",
  "?": "#FFFFFF",
  "@": "#FFFFFF",
  A: "#FFFFFF",
  B: "#FFFFFF",
  C: "#FFFFFF",
  D: "#FFFFFF",
  E: "#FFFFFF",
  F: "#FFFFFF",
  G: "#FFFFFF",
  H: "#FFFFFF",
  I: "#FFFFFF",
  J: "#FFFFFF",
  K: "#FFFFFF",
  L: "#FFFFFF",
  M: "#FFFFFF",
  N: "#FFFFFF",
  O: "#FFFFFF",
  P: "#FFFFFF",
  Q: "#FFFFFF",
  R: "#FFFFFF",
  S: "#FFFFFF",
  T: "#FFFFFF",
  U: "#FFFFFF",
  V: "#FFFFFF",
  W: "#FFFFFF",
  X: "#FFFFFF",
  Y: "#FFFFFF",
  Z: "#FFFFFF",
  "[": "#FFFFFF",
  "\\": "#FFFFFF",
  "]": "#FFFFFF",
  "^": "#FFFFFF",
  _: "#FFFFFF",
  "`": "#FFFFFF",
  a: "#FFFFFF",
  b: "#FFFFFF",
  c: "#FFFFFF",
  d: "#FFFFFF",
  e: "#FFFFFF",
  f: "#FFFFFF",
  g: "#FFFFFF",
  h: "#FFFFFF",
  i: "#FFFFFF",
  j: "#FFFFFF",
  k: "#FFFFFF",
  l: "#FFFFFF",
  m: "#FFFFFF",
  n: "#FFFFFF",
  o: "#FFFFFF",
  p: "#FFFFFF",
  q: "#FFFFFF",
  r: "#FFFFFF",
  s: "#FFFFFF",
  t: "#FFFFFF",
  u: "#FFFFFF",
  v: "#FFFFFF",
  w: "#FFFFFF",
  x: "#FFFFFF",
  y: "#FFFFFF",
  z: "#FFFFFF",
  "{": "#FFFFFF",
  "|": "#FFFFFF",
  "}": "#FFFFFF",
  "~": "#FFFFFF",
};

export const designsTemplate = [
  {
    name: "Computer",
    ascii: `
    iiiiiii
    i     i
    i     i 
    ||___||
    |   _ |
    |_____|
    /_/_|_\_\      
    /_/_|_\_\------|
    /_/__|__\_\    |
    /_/__|__\_\    |
                []] 
                []]
                []]      
                   `,
  },
  {
    name: "Dino",
    ascii: `
     _____              
     _ ___|
    __.ii,|
    (__," |
        | |
        | |
        | |
        | |
        | |---------------
       /|                --
       /                 ---
       |--------------------------    
       || //'     '||'   ||
       || ((      '||'   ||
       || '||'      |'   ||
       ||  '||'     |'  ||
      /_|   /_|    /_| /_|  
          `,
  },
  {
    name: "Cacti",
    ascii: `
        iiiiii   
        i    i   iiiii   
  iiiii i    i   i   i   
  i   i i o  i   i o i  
  i o iii    i   i   i   
  i       o  iiiii o i   
  iiiiiii            i   
        i  o  iiiiiiii   
        i     i   
        i  o  i   
        i     i   
        iiiiiii   
`,
  },
  {
    name: "Staircase",
    ascii: `
    
    -     ||    
    --    ||    
    ---    
    ----    
    -----       
    ------    
    -------    
    --------    
    ---------    
            `,
  },
];
