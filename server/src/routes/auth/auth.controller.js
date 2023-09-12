async function redirectAfterLogin(req, res) {
    // res.redirect('https://localhost:8000')
    res.redirect('https://ascendedcardbattle.com')
}

async function logoutUser(req, res) {
    req.logout();
    // res.redirect('https://localhost:8000')
    res.redirect('https://ascendedcardbattle.com')
}

module.exports = {
    redirectAfterLogin,
    logoutUser,
}