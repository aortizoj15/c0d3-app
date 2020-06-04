import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import withQueryLoader, {
  WithQueryProps
} from '../../containers/withQueryLoader'
import Layout from '../../components/Layout'
import ReviewCard from '../../components/ReviewCard'
import LessonTitleCard from '../../components/LessonTitleCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import { GET_APP, GET_SUBMISSIONS } from '../../graphql/queries'
import { Lesson } from '../../@types/lesson'
import { SubmissionData } from '../../@types/submission'
import _ from 'lodash'

type SubmissionDisplayProps = {
  submissions: SubmissionData[]
}

const SubmissionDisplay: React.FC<SubmissionDisplayProps> = ({
  submissions
}) => (
<<<<<<< HEAD
  <div className="submissions-container">
=======
  <div className="submissions-container container p-0">
>>>>>>> ecf0f8857399c8e60d676e74696426c8cd30598a
    {submissions.map((submission: SubmissionData) => (
      <ReviewCard key={submission.id} submissionData={submission} />
    ))}
  </div>
)

const Review: React.FC<WithQueryProps> = ({ queryData }) => {
  const { lessons } = queryData
  const router = useRouter()
  const currentlessonId = router.query.lesson as string
  const { loading, data } = useQuery(GET_SUBMISSIONS, {
    variables: { lessonId: currentlessonId }
  })
  if (loading) {
    return <LoadingSpinner />
  }
  const lessonSubmissions: SubmissionData[] = data.submissions.filter(
    (submission: SubmissionData) =>
      submission.status !== 'passed' && submission.status !== 'needMoreWork'
  )
  const currentLesson: Lesson = lessons.find(
    (lesson: Lesson) => lesson.id.toString() === currentlessonId
  )
  return (
    <div>
      <Layout>
        <div className="row mt-4">
          <LessonTitleCard
            lessonCoverUrl={`js-${currentLesson.order}-cover.svg`}
            lessonUrl={currentLesson.docUrl}
            lessonTitle={currentLesson.title}
            lessonId={currentlessonId}
            isPassed={true}
          />
          {currentLesson && (
            <SubmissionDisplay submissions={lessonSubmissions} />
          )}
        </div>
      </Layout>
    </div>
  )
}

export default withQueryLoader(
  {
    query: GET_APP
  },
  Review
)
