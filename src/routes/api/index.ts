let item = 'banana'

export function get() {
  return {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      item
    }
  }
}

export async function post({ request }) {
  const form = await request.formData()
  const newItem = form.get('item')

  item = newItem;

  return {
    status: 303,
    headers: {
      location: '/api'
    }
  }
}