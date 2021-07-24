#!/bin/bash

if   [[ -z "${ASCII_BEAUTIFY_DIR}" ]];
then exit 1;
fi

ts_now=$(date '+%Y%m%d%H%M%S')
ts=${ts::-1}  # allow on 10-sec interval
hr=${ts::-4}

while [[ -d "${ASCII_BEAUTIFY_DIR}/server_data/${ts}" ]]
do
    sleep 1s
    ts_now=$(date '+%Y%m%d%H%M%S')
    ts=${ts::-1}  # allow on 10-sec interval
    hr=${ts::-4}
done
mkdir -p "${ts}"

for ((i=0; i<1000; i++)); do
    ((hr--));
    rm -r "${ASCII_BEAUTIFY_DIR}/server_data/${hr}*/" 1>>/dev/null 2>>/dev/null
done

echo "${ASCII_BEAUTIFY_DIR}/server_data/${ts}"
