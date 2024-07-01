import React, { useState } from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const login = async (email, password) => {
    const url = 'https://localhost:4000/login';
    const body = {
        email: email,
        password: password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log('Login Success:', data);
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};// 🐨 Todo: Exercise #4
    //  ให้เขียน Logic ของ Function `login` ตรงนี้
    //  Function `login` ทำหน้าที่สร้าง Request ไปที่ API POST /login
    //  ที่สร้างไว้ด้านบนพร้อมกับ Body ที่กำหนดไว้ในตารางที่ออกแบบไว้

    const register = async (username, email, password) => {
      const url = 'https://localhost:4000/register';
      const body = {
          username: username,
          email: email,
          password: password
      };
  
      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
          });
  
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
  
          const data = await response.json();
          console.log('Register Success:', data);
          return data;
      } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
      }
  };
   // 🐨 Todo: Exercise #2
    //  ให้เขียน Logic ของ Function `register` ตรงนี้
    //  Function register ทำหน้าที่สร้าง Request ไปที่ API POST /register
    //  ที่สร้างไว้ด้านบนพร้อมกับ Body ที่กำหนดไว้ในตารางที่ออกแบบไว้


    const logout = () => {
      // ลบ JWT token จาก Local Storage
      localStorage.removeItem('jwtToken');
      console.log('Logout successful: JWT token removed from Local Storage');
  };// 🐨 Todo: Exercise #7
    //  ให้เขียน Logic ของ Function `logout` ตรงนี้
    //  Function logout ทำหน้าที่ในการลบ JWT Token ออกจาก Local Storage


  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
