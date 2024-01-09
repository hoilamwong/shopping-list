const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionsObj)
    // catch error if out of sync
    if(!response.ok) throw Error('Please reload app')
  } catch (err) {
    errMsg = err.Message;
  } finally {
    return errMsg
  }
}

export default apiRequest;