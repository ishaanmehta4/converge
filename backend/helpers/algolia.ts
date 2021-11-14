import algoliasearch from 'algoliasearch';
import { IProject } from '../interfaces';

const APP_ID = process.env.ALGOLIA_APP_ID || '';
const ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY || '';

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('projects');

/**
 * Adds the information about the new project to Algolia's search index
 * @param project MongoDB project document, with the new project data
 */
export var addProjectToIndex = async (project: IProject) => {
  try {
    let { title, description, tags, skills_required, _id: objectID } = project;
    let searchObject = {
      objectID,
      title,
      description,
      tags,
      skills_required,
    };

    if (project.address && project.address.city) {
      (searchObject as any).city = project.address.city;
    }

    await index.saveObjects([searchObject]);
  } catch (error) {
    console.log('[helpers/algolia]', error);
  }
};
