

# Add package as a "linked" package to force
echo ""
echo "Linking $1"
npx yalc add $1

# Try to install force's dependencies (retry if it fails)
echo ""
echo "Installing dependencies"
n=0
until [ $n -ge 3 ]
do
  yarn --check-files && break

  echo "Installing force dependencies failed, retrying... ($n/3)"

  n=$[$n+1]
  sleep 1
done

echo ""
echo "Beginning service"
if [ -z "$ENABLE_DEBUGGER" ]; then
  # Start force without debugger
  TERM_PROGRAM=other yarn start
else
  # Start force with debugger
  yarn start
fi