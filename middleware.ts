import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/personal-room',
    '/meeting(.*)'
])


export default clerkMiddleware(async(auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If user is NOT signed in and tries to access a protected route → Redirect to sign-in
  if (!userId && protectedRoutes(req)) {
    return redirectToSignIn(); 
  }

  return NextResponse.next(); // Allow request to proceed
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};


