import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { useState, type FormEvent } from "react";


import { auth } from '../../Services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if(email === "" || password === ""){
            alert('Preencha todos os campos')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log('Logado com sucesso')
            navigate("/admin",{
                replace: true
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="w-full flex flex-col h-screen items-center justify-center">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
                       Tree
                    <span 
                    className="bg-gradient-to-r from-yellow-500 to-orange-400  bg-clip-text text-transparent">
                        Links
                        </span>
                </h1>
            </Link>

            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-1">
                <Input
                 placeholder="Digite seu Email"
                 type="email"
                 value={email}
                 onChange={ (e) => setEmail(e.target.value) }
                 />

                <Input
                 placeholder="Digite sua senha"
                 type="password"
                 value={password}
                 onChange={ (e) => setPassword(e.target.value) }
                 />


                <button type="submit" className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white">Acessar</button>
            </form>
        </div>
    );
};
