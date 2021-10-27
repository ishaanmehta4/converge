import React from 'react'
import UserProfile from '../../components/userProfile/UserProfile'
import MyProjects from '../../components/myProjects/MyProjects'
import './style.scss'
function Dashboard() {
    return (
        <div className="dashboard__grid">
            {/* left panel */}
            <div>
                <MyProjects />
            </div>
            {/* right panel */}
            <div>
                <UserProfile />
            </div>
        </div>
    )
}

export default Dashboard
