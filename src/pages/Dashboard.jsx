import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';


const Dashboard = ()=>{

    const {loading:profileLoading} = useSelector((state)=> state.profile);
    const {loading:authLoading} = useSelector((state)=> state.auth);

    if(profileLoading || authLoading){
        return (
            <div>
                <div className='spinner'></div>
            </div>
        )
    }

    return(
        <div>
            <SideBar/>
            <div>
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}


export default Dashboard;