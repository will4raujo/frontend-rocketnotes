import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Container, Form } from './styles';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';

import { api } from '../../services/api';
import { ButtonText } from '../../components/ButtonText';


export function New() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [ links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [ tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleAddLink() {
        setLinks( prevState => [...prevState, newLink]);
        setNewLink("");
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted))
        //preciso encontrar uma maneira de remover somente o link que cliquei e não o que possui o mesmo valor
    }

    function handleAddTag() {
        setTags( prevState => [...prevState, newTag]);
        setNewTag("")
    }

    function handleRemoveTag(deleted) {
        setTags( prevState => prevState.filter(tag => tag !== deleted))
    }

    async function handleNewNote() {

        if ( newTag || newLink) {
            return alert("adicione links e tags clicando em + antes de salvar a nota, ou deixe o campo vazio")
        }

        await api.post("/notes", {title, description, tags, links} )
        alert("nota criada com sucesso");
        navigate(-1);
    }

    function handleBack(){
        navigate(-1)
    }

    return (
        <Container>
            <Header/>
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText 
                            title="Voltar"
                            onClick={handleBack}
                        />
                    </header>

                    <Input 
                        placeholder="Título"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Textarea 
                        placeholder="observações"
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Section title="Links Úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }
                        <NoteItem 
                            isNew
                            placeholder="Novo Link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section>
                        <div className='tags'>
                            {
                                tags.map((tag, index ) => (
                                    <NoteItem
                                        key={String(index)} 
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }
                            <NoteItem 
                                isNew
                                placeholder="Nova tag"
                                value={newTag}
                                onChange={e => setNewTag(e.target.value)}
                                onClick={handleAddTag}
                             />
                        </div>

                        <Button title="Salvar" onClick={handleNewNote}/>
                    </Section>
                </Form>
            </main>
        </Container>
    )

}