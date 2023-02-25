import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
    {
        userName: 'midudev',
        name: 'Miguel Ángel Durán',
        isFollowing: true
    },
    {
        userName: 'raulsoria98',
        name: 'Raúl Soria González',
        isFollowing: true
    },
    {
        userName: 'Celia_019',
        name: 'Celia Fernández',
        isFollowing: false
    }
]

export function App() {
    return (
        <section className='App'>
            {
                users.map(({ userName, name, isFollowing }) => (
                    <TwitterFollowCard
                        key={userName}
                        userName={userName}
                        isFollowing={isFollowing}
                    >
                        {name}
                    </TwitterFollowCard>
                ))
            }
        </section>
    );
}