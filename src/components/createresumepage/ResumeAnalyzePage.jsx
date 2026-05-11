import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../header/Header'
import ResumeUploader from '../CreateResume/CreateResume'

const ResumeAnalyzePage = () => {
    return (
        <>
            <Header/>       
            <Sidebar />
            <ResumeUploader/>
        </>
    )
}

export default ResumeAnalyzePage