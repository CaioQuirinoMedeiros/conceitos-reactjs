import React, { useState, useEffect } from 'react'
import api from './services/api'

import './styles.css'

function App () {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function getRepositories () {
      const { data: repositories } = await api.get('repositories')

      setRepositories(repositories)
    }

    getRepositories()
  }, [])

  async function handleAddRepository () {
    const { data: repository } = await api.post('repositories', {
      title: 'Meu repostirório',
      url: 'http://github.com/CaioQuirinoMedeiros',
      techs: ['React', 'Node']
    })

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository ({ repoId }) {
    await api.delete(`repositories/${repoId}`)

    setRepositories(repositories.filter(repo => repo.id !== repoId))
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map(repository => (
          <li key={repository.id}>
            <span>{repository.title}</span>
            <button
              onClick={() => handleRemoveRepository({ repoId: repository.id })}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
