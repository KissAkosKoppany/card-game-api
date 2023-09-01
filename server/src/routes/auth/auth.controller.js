async function redirectAfterLogin(req, res) {
    // res.cookie('user', req.user.id, {
    //     sameSite: 'lax',
    //     httpOnly: false,
    //     secure: false,
    // })
    // res.redirect('https://ascendedbattle.com')
    res.redirect('https://ec2-16-171-139-106.eu-north-1.compute.amazonaws.com:8000')
}

async function logoutUser(req, res) {
    req.logout();
    // res.redirect('https://ascendedbattle.com')
    res.redirect('https://ec2-16-171-139-106.eu-north-1.compute.amazonaws.com:8000')
}

module.exports = {
    redirectAfterLogin,
    logoutUser,
}