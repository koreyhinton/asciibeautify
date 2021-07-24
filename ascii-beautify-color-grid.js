export default ascii_beautify_color_grid = (ascii, color_map) => {
    var grid = [];
    var row=[];
    for (var i=0; i<ascii.length; i++) {
	var a = ascii[i];
	if (a == "\r"){}
	else if (a == "\n") {
	    grid.push(row);
	    row=null;
	    row=[];
	} else {
	    var obj={};
	    obj.color = color_map[a];
	    row.push(obj);
	}
    }
    if (row.length>0){
	grid.push(row);
    }
    return grid;
}
