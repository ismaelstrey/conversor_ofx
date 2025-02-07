import React from 'react'
import Sidebar from '../sidebar'

export default function Template
    ({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex bg-slate-700 min-h-screen'>

            <Sidebar />
            <div className='flex-1'>
                {children}</div>
        </div>
    )
}
