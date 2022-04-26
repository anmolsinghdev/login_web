import React, { useEffect, useState } from 'react'
import { Header, GlobalStyle } from './styles/style'
import { Link } from "react-router-dom";


const pages = ['Home', 'Database'];
const pagesTwo = ['Home', 'Database', 'Signup'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
    const [check, setCheck] = useState(false);

    useEffect(() => {
        setCheck(!check)
    }, [check])

    return (
        <>
            <GlobalStyle />
            <Header>
                <ul>
                    {(window.location.pathname === '/Database') ?
                        pagesTwo.map((e, index) => {
                            return <Link key={index} to={(e === 'Home') ? '/' : `/${e}`} className='text-link'> {e}</Link>
                        })
                        :
                        pages.map((e, index) => {
                            return <Link key={index} to={(e === 'Home') ? '/' : `/${e}`} className='text-link'> {e}</Link>
                        })
                    }
                </ul>
            </Header>
        </>
    )
};


export default Navbar;