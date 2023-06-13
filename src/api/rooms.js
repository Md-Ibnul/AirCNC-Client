// add a room
export const addRoom = async roomData => {
    const response = await fetch('http://localhost:5000/rooms', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(roomData)
    })
    const data = await response.json()
    return data;
}

// Get all rooms

export const getAllRooms = async() => {
    const response = await fetch('http://localhost:5000/rooms')
    const data = await response.json()
    return data;
}

// Get filtered room for hosts
export const getRooms = async email => {
    const response = await fetch(`http://localhost:5000/rooms/${email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('access-token')}`
        },
    })
    const data = await response.json()
    return data;
}


// Get room details

export const getRoom = async(id) => {
    const response = await fetch(`http://localhost:5000/room/${id}`)
    const data = await response.json()
    return data;
}

// Delete  room
export const deleteRoom = async id => {
    const response = await fetch(`http://localhost:5000/rooms/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })
    const data = await response.json()
    return data;
}

// Update Room
export const updateRoom = async (roomData, id) => {
    const response = await fetch(`http://localhost:5000/rooms/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
        body: JSON.stringify(roomData)
    })

    const data = await response.json()
    return data;
}