import axios from 'axios'

export var addUser = async (new_user_data) => {
    let token = localStorage.getItem('token');
    if (!token) return {};
    try {
        let response = await axios.post('/api/users/create', {
            new_user_data
        }, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })

        if (response.data.status === 'success') return [true, null]
        else if (response.data.status === 'error') return [false, response.data.error]
    } catch (error) {
        console.log('[addUser]')
        console.log(error.response.data.error)
        return [false, error.response.data.error]
    }
}

export var getCurrentUserData = async () => {
    let token = localStorage.getItem('token');
    if (!token) return {};
    try {
        let response = await axios.get('/api/users/doc/self', {
            headers: {
                authorization: 'Bearer ' + token
            }
        })

        return response.data.data;
    } catch (error) {
        if (error.response.data.error === 'user/notFound') {
            window.location.href = '/complete-signup'
        }

        console.log('[getCurrentUserData]')
        console.log(error.response.data.error)
    }
}

export var getUserData = async () => {
    try {

    } catch (error) {
        console.log('[getUserData]')
    }
}

export var updateUser = async (updated_data) => {
    let token = localStorage.getItem('token');
    if (!token) return {};
    if(updated_data.skillString) updated_data.skillString = null
    // console.log({updated_data})
    // return [true, null]
    try {
        let response = await axios.put('/api/users/doc/self', {
            updated_data
        }, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })

        if (response.data.status === 'success') return [true, null]
        else if (response.data.status === 'error') return [false, response.data.error]
    } catch (error) {
        if (error.response.data.error === 'user/notFound') {
            window.location.href = '/complete-signup'
        }

        console.log('[updateUser]')
        console.log(error.response.data.error)
        return [false, error.response.data.error]
    }
}

export var deleteUser = async () => {
    try {

    } catch (error) {
        console.log('[deleteUser]')
    }
}
