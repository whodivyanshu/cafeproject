import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);


export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {


    return auth().redirectToSignIn();
  }
});


export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
  
}