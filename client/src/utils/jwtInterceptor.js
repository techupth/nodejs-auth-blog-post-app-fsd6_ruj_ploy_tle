import axios from "axios";

function jwtInterceptor() {
  // Interceptor สำหรับ request
  axios.interceptors.request.use(
    (req) => {
      // ดึง JWT token จาก Local Storage
      const token = localStorage.getItem('jwtToken');

      // ถ้ามี token ให้แนบไปกับ header ของ request
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }

      return req;
    },
    (error) => {
      // จัดการกับ error ที่เกิดขึ้นใน request
      return Promise.reject(error);
    }
  );

  // Interceptor สำหรับ response
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // ถ้า response error และมีสถานะเป็น 401 Unauthorized
      if (error.response && error.response.status === 401) {
        // ลบ JWT token จาก Local Storage
        localStorage.removeItem('jwtToken');

        // Redirect ผู้ใช้ไปยังหน้า login
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );
}

// เรียกใช้ฟังก์ชัน jwtInterceptor เพื่อ setup interceptor
jwtInterceptor();

// Usage example: Sending a request using axios
axios.get('https://localhost:4000/protected-route')
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

export default jwtInterceptor;//ทบทวน
