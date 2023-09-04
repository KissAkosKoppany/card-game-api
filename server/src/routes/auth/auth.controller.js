async function redirectAfterLogin(req, res) {
    // res.cookie('user', req.user.id, {
    //     sameSite: 'lax',
    //     httpOnly: false,
    //     secure: false,
    // })
    res.redirect('https://localhost:8000')
    // res.redirect('https://www.ascendedbattle.com')
}

async function logoutUser(req, res) {
    req.logout();
    res.redirect('https://localhost:8000')
    // res.redirect('https://www.ascendedbattle.com')
}

module.exports = {
    redirectAfterLogin,
    logoutUser,
}