#!/bin/bash
# execute all files in the Generators directory
for file in Generators/*.sh; do
    bash $file
done
