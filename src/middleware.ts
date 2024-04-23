import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()
// {
//   publicRoutes: [
//     '/',
//     '/(api|trpc)(.*)',
//     '/restaurant',
//     '/restaurant/food/:id',
//     '/restaurant/:id',
//     '/restaurant/:id/review',
//     '/restaurant/:id/review/:id',
//     '/restaurant/:id/review/:id/edit',
//     '/restaurant/:id/edit',
//     '/restaurant/:id/food',
//     '/restaurant/:id/food/:id',
//     '/restaurant/:id/food/:id/edit',
//     '/restaurant/:id/food/:id/review',
//     '/restaurant/'
//   ]
// }

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
