#!/bin/sh

DISPLAY_MACBOOK_AIR=1440x900x24

xvfb-run --server-args="-screen 0 $DISPLAY_MACBOOK_AIR" "$@"
