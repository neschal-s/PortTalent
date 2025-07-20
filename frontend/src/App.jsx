import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import AppLayout from './layouts/app-layouts'
import LandingPage from './pages/landing'
import OnBoarding from './pages/onBoarding'
import JobPage from './pages/job'
import JobListing from './pages/job-listing'
import PostJob from './pages/post-job'
import SavedJobs from './pages/saved-job'
import MyJobs from './pages/my-jobs'
import ProtectedRoute from './components/ui/protected-route'



const router=createBrowserRouter([{
  element:<AppLayout/>,
  children:[
    {
      path:'/',
      element:<LandingPage/>
    },{
      path:'/onboarding',
      element:(
        <ProtectedRoute>
          <OnBoarding/>
        </ProtectedRoute>
      )
    }
    ,{
      path:'/jobs',
      element:(
        <ProtectedRoute>
          <JobListing/>
        </ProtectedRoute>
      )
    }
    ,{
      path:'/job/:id',
      element:(
        <ProtectedRoute>
          <JobPage/>
        </ProtectedRoute>
      )  
    }
    ,{
      path:'/post-job',
      element:(
        <ProtectedRoute>
          <PostJob/>
        </ProtectedRoute>
      )  
    }
    ,{
      path:'/saved-jobs',
      element:(
        <ProtectedRoute>
          <SavedJobs/>
        </ProtectedRoute>
      )  
    }
    ,{
      path:'/my-jobs',
      element:(
        <ProtectedRoute>
          <MyJobs/>
        </ProtectedRoute>
      )  
    },
  ]
}])


function App() {
  return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router}/>
        </ThemeProvider >
    
  )
}

export default App
