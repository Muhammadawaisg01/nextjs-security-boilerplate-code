

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


export function middleware(request) {

    const pathname = request.nextUrl.pathname;
    // Allow specific routes without authentication
    if (
        pathname.startsWith("/login_page") ||
        pathname.startsWith("/signup_page")
    ) {
        return NextResponse.next();
    }

    const token = request.cookies.get('Security_token')?.value; // Get JWT from cookies

    if (!token) {
        // Redirect to login if no token
        return NextResponse.redirect(new URL('/login_page', request.url));
    }

    try {
        // Verify the token
        var payload = jwt.decode(token);
        console.log("Payload in middleware  ", payload);

        return NextResponse.next(); // Allow the request if token is valid
    } catch (error) {
        // Invalid token, redirect to login
        return NextResponse.redirect(new URL('/login_page', request.url));
        // return NextResponse.next(); 
    }
}

// Only run the middleware on the `/dashboard` route
export const config = {
    matcher: ['/dashboard'], // Apply middleware for /dashboard and subroutes
    // runtime:"experimental-edge"
};



