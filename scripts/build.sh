#!/bin/bash
if [ -z $1 ]
then
  echo "A version must be provided."
  exit 1
fi

vue-cli-service build \
  --no-clean \
  --target lib \
  --inline-vue \
  --name bmc \
  --filename bmc.$1 \
  --formats umd-min \
  src/lib.js
