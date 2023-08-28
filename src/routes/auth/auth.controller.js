async function redirectAfterLogin(req, res) {
    res.redirect('https://ascendedbattle.com')
}

async function logoutUser(req, res) {
    req.logout();
    res.redirect('https://ascendedbattle.com')
}

module.exports = {
    redirectAfterLogin,
    logoutUser
}