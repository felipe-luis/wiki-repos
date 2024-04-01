import { useState } from 'react';
import gitLogo from '../assets/github.png';
import { Container } from './styles';
import Input from '../components/Input';
import Button from '../components/Button';
import InputRepos from '../components/ItemRepos';
import {api} from '../services/api';

const App = () => {
  const [currentRepo, setCurrentRepo] = useState('')
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async() => {
    const { data } = await api.get(`repos/${currentRepo}`);

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id);
      if(isExist){
        alert('Repositório já existente')
      }
      setRepos(prev => [...prev, data]);
      setCurrentRepo('');
      return
    }
    alert("Repositório não encontrado!")
  }

  const handleRemoveRepo = (id) => {
    const updatedRepos = repos.filter(repo => repo.id !== id);
    setRepos(updatedRepos);
  }
    
  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt='GitLogo'/>
      <Input value={currentRepo} onChange={event => setCurrentRepo(event.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo =>  <InputRepos handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
      
    </Container>
  );
}

export default App;
