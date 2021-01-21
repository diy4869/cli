import { lazy } from 'react'
import Home from '@/view/home/home'

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/test',
    component: lazy(() => import('@/view/test/test'))
  },
  {
    path: '/test2',
    component: lazy(() => import('@/view/test2/test2'))
  }
]
