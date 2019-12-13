React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = JSON.parse(localStorage.getItem('token'))

    if(user && token){
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])