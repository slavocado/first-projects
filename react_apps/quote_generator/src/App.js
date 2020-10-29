import './App.css';
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Row} from 'antd';
import "antd/dist/antd.css";
import {blue} from '@ant-design/colors';

function App() {

    const [quotes, setQuotes] = useState([]);
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [page, setPage] = useState(1);
    const [isQuotesAble, setIsQuotesAble] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getRandomQuoteData()
    }, [])

    const getRandomQuoteData = async () => {
        setLoading(true)

        const api_url = 'https://quote-garden.herokuapp.com/api/v2/quotes/random';
        const response = await fetch(api_url);
        let data = await response.json();

        setQuotes([data.quote]);
        setAuthor(data.quote.quoteAuthor);
        setGenre(data.quote.quoteGenre);
        setIsQuotesAble(true)

        setLoading(false)

        console.log(quotes)
    }

    const addMoreQuotes = async () => {
        const api_url = `https://quote-garden.herokuapp.com/api/v2/authors/${author}?page=${page}&limit=2`;
        const response = await fetch(api_url);
        let data = await response.json();
        console.log(data)
        if (data.quotes.length > 0){
            setQuotes(quotes.concat(data.quotes));
            setPage(page+1)
        } else {
            setPage(1)
            setIsQuotesAble(false)
        }
    }

    return (
        <Row>
            <Col span={10} offset={7} style={{background: blue.primary, marginTop: '2rem'}}>
                <Card loading={loading}>
                    <h1>{author}</h1>
                    <h2>{genre}</h2>
                    <Divider/>

                    {quotes.map(quote => (
                        <div key={Math.random()*1000}>
                            <p>{quote.quoteText}</p>
                            <Divider/>
                        </div>
                    ))}


                    <Button type="primary" onClick={addMoreQuotes} disabled={!isQuotesAble} shape="round">Load more quotes by this author</Button>
                </Card>
            </Col>
            <Button type="primary" style={{position: 'fixed', right: '15px', bottom: '15px'}} onClick={getRandomQuoteData} shape="round">Get Random Quote</Button>
        </Row>

    );
}

export default App;
