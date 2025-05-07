import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { useState,useEffect, type FormEvent } from "react"
import { FaLink } from 'react-icons/fa'
import { dataBase } from "../../Services/firebaseConnection"
import { doc, setDoc, getDoc } from 'firebase/firestore'

export const Networks = ( ) => {
    const [github, setGithub] = useState('')
    const [instagram, setInstagram] = useState('')
    const [youtube, setYoutube] = useState('')

    useEffect(() => {
        const loadLinks = () => {
            const docRef = doc(dataBase, 'social', 'link')
            getDoc(docRef)
            .then((snapshot) => {
                console.log(snapshot)
                if(snapshot.data() !== undefined){
                    setGithub(snapshot.data()?.github)
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }

        loadLinks()
    }, [])

    const handleSaveLinks = (e:FormEvent) => {
        e.preventDefault()
        
        setDoc(doc(dataBase, 'social', 'link'), {
            github: github,
            instagram: instagram,
            youtube: youtube,
        })
        .then(() => {
            console.log('links cadastrados com sucesso')
        })
        .catch((error) => {
            console.log('erro ao cadastrar' + error)
        })

    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-2xl text-white font-medium mt-8 mb-4">Minhas redes sociais</h1>

            <form onSubmit={handleSaveLinks} className="flex flex-col max-w-xl w-full">
                <label className="text-white font-medium mt-2 mb-2"> Link do Facebook: </label>
                <Input
                placeholder="Digite a url do Github"
                type="url"
                value={github}
                onChange={ (e) => setGithub(e.target.value) }
                />


                <label className="text-white font-medium mt-2 mb-2"> Link do Instagram: </label>
                <Input
                placeholder="Digite a url do instagram"
                type="url"
                value={instagram}
                onChange={ (e) => setInstagram(e.target.value) }
                />


                <label className="text-white font-medium mt-2 mb-2"> Link do Youtube: </label>
                <Input
                placeholder="Digite a url do Youtube"
                type="url"
                value={youtube}
                onChange={ (e) => setYoutube(e.target.value) }
                />

                <button 
                type="submit" 
                className="flex text-white bg-blue-600 h-9 rounded-md items-center justify-center mb-7 font-medium">
                    Salvar Links <span>{<FaLink/>}</span>
                    </button>
            </form>
        </div>
    )
}