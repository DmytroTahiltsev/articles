import React, {useState, useEffect} from 'react'
export const ArticleCard = ({article, user})=>{
    const [info, setInfo] = useState(article)
    let content

    if(info === article){
        content = (<p>{info.title}</p>)     
    }
    else if(info === user){
       content = (<p>{info.username}</p>) 
    }

    return(
        <div>
            {content}
            <button onClick={()=>{setInfo(article)}}>Статья</button>
            <button onClick={()=>{setInfo(user)}}>Автор</button>
        </div>
    )
}