#!/bin/bash

# Requires ImageMagick
# and that ImageMagick's mogrify utility is in PATH

mogrify -format png "${1}/img.xpm" 1>>/dev/null 2>>/dev/null
cd "${ASCII_BEAUTIFY_DIR}/server_data" 1>>/dev/null 2>>/dev/null
zip -r "${1}.zip" "${1}" 1>>/dev/null 2>>/dev/null
echo "${1}.zip"
