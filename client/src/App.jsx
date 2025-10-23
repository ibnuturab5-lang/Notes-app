
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminRoutes from './routes/AdminRoutes'
import ManageTasks from './pages/admin/ManageTasks'
import CreateTask from './pages/admin/CreateTask'
import ManageUsers from './pages/admin/ManageUsers'
import PrivateRoutes from './routes/PrivateRoutes'
import UserDashboard from './pages/UserDashboard'
import MyTasks from './pages/MyTasks'
import TaskDetails from './pages/member/TaskDetails'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      {/* admin */}
      <Route path='/admin/dashboard' element={<AdminRoutes><Dashboard/></AdminRoutes>}/>
      <Route path='/admin/tasks' element={<AdminRoutes><ManageTasks/></AdminRoutes>}/>
      <Route path='/admin/create-task' element={<AdminRoutes><CreateTask/></AdminRoutes>}/>
      <Route path='/admin/users' element={<AdminRoutes><ManageUsers/></AdminRoutes>}/>
      {/* member routes */}
      <Route path='/user/dashboard' element={<PrivateRoutes><UserDashboard/></PrivateRoutes>}/>
      <Route path='/user/tasks' element={<PrivateRoutes><MyTasks/></PrivateRoutes>}/>
      <Route path='/user/task-details/:id' element={<PrivateRoutes><TaskDetails/></PrivateRoutes>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App