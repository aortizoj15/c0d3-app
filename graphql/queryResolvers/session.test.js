import { session } from './session'
import db from '../../helpers/dbload'

const { Submission, UserLesson } = db

describe('Session resolver', () => {
  test('should return null if req.user does not exist', async () => {
    const req = {}
    expect(await session({}, {}, { req })).toEqual(null)
  })

  test('should return user including submissions and lessonStatus', async () => {
    const result = {
      user: { username: 'test', id: 815 },
      submissions: [{ id: '1' }],
      lessonStatus: [{ id: '1' }]
    }
    const req = { user: result.user }
    Submission.findAll = jest.fn().mockReturnValue(result.submissions)
    UserLesson.findAll = jest.fn().mockReturnValue(result.lessonStatus)

    const returnValue = await session({}, {}, { req })

    expect(returnValue.user).toEqual(result.user)
    expect(returnValue.submissions).toEqual(result.submissions)
    expect(returnValue.lessonStatus).toEqual(result.lessonStatus)
  })
})
