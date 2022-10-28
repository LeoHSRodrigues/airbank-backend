
#!/bin/bash
rimraf ./dist
tsc --project tsconfig.json
tscpaths -p tsconfig.json -s ./ -o ./dist
prisma generate
cp -r ./src/app/graphql/types ./dist/src/app/graphql
cp -r ./prisma ./dist/prisma