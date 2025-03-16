import { getUsersAnalytics } from '@api/users'
import { calculateGrowth } from '@helper/calculateGrowth'
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

export const UsersAnalytics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['usersAnalytics'],
    queryFn: getUsersAnalytics,
  })

  if (isLoading) return <p>Loading...</p>

  if (!data?.totalUsers) return <p>No users available</p>

  // Calculate growth percentage
  const previousTotal = data.previousTotalUsers
  const { growth, isPositive } = calculateGrowth(data.totalUsers, previousTotal)

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.growthCard}>
        <h4>Total Users</h4>
        <p>
          {data.totalUsers}{' '}
          <span className={isPositive ? styles.positive : styles.negative}>
            {isPositive ? '⬆️' : '⬇️'} {growth.toFixed(2)}%
          </span>
        </p>
      </div>

      <div className={styles.analytics}>
        {data.totalUsers > 0 ? (
          <ResponsiveContainer
            className={styles.rechartsResponsiveContainer}
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data.roles}
                dataKey="count"
                nameKey="role"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
              >
                {data.roles.map((entry, index) => (
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
          <p>No users available</p>
        )}
      </div>
    </div>
  )
}
