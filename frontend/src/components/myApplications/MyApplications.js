import React from 'react'
import { getUserApplications } from '../../API/application'
import ProjectCard from '../projectCard/ProjectCard'

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
        <div class="my-applications-wrapper">
            <h3>My Applications</h3>
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

            {applicationList.filter(a=>a.application_status === 'rejected').length > 0 &&
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
