async function redirectAfterLogin(req, res) {
    res.redirect('https://localhost:8000')
}

async function logoutUser(req, res) {
    req.logout();
    res.redirect('https://localhost:8000/')
}

module.exports = {
    redirectAfterLogin,
    logoutUser
}