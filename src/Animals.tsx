import React from 'react'
import useQuery, { mutate } from 'swr'
import axios from 'axios'

export const Animals: React.FC = (props) => {
    const url = 'http://localhost:3000/animals'
    const { data: animals, isValidating } = useQuery(
        '/animals',
        async (): Promise<{ id: string; name: string; powerLevel: string }[]> => {
            const { data } = await axios.get(url)
            return data
        }
    )
    if (isValidating) return <div>Loading...</div>
    return (
        <div>
            {animals?.map((animal) => {
                return (
                    <div>
                        {animal.name}, {animal.powerLevel}
                    </div>
                )
            })}
            <button
                onClick={() => {
                    mutate('/animals', async () => {
                        await axios.post(url, { name: 'Lynx', powerLevel: 9 })
                    })
                }}
            >
                POST
            </button>
        </div>
    )
}
