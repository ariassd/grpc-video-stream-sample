  
#!/bin/bash
WHITE='\033[1;39m'
RED='\033[1;31m'
GREEN='\033[1;32m'
DEFAULT='\033[1;39m'
YELLOW='\033[1;93m'
MAGENTA='\033[1;95m'

trap "exit" INT TERM ERR
trap "kill 0" EXIT



printf "${GREEN} STARTING SERVER ${DEFAULT}";
# node server.js &>/dev/null & # silent
node server.js &
echo ''

echo "----------------------------------------------------------------"

while [ "$cmd" != "Yes" ]; do
  echo "${GREEN}App is running, Write CTRL+C or EXIT to exit or write a command  ${DEFAULT}"
  echo "${GREEN}Type ${MAGENTA}get${GREEN} to get stream"

  printf "${YELLOW}@sample/$>"
  printf "${GREEN}"
  read cmd
  if [ "$cmd" == "get" ]; then
      printf "${WHITE}"
      node client.js
      printf "${GREEN}"
  else
      ( eval $cmd ) || 'Command throws error'
  fi
  echo ''
done


wait