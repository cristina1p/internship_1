import { getPostsAnalytics } from '@api/posts'
import { PostAnalyticsResponse } from '@models/auth'
import { useQuery } from '@tanstack/react-query'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts'

import styles from './PostsAnalytics.module.scss'

const COLORS = ['#1F5C85', '#3498DB', '#add7f5', '#9BBDD4']

export const PostsAnalytics = () => {
  const { data, isLoading } = useQuery<PostAnalyticsResponse>({
    queryKey: ['postsAnalytics'],
    queryFn: getPostsAnalytics,
  })

  if (isLoading) return <p>Loading...</p>
  if (!data?.totalPosts) return <p>No posts available</p>

  return (
    <div className={styles.postsAnalyticsContainer}>
      <h3>Posts Analytics</h3>
      <div className={styles.postsAnalytics}>
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
                <Label
                  value={`Total: ${data.totalPosts}`}
                  position={{ x: 200, y: 200 }}
                  fill="#fff"
                  fontSize={18}
                  fontWeight="bold"
                />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  )
}
