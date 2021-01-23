import React from "react";
import Link from 'next/link'

export default function Layout({children}) {
    return <React.Fragment>
        <header
            className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <p className="h5 my-0 me-md-auto fw-normal">KayKroo</p>
            <nav className="my-2 my-md-0 me-md-3">

                <Link href={'/'}>
                    <a className="p-2 text-dark" href="#">List Users</a>
                </Link>
                <Link href={'/create'}>
                    <a className="p-2 text-dark" href="#">Create User</a>
                </Link>
            </nav>
            <Link href={'/login'}>
                <a className="btn btn-outline-primary" href="#">Login</a>
            </Link>
        </header>

        <main className="container">
            {children}
        </main>
    </React.Fragment>
}