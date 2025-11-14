import React, { useEffect , useState } from 'react'
import {NavbarLinks} from "../../data/navbar-links"
import { Link, matchPath } from 'react-router-dom';
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import {IoIosArrowDown} from "react-icons/io" 

import ProfileDropDown from "../core/Auth/ProfileDropDown"
const Navbar = ()=>{
    const location = useLocation(); 
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);
    console.log(token);

    const [subLinks , setSubLinks] = useState([]);

   
        const fetchSubLinks = async()=>{
            try{
                const result = await apiConnector("GET" , categories.CATEGORIES_API);
                console.log("Printing subLinks result ", result);
                setSubLinks(result.data.data);
            }
            catch(err){
                console.log("Could not find the category list")
            }
        }
         
        useEffect(()=>{
            fetchSubLinks();
        } , [])

    
    return(
        <div className='h-14 w-screen flex justify-center items-center bg-richblack-800'>
            
            <div className='flex w-10/12 justify-between items-center'>

                <Link to={"/"}>
                    <img src={logo} width={130} height={40}/>
                </Link>

                <ul className='flex gap-5 text-richblack-25'>
                    {
                        NavbarLinks.map((link,index)=>{
                            return (
                                <li key={index}>
                                    {
                                        link.title === "Catalog"?(
                                            <div className='flex gap-1 justify-center items-center group relative'>
                                                <p>{link.title}</p>
                                                <IoIosArrowDown/>

                                                <div className='invisible absolute left-[50%]
                                                            translate-x-[-50%] translate-y-[130%]
                                                            
                                                            flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                                            opacity-0 transition-all duration-200 group-hover:visible
                                                            group-hover:opacity-100 lg:w-[200px]
                                                '>
                                                    <div className='absolute left-[50%] top-0
                                                            translate-x-[75%]
                                                            translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
 
                                                    </div>

                                                    {
                                                        Array.isArray(subLinks) && subLinks.length > 0 ? (subLinks.map((subLink,index)=>(
                                                            <Link to={subLink.link} key={index}>
                                                                <p>
                                                                    {subLink.title}
                                                                </p>
                                                            </Link>
                                                        ))):(<div></div>)
                                                    }
                                                </div>

                                            </div>
                                        ):(
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25":"text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            
                {/* login and signup */}
                <div className='flex gap-5'>
                    {/* Show cart */}
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to={"/dashboard/cart"} className='relative'>
                                <AiOutlineShoppingCart/>
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {/* Show login button */}
                    { 
                        token === null && (
                            <Link to={"/login"}>
                                <button className='text-richblack-100 border border-richblack-700 rounded-md px-3 py-1'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    
                    {/* Show signup button */}
                    {
                        token === null && (
                            <Link to={"/signup"}>
                                <button className='text-richblack-100 border border-richblack-700 rounded-md px-3 py-1'>
                                    Signup
                                </button>
                            </Link>
                        )
                    }
    
                    {
                        token !== null && <ProfileDropDown />
                    }

                </div>

            </div>
            
        </div>
    )
}


export default Navbar;