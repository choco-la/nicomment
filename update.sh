#!/bin/bash
set -ue

APP_NAME="withnicome"
SCRIPT_PATH="$(dirname "$(readlink -f "${0}")")/"


error_exit() {
	printf "%s\n" "${*}" >&2
	exit 1
}


# Chck next version
currentVer="$(sed  -ne 's/\t*"version":\ \?"\([0-9.]\+\)",\?/\1/p' "${SCRIPT_PATH}manifest.json")"
printf "CURRENT_VERSION: %s\n" "${currentVer}"


# Use arg to next version
if test "${#}" -ne "0"; then
	nextVer="${1}"
else
	read -p "NEXT_VERSION>>" nextVer
fi


# if blank, remains version number
if test "${nextVer}" == ""; then
	nextVer="${currentVer}"
	printf "Version remains: %s\n" "${nextVer}" >&2
fi


# Update version number
grep -e '^[0-9]\+\(\.[0-9]\+\)*$' <<<"${nextVer}" >/dev/null 2>&1 || error_exit "invalid version format"
sed -i "s/\(.*\"version\":\ \?\"\)[0-9.]\+\(\",\?\)/\1${nextVer}\2/" "${SCRIPT_PATH}manifest.json"


# build
mkdir -p "${SCRIPT_PATH}build/"
tmpDir="$(mktemp -d -p "${SCRIPT_PATH}build/")/"
cd "${SCRIPT_PATH}" && zip -r "${tmpDir}${APP_NAME}-${nextVer}.xpi" icons/ js/ manifest.json
printf "build: %s\n" "${tmpDir}${APP_NAME}-${nextVer}.xpi" >&2
