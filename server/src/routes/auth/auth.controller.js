async function redirectAfterLogin(req, res) {
    // res.redirect('https://localhost:8000')
    res.redirect('https://www.ascendedcardbattle.com')
}

async function logoutUser(req, res) {
    req.logout();
    // res.redirect('https://localhost:8000')
    res.redirect('https://www.ascendedcardbattle.com')
}

module.exports = {
    redirectAfterLogin,
    logoutUser,
}