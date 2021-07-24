<?php
	if (mb_strlen($xpm, '8bit') > 3000000) {
	   echo "XPM file size exceeds 3MB limit";
	   exit(1);
	}
	// make sure to add execute permission on snatch.bash
	$dir = shell_exec(getenv('ASCII_BEAUTIFY_DIR') . "/server_scripts/snatch.bash");
	$zip = shell_exec(getenv('ASCII_BEAUTIFY_DIR') . "/server_scripts/convert.bash" . " " . $dir);
	header("Content-type: application/zip");
	header("Content-Disposition: attachment; filename=$zip");
	header("Content-length: " . filesize($zip));
	header("Pragma: no-cache");
	header("Expires: 0");
	readfile("$zip");
?>