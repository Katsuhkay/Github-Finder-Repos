import { useEffect, useState } from 'react';

import styles from './RespoList.module.css';

const RepoList = ({ nomeUsuario }) => {

    const [repos, setRepos] = useState([]);
    const [estCarregando, setEstaCarregando] = useState(true);

    useEffect(() => {
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(res => res.json())
        .then(resjson => {
            setTimeout(() => {
                setEstaCarregando(false);
                setRepos(resjson);
            }, 3000)
        })
    }, [nomeUsuario])

    return (
        <div className='container'>
            {estCarregando ? (
                <h1>Carregando...</h1>
            ) : (
            <ul >
                <li className={styles.list}>
                    {repos.map(repositorio => (
                        <li className={styles.listItem} key={repositorio.id}>
                            <div className={styles.itemName}>
                                <b>Nome: </b> {repositorio.name}
                            </div>
                            <div className={styles.itemLanguage}>
                                <b>Linguagem: </b> {repositorio.language}
                            </div>
                            <div className={styles.itemLink}>
                                <a target="_blank" href={repositorio.html_url}>Visitar no github</a>
                            </div>
                        </li>
                    ))}
                </li>
            </ul>
            )}
        </div>
    )
};

export default RepoList;