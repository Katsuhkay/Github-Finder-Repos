// src/components/Perfil/index.jsx
import { useEffect, useState } from "react";
// ✅ IMPORTA o CSS Module (o nome do arquivo precisa terminar com .module.css)
import styles from "./Perfil.module.css";

function Perfil({ nomeUsuario, setUsuarioNaoEncontrado }) {
    const [dados, setDados] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!nomeUsuario) return;

        setLoading(true);
        setDados(null);

        fetch(`https://api.github.com/users/${nomeUsuario}`)
        .then((res) => {
            if (res.status === 404) {
            setUsuarioNaoEncontrado(true);
            setLoading(false);
            return null;
            }
            setUsuarioNaoEncontrado(false);
            return res.json();
        })
        .then((data) => {
            setDados(data);
            setLoading(false);
        })
        .catch(() => {
            setUsuarioNaoEncontrado(true);
            setLoading(false);
        });
    }, [nomeUsuario, setUsuarioNaoEncontrado]);
    if (loading) {
        return (
        <div className={styles.perfil}>
            <p className={styles.loading}>Carregando...</p>
        </div>
        );
    }

    if (!dados) return null;

    return (
        <div className={styles.perfil}>
        <img
            className={styles.avatar}
            src={dados.avatar_url}
            alt={`Avatar de ${dados.login}`}
            width={120}
            height={120}
        />

        <div className={styles.info}>
            <h2 className={styles.nome}>{dados.name ?? dados.login}</h2>
            {dados.bio && <p className={styles.bio}>{dados.bio}</p>}

            <ul className={styles.stats}>
            <li><strong>Seguidores:</strong> {dados.followers}</li>
            <li><strong>Seguindo:</strong> {dados.following}</li>
            <li><strong>Repositórios:</strong> {dados.public_repos}</li>
            </ul>

            {dados.location && <p className={styles.location}>{dados.location}</p>}
        </div>
        </div>
    );
}

export default Perfil;
