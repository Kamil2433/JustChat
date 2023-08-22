import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(
      'https://justchat2.onrender.com/',
      { query: { id } },
     
      {cors:'*'}
      
    )

    // newSocket.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");

    setSocket(newSocket)
   
    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

