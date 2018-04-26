/* @flow */
import axios from 'axios';

import { State } from '../../models/state';
import { type Template } from '../../models/template';

export class StateTemplates extends State<Template[]> {
  api = async () => {
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
    const { allTemplates }: { allTemplates: Template[] } = data;
    return allTemplates;
    // const db = await getFirestore();    
    // const querySnaphot = await db.collection('templates').get();
    // const templates:Template[] = [];
    // querySnaphot.forEach((template: any) => {
    //   const templateData = template.data();
    //   templates.push({
    //     id: template.id,
    //     title: templateData.title,
    //     about: templateData.about,
    //   });
    // })
    // return templates;
  }
}

const state = new StateTemplates('FETCH_TEMPLATES');

export default state;
