import { getUsersAnalytics } from '@api/users'
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

import styles from './UsersAnalytics.module.scss'

const COLORS = ['#1F5C85', '#3498DB', '#add7f5', '#9BBDD4']

export const UsersAnalytics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['usersAnalytics'],
    queryFn: getUsersAnalytics,
  })

  if (isLoading) return <p>Loading...</p>

  if (!data?.totalUsers) return <p>No users available</p>
  return (
    <div className={styles.usersAnalyticsContainer}>
      <h3>Users Analytics</h3>
      <div className={styles.usersAnalytics}>
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
                <Label
                  value={`Total: ${data.totalUsers}`}
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
          <p>No users available</p>
        )}
      </div>
    </div>
  )
}
