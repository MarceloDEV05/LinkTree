import { Social } from "../../components/Social"
import {useState, useEffect} from 'react'
import {FaGithub, FaInstagram, FaYoutube} from 'react-icons/fa'
import { dataBase } from "../../Services/firebaseConnection"
import { getDocs, collection, orderBy, query, doc, getDoc } from 'firebase/firestore'

interface LinkProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
} 

interface SocialLinks{
 instagram: string;
 github: string;
 youtube: string;   
}

export const Home = () => {

    const[links, setLinks] = useState<LinkProps[]>([])
    const[socialLinks, setSocialLinks] = useState<SocialLinks>()

    useEffect(() => {
        const loadLinks = () => {
            const linksRef = collection(dataBase,'Links')
            const queryRef = query(linksRef, orderBy('created', 'asc'))
        
            getDocs(queryRef)
            .then((snapshot) => {
                let list = [] as LinkProps[]

                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        name:doc.data().name,
                        url:doc.data().url,
                        bg:doc.data().bg,
                        color:doc.data().color,
                    })
                })
                
                setLinks(list)
            })

            .catch((error) => {
                console.log(error)
            })

        }

        loadLinks()
    }, [])


    useEffect(() => {
        const loadSocialLinks = () => {
            const docRef = doc(dataBase,'social', 'link' )
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setSocialLinks({
                        instagram: snapshot.data()?.instagram,
                        github: snapshot.data()?.github,
                        youtube: snapshot.data()?.youtube,
                    })
                }
            })
            .catch(() => {
    
            })
        }

        loadSocialLinks()
    }, [])



    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Marcelo Cardoso</h1>
            <span className="text-gray-50 mb-5 mt-20 ">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
              {links.map((link) => (
                   <section
                   style={{ backgroundColor: link.bg, color: link.color }}
                   key={link.id} className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                   <a href={link.url} target="_blank">
                       <p className="text-base md:text-lg">
                           {link.name}
                       </p>
                   </a>
               </section>
                ))}

           { socialLinks && Object.keys(socialLinks).length > 0 && (
                 <footer className="flex justify-center gap-3 my-4">
                 <Social url={socialLinks?.youtube}>
                     <FaYoutube size={35} color='#fff'/>
                 </Social>

                 <Social url={socialLinks?.github}>
                     <FaGithub size={35} color='#fff'/>
                 </Social>

                 <Social url={socialLinks?.instagram}>
                     <FaInstagram size={35} color='#fff'/>
                 </Social>
             </footer>
           )}
            </main>
        </div>
    )
}