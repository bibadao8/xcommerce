import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, addUser, updateUser, deleteUser } from '../../redux/slices/adminSlice'

const UserManager = () => {
  const dispatch = useDispatch()
  const { users, loading, error } = useSelector((state) => state.admin)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  })

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(addUser(formData))
    setFormData({ name: '', email: '', password: '', role: 'customer' })
  }

  const handleRoleChange = async (userId, newRole) => {
    await dispatch(updateUser({ id: userId, role: newRole }))
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await dispatch(deleteUser(userId))
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-left">User Management</h2>

      {/* Add New User Form */}
      <div className="p-6 rounded-lg mb-6 bg-white shadow-md">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className='block text-gray-700'>Name</label>
            <input type="text" name='name' value={formData.name} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' required />
          </div>
          <div className="mb-4">
            <label className='block text-gray-700'>Email</label>
            <input type="email" name='email' value={formData.email} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' required />
          </div>
          <div className="mb-4">
            <label className='block text-gray-700'>Password</label>
            <input type="password" name='password' value={formData.password} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' required />
          </div>
          <div className="mb-4">
            <label className='block text-gray-700'>Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type='submit' className='bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-150 cursor-pointer'>Add User</button>
        </form>
      </div>

      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white">
        {loading && <div className="p-4">Loading...</div>}
        {error && <div className="p-4 text-red-600">{error}</div>}
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-gray-50 text-sm font-semibold">
            <tr>
              <th scope="col" className="py-3 px-4">Name</th>
              <th scope="col" className="py-3 px-4">Email</th>
              <th scope="col" className="py-3 px-4">Role</th>
              <th scope="col" className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {(users || []).map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer'
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button onClick={() => handleDeleteUser(user._id)} className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 cursor-pointer'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;