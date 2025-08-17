"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asynctemployesignup } from '@/store/Actions/employeAction';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated } = useSelector((state) => state.employeReducer);

  useEffect(() => {
    if (isAuthenticated) router.push('/employe/auth');
  }, [isAuthenticated]);

  const [newEmploye, setNewEmploye] = useState({
    firstname: '',
    lastname: '',
    contact: '',
    organizationname: '',
    email: '',
    password: '',
  });

  const SignupHandler = (e) => {
    e.preventDefault();
    dispatch(asynctemployesignup(newEmploye));
    if (isAuthenticated) {
      router.push('/employe/auth');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmploye({
      ...newEmploye,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Employee Signup</h1>
        <form onSubmit={SignupHandler}>
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={newEmploye.firstname}
              onChange={handleInputChange}
              required
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={newEmploye.lastname}
              onChange={handleInputChange}
              required
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={newEmploye.contact}
              onChange={handleInputChange}
              required
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="organizationname" className="block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <input
              type="text"
              id="organizationname"
              name="organizationname"
              value={newEmploye.organizationname}
              onChange={handleInputChange}
              required
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newEmploye.email}
              onChange={handleInputChange}
              required
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={newEmploye.password}
              onChange={handleInputChange}
              required
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full text-white font-normal px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Signup
          </button>
          <p className="text-black">
              Already have an account?{' '}
              <Link className="text-blue-500" href="/employe/signin">
                Login 
              </Link>
            </p>
        </form>
      </div>
    </div>
  );
};

export default Page;