#!/bin/bash
set -ue

APP_NAME="withnicome"
SCRIPT_PATH="$(dirname "$(readlink -f "${0}")")/"

error_exit() {
    printf "%s\n" "${*}" >&2
    exit 1
}

# Check next version.
currentVer="$(sed -ne 's/.*[, \t]\+"version":\ \?"\([0-9.]\+\)",\?/\1/p' "${SCRIPT_PATH}manifest.json")"
printf "CURRENT_VERSION: %s\n" "${currentVer}"

# Use arg to next version
if test "${#}" -ne "0"; then
    nextVer="${1}"
else
    printf "NEXT_VERSION>>"
    read nextVer
fi

# If $REPLY is blank, maintain the version number.
if test "${nextVer}" == ""; then
    nextVer="${currentVer}"
    printf "Version remains: %s\n" "${nextVer}" >&2
fi

# Update version number
printf "%s\n" "${nextVer}" |
    grep -e '^[0-9]\+\(\.[0-9]\+\)*$' >/dev/null 2>&1 ||
    error_exit "invalid version format"
# Compare as strings so these may be deciamals.
if test "${nextVer}" != "${currentVer}"; then
    sed -i "s/\(.*\"version\":\ \?\"\)[0-9.]\+\(\",\?\)/\1${nextVer}\2/" "${SCRIPT_PATH}manifest.json"
fi

# Build
outDir="${SCRIPT_PATH}build/"
mkdir -p "${outDir}"
cd "${SCRIPT_PATH}" && zip -r "${outDir}${APP_NAME}-${nextVer}.xpi" icons/ content_script/ manifest.json
printf "build: %s\n" "${outDir}${APP_NAME}-${nextVer}.xpi" >&2
