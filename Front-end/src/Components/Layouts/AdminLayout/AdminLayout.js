import React from 'react';
import './AdminLayout.css';


export default function AdminLayout({ children }) {
    return (
        <>



            <div className="AdminMain">


                {children}
            </div>



        </>
    );
}