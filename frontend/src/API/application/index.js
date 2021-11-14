import axios from 'axios'

export var addApplication = async (new_application_data) => {
    let token = localStorage.getItem('token');
    if (!token || token == null || token === 'null') { return {} }
    try {
        let response = await axios.post('/api/applications/create', {
            new_application_data
        }, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })

        if (response.data.status === 'success') {
            // response.data.data.applications = [];
            return [response.data.data, null]
        }
        else if (response.data.status === 'error') return [false, response.data.error]
    } catch (error) {
        console.log('[addApplication]')
        console.log(error.response.data.error)
        return [false, error.response.data.error]
    }
}

export var getUserApplications = async () => {
    let token = localStorage.getItem('token');
    // console.log({token})
    if (!token || token == null || token === 'null') { return [] }
    try {
        let response = await axios.get('/api/applications/list/self', {
            headers: {
                authorization: 'Bearer ' + token
            }
        })

        return response.data.data;
    } catch (error) {
        console.log('[getUserApplications]')
        console.log(error.response.data.error)
    }
}

export var getApplicationData = async () => {
    try {

    } catch (error) {
        console.log('[getApplicationData]')
    }
}

export var updateApplication = async (applicationId, updated_data) => {
    let token = localStorage.getItem('token');
    if (!token || token == null || token === 'null') { return {} }
    if (updated_data.skillString) updated_data.skillString = null
    // console.log({updated_data})
    // return [true, null]
    try {
        let response = await axios.put('/api/applications/doc/' + applicationId, {
            updated_data
        }, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })

        if (response.data.status === 'success') return [true, null]
        else if (response.data.status === 'error') return [false, response.data.error]
    } catch (error) {

        console.log('[updateApplication]')
        console.log(error.response.data.error)
        return [false, error.response.data.error]
    }
}

export var updateApplicationStatus = async (application_id, updated_status) => {
    let token = localStorage.getItem('token');
    if (!token || token == null || token === 'null') { return [false, 'Not logged in.'] }
    try {
        let response = await axios.put(`/api/applications/doc/${application_id}/status`, {
            updated_status
        }, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })

        if (response.data.status === 'success') {
            // response.data.data.applications = [];
            return [true, null]
        }
        else if (response.data.status === 'error') return [false, response.data.error]

    } catch (error) {
        console.log('[updateApplicationStatus]')
        console.log(error.response.data.error)
        return [false, error.response.data.error]
    }
}

export var deleteApplication = async () => {
    try {

    } catch (error) {
        console.log('[deleteApplication]')
    }
}
