import { http, HttpResponse, delay } from 'msw'

export const handlers = [
  // Mock login API
  http.post('/api/auth/login', async ({ request }) => {
    // Log the incoming request
    console.log('Mock API received login request:', request)
    
    const { email, password } = await request.json()
    console.log('Login attempt with:', { email, password })
    
    // Add artificial delay to simulate network
    await delay(500)
    
    // Giả lập kiểm tra đăng nhập
    if (email === 'test@example.com' && password === 'password123') {
      const response = {
        status: 'success',
        data: {
          user: {
            id: 1,
            email: 'test@example.com',
            name: 'Test User'
          },
          token: 'fake-jwt-token'
        }
      }
      console.log('Mock API responding with:', response)
      return HttpResponse.json(response)
    }

    const errorResponse = {
      status: 'error',
      message: 'Invalid credentials'
    }
    console.log('Mock API responding with error:', errorResponse)
    return HttpResponse.json(
      errorResponse,
      { status: 401 }
    )
  }),

  // Mock register API
  http.post('/api/auth/register', async ({ request }) => {
    const userData = await request.json()
    
    return HttpResponse.json({
      status: 'success',
      data: {
        user: {
          id: 2,
          ...userData
        },
        token: 'fake-jwt-token'
      }
    })
  }),

  // Mock get user profile API
  http.get('/api/user/profile', () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User'
        }
      }
    })
  })
]