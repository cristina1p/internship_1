import { getPostsAnalytics } from '@api/posts'
import { calculateGrowth } from '@helper/calculateGrowth'
import { PostAnalyticsResponse } from '@models/auth'
import { useQuery } from '@tanstack/react-query'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import styles from './AnalyicsContainer.module.scss'

const COLORS = ['#1F5C85', '#3498DB', '#add7f5', '#9BBDD4']

export const PostsAnalytics = () => {
  const { data, isLoading } = useQuery<PostAnalyticsResponse>({
    queryKey: ['postsAnalytics'],
    queryFn: getPostsAnalytics,
  })

  if (isLoading) return <p>Loading...</p>

  if (!data?.totalPosts) return <p>No posts available</p>

  // Growth calculation
  const previousTotal = data.previousTotalPosts
  const { growth, isPositive } = calculateGrowth(data.totalPosts, previousTotal)

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.growthCard}>
        <h4>Total Posts</h4>
        <p>
          {data.totalPosts}{' '}
          <span className={isPositive ? styles.positive : styles.negative}>
            {isPositive ? '⬆️' : '⬇️'} {growth.toFixed(2)}%
          </span>
        </p>
      </div>

      <div className={styles.analytics}>
        {data.totalPosts > 0 ? (
          <ResponsiveContainer
            className={styles.rechartsResponsiveContainer}
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data.statuses}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
              >
                {data.statuses.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  )
}
