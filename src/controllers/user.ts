import { NextFunction, Request, Response } from 'express'
import * as halson from 'halson'
import { default as User } from '../models/user'
import { formatOutput } from '../utility/orderApiUtility'
const APPLICATION_JSON = 'application/json'

let users: Array<User> = []

export let getUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username
  let user = users.find(obj => obj.username === username)
  const httpStatusCode = user ? 200 : 404
  if (user) {
    user = halson(user).addLink('self', `/users/${user.id}`)
  }

  return formatOutput(res, user, httpStatusCode, 'user')
}

export let addUser = (req: Request, res: Response, next: NextFunction) => {
  let user: User = {
    // generic random value from 1 to 100 only for tests so far
    email: req.body.email,
    firstName: req.body.firstName,
    id: Math.floor(Math.random() * 100) + 1,
    lastName: req.body.lastName,
    password: req.body.password,
    phone: req.body.phone,
    userStatus: 1,
    username: req.body.username,
  }
  users.push(user)
  user = halson(user).addLink('self', `/users/${user.id}`)
  return formatOutput(res, user, 201, 'user')
}

export let updateUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username
  const userIndex = users.findIndex(item => item.username === username)

  if (userIndex === -1) {
    return res.status(404).send()
  }

  const user = users[userIndex]
  user.username = req.body.username || user.username
  user.firstName = req.body.firstName || user.firstName
  user.lastName = req.body.lastName || user.lastName
  user.email = req.body.email || user.email
  user.password = req.body.password || user.password
  user.phone = req.body.phone || user.phone
  user.userStatus = req.body.userStatus || user.userStatus

  users[userIndex] = user
  return formatOutput(res, {}, 204)
}

export let removeUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username
  const userIndex = users.findIndex(item => item.username === username)

  if (userIndex === -1) {
    return res.status(404).send()
  }

  users = users.filter(item => item.username !== username)
  return formatOutput(res, {}, 204)
}
