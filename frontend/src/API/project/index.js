import axios from 'axios'

export var addProject = async (new_project_data) => {
    let token = localStorage.getItem('idToken');
    if (!token || token == null || token === 'null') {return {}}
    try {
        let response = await axios.post('/api/projects/create', {
            new_project_data
        }, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })

        if (response.data.status === 'success') {
            response.data.data.applications = [];
            return [response.data.data, null]
        }
        else if (response.data.status === 'error') return [false, response.data.error]
    } catch (error) {
        console.log('[addProject]')
        console.log(error.response.data.error)
        return [false, error.response.data.error]
    }
}

export var getUserProjects = async () => {
    let token = localStorage.getItem('idToken');
// console.log({token})
    if (!token || token == null || token === 'null') {return []}
    try {
        let response = await axios.get('/api/projects/list/self', {
            headers: {
                authorization: 'Bearer ' + token
            } 
        })

        return response.data.data;
    } catch (error) {
        console.log('[getUserProjects]')
        console.log(error.response.data.error)
    }
}

export var getProjectData = async () => {
    try {

    } catch (error) {
        console.log('[getProjectData]')
    }
}

export var updateProject = async (projectId, updated_data) => {
    let token = localStorage.getItem('idToken');
    if (!token || token == null || token === 'null') {return {}}
    if(updated_data.skillString) updated_data.skillString = null
    // console.log({updated_data})
    // return [true, null]
    try {
        let response = await axios.put('/api/projects/doc/' + projectId, {
            updated_data
        }, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })

        if (response.data.status === 'success') return [true, null]
        else if (response.data.status === 'error') return [false, response.data.error]
    } catch (error) {
  
        console.log('[updateProject]')
        console.log(error.response.data.error)
        return [false, error.response.data.error]
    }
}

export var deleteProject = async () => {
    try {

    } catch (error) {
        console.log('[deleteProject]')
    }
}
