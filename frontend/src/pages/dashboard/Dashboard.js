import React from 'react'
import UserProfile from '../../components/userProfile/UserProfile'
import MyProjects from '../../components/myProjects/MyProjects'
import MyApplications from '../../components/myApplications/MyApplications'
import { GlobalUserContext } from '../../App'

import './style.scss'
function Dashboard() {
    let { globalUserData } = React.useContext(GlobalUserContext)
    return (
        <div className="dashboard__grid">
            {/* left panel */}
            <div>
            {
                (globalUserData.user_type && globalUserData.user_type === 'applicant') ?
                    <MyApplications /> : <MyProjects />
            }
            </div>
            {/* right panel */}
            <div>
                <UserProfile />
            </div>
        </div>
    )
}

export default Dashboard
