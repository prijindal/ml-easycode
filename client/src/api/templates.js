const axios = require('axios');

const getTemplates = async () => {
  const { data: { data } } = await axios({
    url: "https://api.graph.cool/simple/v1/cjgh3snvb2esy0163cgo8wsrc",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    data: JSON.stringify({
      query:"{\n  allTemplates {\n    id\n    title\n    about\n  }\n}\n",
      variables: {}
    })
  })
  const { allTemplates } = data;
  return allTemplates;
}

export default getTemplates;
