import React from 'react'
import UserProfile from '../../components/userProfile/UserProfile'
import './style.scss'
function Dashboard() {
    return (
        <div className="dashboard__grid">
            {/* left panel */}
            <div>
                <h2 className="p-8">My applications</h2>
            </div>
            {/* right panel */}
            <div>
                <UserProfile />
            </div>
        </div>
    )
}

export default Dashboard
