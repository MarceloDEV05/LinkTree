import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { useState, type FormEvent, useEffect } from "react"
import { FaLink } from "react-icons/fa"
import { FiTrash } from "react-icons/fi"
import { dataBase } from "../../Services/firebaseConnection"
import { addDoc, collection,onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'

interface LinkProps{
    id:string;
    name:string;
    url:string;
    bg:string;
    color:string;
}

export const Admin = () => {
    const [nameInput, setNameInput] = useState('')
    const [urlInput, setUrlInput] = useState('')
    const [textColorInput, setTextColorInput] = useState('#fff')
    const [backgroundColorInput, setBackgroundColorInput] = useState('#000')
    const [links, setLinks] = useState<LinkProps[]>([])

    useEffect(() => {
        const linksRef = collection(dataBase, 'Links')
        const queryRef = query(linksRef, orderBy('created', 'asc'))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let list = [] as LinkProps[]
            snapshot.forEach((doc) => {
                list.push({
                    id:doc.id,
                    name:doc.data().name,
                    url: doc.data().url,
                    bg:doc.data().bg ,
                    color: doc.data().color

                })
            })
            setLinks(list)
            console.log(list)
        })

        return () => {
            unsub()
        }
    }, [])

    const register = async(e: FormEvent) => {
        e.preventDefault()
        
        if(nameInput === '' || urlInput === ''){
            alert('preencha todos os campos')
            return;
        }

        await addDoc(collection(dataBase, 'Links'), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date()
        })
        .then(() => {
            setNameInput('')
            setUrlInput('')
        })
        .catch((error) => {
            console.log('erro ao cadastrar no banco' + error)
        })
        
    }

    const deleteLink = async(id:string) => {
        const docRef = doc(dataBase, 'Links', id)
        await deleteDoc(docRef)
    }

    return(
       <div className="flex items-center flex-col h-screen pb-7 px-2">
         <Header/>
           <form onSubmit={register} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
             <label 
              className="text-white font-medium mt-2 mb-2">
               Nome do Link: 
                </label>

            <Input 
            placeholder="Nome do seu link"
            value={nameInput}
            onChange={ (e) => setNameInput(e.target.value) }
            />


            <label 
              className="text-white font-medium mt-2 mb-2">
               URL do Link: 
                </label>

            <Input 
            type="url"
            placeholder="Url do seu link"
            value={urlInput}
            onChange={ (e) => setUrlInput(e.target.value) }
            />

            <section className="flex my-4 gap-5">
                <div className="flex gap-2">
                    <label className="text-white font-medium mt-2 mb-2">
                       Cor do Link:
                     </label>

                     <input
                        type="color"
                        value={textColorInput}
                        onChange={ (e) => setTextColorInput(e.target.value)}
                     />
                </div>
                <div className="flex gap-2">
                    <label className="text-white font-medium mt-2 mb-2">
                       Fundo do Link:
                     </label>

                     <input
                        type="color"
                        value={backgroundColorInput}
                        onChange={ (e) => setBackgroundColorInput(e.target.value)}
                     />
                </div>
            </section>

      {nameInput !== "" && (
              <div className="flex justify-start items-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md ">

              <label className="mb-3 text-white font-medium mt-2">
                  Veja como está ficando: </label>
                  <article 
                  className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"

                      style={{marginBottom: 8, marginTop: 8,backgroundColor:backgroundColorInput}}
                  >
                      <p className="font-medium" style={{color: textColorInput}}>{nameInput}</p>
                  </article>
              </div>
      )}

                <button 
                type="submit"
                className="bg-blue-600 h-9 rounded-md text-white gap-4 font-medium flex justify-center items-center mb-7">
                    Cadastrar<span> <FaLink/> </span>
                </button>
            </form>
            <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

            {links.map((link) => (
               <article key={link.id} className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none" style={{backgroundColor: link.bg, color: link.color}}>

                    <p>{link.name}</p>
                    <div>
                        <button
                        className="border border-dashed p1 rounded "
                        onClick={() => deleteLink (link.id)}
                        > 
                        
                        <FiTrash size={18} color="#fff"/>
                        </button>
                    </div>
                </article>
            ))}
        </div>
    )
}