
curl "https://api.graph.cool/simple/v1/cjgh3snvb2esy0163cgo8wsrc" -X POST \
                           -H "Content-Type: application/json" \
                            --data '{ "query": "{ templates: allTemplates { id, title, about } }" }' > client/src/api/templates.json
