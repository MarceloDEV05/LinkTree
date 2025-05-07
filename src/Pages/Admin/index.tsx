import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { useState,  } from "react"

export const Admin = () => {
    const [nameInput, setNameInput] = useState('')
    const [urlInput, setUrlInput] = useState('')
    const [textColorInput, setTextColorInput] = useState('#fff')
    const [backgroundColorInput, setBackgroundColorInput] = useState('#000')


    return(
       <div className="flex items-center flex-col h-screen pb-7 px-2">
         <Header/>
           <form className="flex flex-col mt-8 mb-3 w-full max-w-xl">
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
                    Cadastrar
                </button>
            </form>
        </div>
    )
}