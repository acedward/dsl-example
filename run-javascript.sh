PROMPT="$*"

curl -XPOST localhost:3000/generate \
    -H "Content-Type: application/json" \
    -d '{ "language": "javascript", "prompt": "'"$PROMPT"'" }'