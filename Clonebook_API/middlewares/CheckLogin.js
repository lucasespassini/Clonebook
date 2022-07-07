const { request } = require('express')
const jwt = require('jsonwebtoken')

const secret = '-09j20-dfj23-j'

module.exports = (req, res, next) => {
  const authToken = req.headers['authorization']

  if (authToken != undefined) {
    const token = authToken.split(' ')[1]

    try {
      let decoded = jwt.verify(token, secret)
      if (decoded.name != undefined) {
        next()
      } else {
        res.status(401)
        res.json({ error: 'Você não está logado!' })
        return
      }
    } catch (error) {
      res.status(401)
      res.json({ error: 'Você não está logado!' })
      return
    }
  } else {
    res.status(401)
    res.json({ error: 'Você não está logado!' })
    return
  }
}
