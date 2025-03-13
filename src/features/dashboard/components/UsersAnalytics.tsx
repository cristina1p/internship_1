import { getUsersAnalytics } from '@api/users'
import { useQuery } from '@tanstack/react-query'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

import styles from './UsersAnalytics.module.scss'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export const UsersAnalytics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['usersAnalytics'],
    queryFn: getUsersAnalytics,
  })

  if (isLoading) return <p>Loading...</p>

  if (!data?.totalUsers) return <p>No users available</p>
  return (
    <div>
      <div className={styles.usersAnalytics}>
        {data.totalUsers > 0 ? (
          <PieChart width={500} height={400}>
            <Pie
              data={data.roles}
              dataKey="count"
              nameKey="role"
              cx="50%"
              cy="50%"
              outerRadius={100}
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
            <Legend />
          </PieChart>
        ) : (
          <p>No users available</p>
        )}
      </div>
    </div>
  )
}
