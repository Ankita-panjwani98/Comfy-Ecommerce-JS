
function createSession(id, email) {
    localStorage.setItem('userid', id);
    localStorage.setItem('email', email);
  }
  
  function deleteSession() {
    localStorage.clear();
  }
  
  
  function checkSession() {
    const sessionuserid = localStorage.getItem('userid');
    const sessionEmail = localStorage.getItem('email');
  
    if (sessionuserid == null && sessionEmail == null) {
      return false;
    } else {
      return true;
    }
  }
  
  function getUserSessionData() {
    if (checkSession()) {
      const sessionuserid = localStorage.getItem('userid');
      const sessionEmail = localStorage.getItem('email');
      
  
      return {userid: sessionuserid, useremail: sessionEmail};
    }
  
    return null;
  }
  
  
  