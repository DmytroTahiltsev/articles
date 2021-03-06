import React, {useCallback, useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import {Loader} from '../components/Loader' 
import {ArticleCard} from '../components/ArticleCard'

export const DetailPage = ()=>{
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [article, setArticle] = useState('')
    const [user, setUser] = useState('')
    const articleId = useParams().id

    const getArticle = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/article/${articleId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetched)
            setArticle(fetched)
            const fetchedUser = await request(`/api/auth/user/${fetched.owner}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(fetchedUser)
            console.log(fetchedUser)
        }catch(e){}
    }, [token, articleId, request])

    useEffect(()=>{
        getArticle()
    }, [getArticle])
    if(loading){
        return <Loader />
    }
    return(
        <>
            {!loading && article && <ArticleCard article={article} user={user} />}
        </>
    )
}