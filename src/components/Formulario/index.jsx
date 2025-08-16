import { useState, useEffect } from 'react'

const Formulario = () => {

    const [materiaA, setMateriaA] = useState(0);
    const [materiaB, setMateriaB] = useState(0);
    const [materiaC, setMateriaC] = useState(0);
    const [nome, setNome] = useState('');

    useEffect(() => {
        console.log('useEffect disparado ao mudar o nome')
    }, [nome])

    useEffect(() => {
        console.log(`Média final alterada para ${(materiaA + materiaB + materiaC) / 3}`)
    }, [materiaA, materiaB, materiaC])

    const alteraNome = (e) => {
        // console.log(e)
        // setNome(e.target.value);
        setNome(estadoAnterior => {
            console.log(estadoAnterior)

            return e.target.value;
        })
    }

    const renderizaResultado = () => {
        const soma = materiaA + materiaB + materiaC;
        const media = soma / 3;

        if (media >= 7) {
            return (
                <p>Olá {nome}, você foi aprovado!</p>
            )
        } else {
            return (
                <p>Olá {nome}, você foi reprovado!</p>
            )
        }
    }


    return (
        <form className="formulario">

            <ul>
                {[1, 2, 3, 4, 5].map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            <input type="text" placeholder='Seu nome' onChange={alteraNome} />
            <input type="number" placeholder="Nota matéria A" onChange={(e) => setMateriaA(parseInt(e.target.value))} />
            <input type="number" placeholder="Nota matéria B" onChange={(e) => setMateriaB(parseInt(e.target.value))} />
            <input type="number" placeholder="Nota matéria C" onChange={(e) => setMateriaC(parseInt(e.target.value))} />
            {renderizaResultado()}
        </form>
    )
}

export default Formulario