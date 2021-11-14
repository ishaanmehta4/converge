import React from 'react'
import { getUserApplications } from '../../API/application'
import ProjectCard from '../projectCard/ProjectCard'
import { Link } from 'react-router-dom'

import './style.scss'

function MyApplications() {
    let [applicationList, setApplicationList] = React.useState([])

    React.useEffect(() => {
        async function fetchData() {
            try {
                let applications = await getUserApplications()
                // applications = [...applications, ...applications, ...applications, ...applications, ...applications]
                setApplicationList(applications || [])
            } catch (error) {
                console.log('[MyApplications/fetchApplications]', error)
                // alert('Applications could not be fetched because an error was encountered.')
            }
        }
        fetchData()
    }, [])

    return (
        <div className="my-applications-wrapper">
            <h2>My Applications</h2>
            {
                applicationList.length <= 0 &&
                <h4>
                    {'No applications yet. Start applying by '}
                    <Link to="search-projects">searching for projects</Link>
                    .
                </h4>
            }
            {applicationList.filter(a => a.application_status === 'pending').length > 0 &&
                <h4>Pending applications</h4>}
            {applicationList.filter(a => a.application_status === 'pending').map((application, index) => {
                return (
                    <ProjectCard
                        key={index}
                        projectData={{ ...application.project, createdAt: application.createdAt }}
                    />
                )
            })}

            {applicationList.filter(a => a.application_status === 'accepted').length > 0 &&
                <h4>Accepted applications</h4>}
            {applicationList.filter(a => a.application_status === 'accepted').map((application, index) => {
                return (
                    <ProjectCard
                        key={index}
                        projectData={application.project}
                    />
                )
            })}

            {applicationList.filter(a => a.application_status === 'rejected').length > 0 &&
                <h4>Rejected applications</h4>}
            {applicationList.filter(a => a.application_status === 'rejected').map((application, index) => {
                return (
                    <ProjectCard
                        key={index}
                        projectData={application.project}
                    />
                )
            })}
        </div>
    )
}

export default MyApplications
